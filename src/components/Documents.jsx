import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Table, Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

// Custom CSS with Spinner and Mobile Responsiveness
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

  .documents-container {
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
    background: linear-gradient(135deg, #f8fafc 0%, #e6f0fa 100%);
    padding: 2rem 1rem;
  }

  .documents-card {
    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
    border: 2px solid transparent;
    border-image: linear-gradient(90deg, #047857 0%, #28a745 100%) 1;
    border-radius: 20px;
    box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.5);
    transition: all 0.3s ease;
    width: 100%;
    max-width: 95%;
    margin: 0 auto;
    overflow-x: auto;
  }

  .documents-card:hover {
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.15), -10px -10px 20px rgba(255, 255, 255, 0.7);
  }

  .documents-header {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    padding: 1.5rem;
    text-align: center;
  }

  .documents-header-title {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 1px;
  }

  .documents-body {
    padding: 2rem 1.5rem;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }

  .documents-upload-btn {
    font-weight: 600;
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(4, 120, 87, 0.3);
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border: none;
    margin-bottom: 1.5rem;
  }

  .documents-upload-btn:hover {
    background: linear-gradient(90deg, #28a745 0%, #047857 100%);
    box-shadow: 0 6px 16px rgba(4, 120, 87, 0.5);
    transform: translateY(-2px);
  }

  .documents-table {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    min-width: 600px;
  }

  .documents-table th {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    font-weight: 600;
    padding: 0.75rem;
    font-size: 0.9rem;
    white-space: nowrap;
  }

  .documents-table td {
    color: #4b5563;
    vertical-align: middle;
    padding: 0.75rem;
    font-size: 0.85rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .documents-table tr:hover {
    background-color: #f1f5f9;
  }

  .documents-table .btn-sm {
    font-size: 0.85rem;
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border: none;
    transition: all 0.3s ease;
  }

  .documents-table .btn-sm:hover {
    background: linear-gradient(90deg, #28a745 0%, #047857 100%);
    box-shadow: 0 4px 8px rgba(4, 120, 87, 0.4);
  }

  .documents-modal-header {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding: 1rem;
  }

  .documents-modal-title {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .documents-modal-body {
    padding: 1.5rem;
  }

  .documents-modal-footer {
    border-top: none;
    padding: 1rem;
  }

  .documents-modal-footer .btn {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    transition: all 0.3s ease;
  }

  .documents-modal-footer .btn-secondary {
    background: #6c757d;
    border: none;
    box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);
  }

  .documents-modal-footer .btn-secondary:hover {
    background: #5a6268;
    box-shadow: 0 6px 16px rgba(108, 117, 125, 0.5);
    transform: translateY(-2px);
  }

  .documents-modal-footer .btn-success {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    border: none;
    box-shadow: 0 4px 12px rgba(4, 120, 87, 0.3);
  }

  .documents-modal-footer .btn-success:hover {
    background: linear-gradient(90deg, #28a745 0%, #047857 100%);
    box-shadow: 0 6px 16px rgba(4, 120, 87, 0.5);
    transform: translateY(-2px);
  }

  .form-error {
    color: #dc3545;
    font-size: 0.9rem;
    font-weight: 500;
    margin: 1rem 0;
    padding: 0.75rem;
    background: #f8d7da;
    border-left: 4px solid #dc3545;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .loading-container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #f8fafc 0%, #e6f0fa 100%);
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #047857;
    border-top: 4px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @media (max-width: 768px) {
    .documents-container {
      padding: 1rem 0.5rem;
    }

    .documents-card {
      border-radius: 12px;
      box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1), -4px -4px 8px rgba(255, 255, 255, 0.5);
      max-width: 100%;
    }

    .documents-header {
      padding: 1rem;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    .documents-header-title {
      font-size: 1.5rem;
      letter-spacing: 0.5px;
    }

    .documents-body {
      padding: 1rem;
      max-height: calc(100vh - 150px);
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }

    .documents-upload-btn {
      font-size: 0.85rem;
      padding: 0.5rem 1rem;
      margin-bottom: 1rem;
    }

    .documents-table {
      font-size: 0.75rem;
    }

    .documents-table th {
      padding: 0.5rem;
      font-size: 0.8rem;
    }

    .documents-table td {
      padding: 0.5rem;
      font-size: 0.75rem;
    }

    .documents-table .btn-sm {
      font-size: 0.7rem;
      padding: 0.2rem 0.4rem;
    }

    .documents-modal-header {
      padding: 0.75rem;
    }

    .documents-modal-title {
      font-size: 1.25rem;
    }

    .documents-modal-body {
      padding: 1rem;
    }

    .documents-modal-body .form-group {
      margin-bottom: 0.5rem;
    }

    .documents-modal-body .form-label {
      font-size: 0.8rem;
    }

    .documents-modal-body .form-control,
    .documents-modal-body .form-select {
      font-size: 0.8rem;
      padding: 0.35rem;
    }

    .documents-modal-footer {
      padding: 0.75rem;
    }

    .documents-modal-footer .btn {
      font-size: 0.8rem;
      padding: 0.4rem 0.75rem;
    }

    .spinner {
      width: 30px;
      height: 30px;
      border: 3px solid #047857;
      border-top: 3px solid transparent;
    }
  }
`;

const Documents = () => {
  const location = useLocation();
  const [employees, setEmployees] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newDocument, setNewDocument] = useState({
    entityType: 'employee',
    entityId: '',
    entityName: '',
    title: '',
    file: null,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const { data: documentsData, error: documentsError } = await supabase
        .from('documents')
        .select('*');
      if (documentsError) throw documentsError;

      const updatedDocuments = await Promise.all(
        documentsData.map(async (doc) => {
          if (doc.file_url && !doc.file_url.includes('token')) {
            const { data: signedUrlData, error: signedUrlError } = await supabase.storage
              .from('biogex-files')
              .createSignedUrl(doc.file_url, 3600);
            if (signedUrlError) return { ...doc, signed_file_url: null };
            return { ...doc, signed_file_url: signedUrlData.signedUrl };
          }
          return { ...doc, signed_file_url: null };
        })
      );

      // Deduplicate documents by id
      const uniqueDocuments = Array.from(
        new Map(updatedDocuments.map((doc) => [doc.id, doc])).values()
      );
      setDocuments(uniqueDocuments);
    } catch (err) {
      setError('Failed to fetch documents: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError('Please log in to view documents.');
        setLoading(false);
      }
    };

    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch employees
        const { data: employeesData, error: employeesError } = await supabase
          .from('employees')
          .select('id, full_name');
        if (employeesError) throw employeesError;
        setEmployees(employeesData || []);

        // Fetch customers
        const { data: customersData, error: customersError } = await supabase
          .from('customers')
          .select('id, full_name');
        if (customersError) throw customersError;
        setCustomers(customersData || []);

        // Fetch documents
        await fetchDocuments();
      } catch (err) {
        setError('Failed to fetch data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    checkAuth().then(() => {
      if (!error) fetchData();
    });

    // Set up real-time subscription
    const subscription = supabase
      .channel('public:documents')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'documents' }, async (payload) => {
        const newDoc = payload.new;
        let signedFileUrl = null;
        if (newDoc.file_url && !newDoc.file_url.includes('token')) {
          const { data: signedUrlData, error: signedUrlError } = await supabase.storage
            .from('biogex-files')
            .createSignedUrl(newDoc.file_url, 3600);
          if (!signedUrlError) signedFileUrl = signedUrlData.signedUrl;
        }
        const updatedDoc = { ...newDoc, signed_file_url: signedFileUrl };
        setDocuments((prev) =>
          Array.from(new Map([...prev, updatedDoc].map((doc) => [doc.id, doc])).values())
        );
      })
      .subscribe();

    // Cleanup subscription
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [location.pathname]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setNewDocument({
      entityType: 'employee',
      entityId: '',
      entityName: '',
      title: '',
      file: null,
    });
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDocument((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewDocument((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmitDocument = async () => {
    const requiredFields = ['entityType', 'entityId', 'title', 'file'];
    const emptyFields = requiredFields.filter((field) => !newDocument[field]);
    if (emptyFields.length > 0) {
      setError(`Please fill in all required fields: ${emptyFields.join(', ')}`);
      return;
    }

    try {
      // Validate entity selection
      const entities = newDocument.entityType === 'employee' ? employees : customers;
      const selectedEntity = entities.find((entity) => entity.id === newDocument.entityId);
      if (!selectedEntity) throw new Error(`${newDocument.entityType} not found`);
      const entityName = selectedEntity.full_name;

      // Construct file path
      const timestamp = Date.now();
      const sanitizedFileName = newDocument.file.name.replace(/ /g, '-');
      const filePath = `${newDocument.entityType}/${newDocument.entityId}/${timestamp}-${sanitizedFileName}`;

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('biogex-files')
        .upload(filePath, newDocument.file, { cacheControl: '3600', upsert: true });
      if (uploadError) throw new Error(`File upload failed: ${uploadError.message}`);

      // Save metadata to documents table
      const documentData = {
        title: newDocument.title,
        file_url: filePath,
        entity_type: newDocument.entityType,
        entity_id: newDocument.entityId,
        entity_name: entityName,
      };
      const { error: insertError } = await supabase.from('documents').insert([documentData]);
      if (insertError) throw new Error(`Document insertion failed: ${insertError.message}`);

      handleCloseModal();
    } catch (err) {
      setError('Failed to upload document: ' + err.message);
    }
  };

  if (loading) {
    return (
      <>
        <style>{customStyles}</style>
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <style>{customStyles}</style>
        <div className="documents-container">
          <p className="form-error">{error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{customStyles}</style>
      <div className="documents-container">
        <Card className="documents-card">
          <Card.Header className="documents-header">
            <h2 className="documents-header-title">Document Management</h2>
          </Card.Header>
          <Card.Body className="documents-body">
            <Button className="documents-upload-btn" onClick={handleShowModal}>
              Upload Document
            </Button>
            <Button
              className="documents-upload-btn"
              onClick={fetchDocuments}
              style={{ marginLeft: '10px' }}
            >
              Refresh Documents
            </Button>
            {documents.length === 0 ? (
              <p className="text-center text-muted">No documents found.</p>
            ) : (
              <Table striped bordered hover className="documents-table">
                <thead>
                  <tr>
                    <th>Entity Type</th>
                    <th>Entity Name</th>
                    <th>Document Title</th>
                    <th>File</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc) => (
                    <tr key={doc.id}>
                      <td>{doc.entity_type}</td>
                      <td>{doc.entity_name}</td>
                      <td>{doc.title}</td>
                      <td>
                        {doc.signed_file_url ? (
                          <a href={doc.signed_file_url} target="_blank" rel="noopener noreferrer">
                            View File
                          </a>
                        ) : (
                          <span>File not available</span>
                        )}
                      </td>
                      <td>
                        <Link
                          to={
                            doc.entity_type === 'employee'
                              ? '/hr-management/employee-list'
                              : '/hr-management/customer-list'
                          }
                          className="btn btn-sm"
                        >
                          View {doc.entity_type}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton className="documents-modal-header">
            <Modal.Title className="documents-modal-title">Upload Document</Modal.Title>
          </Modal.Header>
          <Modal.Body className="documents-modal-body">
            {error && <div className="form-error">{error}</div>}
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Entity Type</Form.Label>
                <Form.Select
                  name="entityType"
                  value={newDocument.entityType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="employee">Employee</option>
                  <option value="customer">Customer</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Entity ID</Form.Label>
                <Form.Control
                  as="select"
                  name="entityId"
                  value={newDocument.entityId}
                  onChange={(e) => {
                    const entities = newDocument.entityType === 'employee' ? employees : customers;
                    const selectedEntity = entities.find((entity) => entity.id === e.target.value);
                    setNewDocument((prev) => ({
                      ...prev,
                      entityId: e.target.value,
                      entityName: selectedEntity ? selectedEntity.full_name : '',
                    }));
                  }}
                  required
                >
                  <option value="">Select {newDocument.entityType}</option>
                  {(newDocument.entityType === 'employee' ? employees : customers).map((entity) => (
                    <option key={entity.id} value={entity.id}>
                      {entity.full_name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Document Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={newDocument.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Employment Contract"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>File</Form.Label>
                <Form.Control
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="documents-modal-footer">
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="success" onClick={handleSubmitDocument}>
              Upload Document
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Documents;