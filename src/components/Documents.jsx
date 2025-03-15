import React, { useState, useEffect } from 'react';
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
    overflow-x: auto; /* Allow horizontal scrolling for table */
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
    min-width: 600px; /* Ensure table scrolls horizontally on small screens */
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
    min-height: 100vh; /* Match container height */
    display: flex;
    justify-content: center;
    align-items: center; /* Center spinner vertically and horizontally */
    background: linear-gradient(135deg, #f8fafc 0%, #e6f0fa 100%); /* Match background */
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #047857; /* Green color matching theme */
    border-top: 4px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Mobile Responsiveness (≤768px) */
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
      max-height: calc(100vh - 150px); /* Adjust for header and footer */
      overflow-y: auto;
      -webkit-overflow-scrolling: touch; /* Smooth scrolling on mobile */
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
      width: 30px; /* Smaller on mobile */
      height: 30px;
      border: 3px solid #047857;
      border-top: 3px solid transparent;
    }
  }
`;

const Documents = () => {
  const [employees, setEmployees] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newDocument, setNewDocument] = useState({
    employeeId: '',
    employeeName: '',
    title: '',
    file: null,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch employees
        const { data: employeesData, error: employeesError } = await supabase
          .from('employees')
          .select('*');
        if (employeesError) throw employeesError;
        setEmployees(employeesData || []); // Ensure array even if null

        // Fetch documents
        const { data: documentsData, error: documentsError } = await supabase
          .from('documents')
          .select('*');
        if (documentsError) throw documentsError;
        setDocuments(documentsData || []); // Ensure array even if null
      } catch (err) {
        setError('Failed to fetch data.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDocument((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewDocument((prev) => ({ ...prev, file }));
  };

  const handleSubmitDocument = async () => {
  const requiredFields = ['employeeId', 'title', 'file'];
  const emptyFields = requiredFields.filter((field) => !newDocument[field]);

  if (emptyFields.length > 0) {
    setError(`Please fill in all required fields: ${emptyFields.join(', ')}`);
    return;
  }

  try {
    const selectedEmployee = employees.find((emp) => emp.id === newDocument.employeeId);
    if (!selectedEmployee) throw new Error('Employee not found');

    // Ensure unique filenames
    const fileName = `${Date.now()}-${newDocument.file.name}`;
    const filePath = `documents/${fileName}`;

    // Upload file to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('biogex-files') // Ensure this is your correct bucket name
      .upload(filePath, newDocument.file);

    if (uploadError) throw uploadError;

    // Retrieve public URL correctly
    const { data } = supabase.storage
      .from('biogex-files') // Use the correct bucket name
      .getPublicUrl(filePath);

    if (!data) throw new Error('Failed to retrieve file URL');

    const fileUrl = data.publicUrl;

    // Save document metadata to Supabase
    const documentData = {
      employee_id: newDocument.employeeId,
      employee_name: selectedEmployee.full_name,
      title: newDocument.title,
      file_url: fileUrl, // Store only the correct URL
    };

    const { error: insertError } = await supabase
      .from('documents')
      .insert([documentData]);

    if (insertError) throw insertError;

    setDocuments((prev) => [...prev, documentData]);
    setNewDocument({
      employeeId: '',
      employeeName: '',
      title: '',
      file: null,
    });
    setError('');
    handleCloseModal();
  } catch (err) {
    setError('Failed to upload document.');
    console.error('Error uploading document:', err);
  }
};


  if (loading) return (
    <>
      <style>{customStyles}</style>
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    </>
  );
  if (error) return <p>{error}</p>;

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
            {documents.length === 0 ? (
              <p className="text-center text-muted">No documents found.</p>
            ) : (
              <Table striped bordered hover className="documents-table">
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>Document Title</th>
                    <th>File</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc) => (
                    <tr key={doc.id}>
                      <td>{doc.employee_name}</td>
                      <td>{doc.title}</td>
                      <td>
                        <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                          View File
                        </a>
                      </td>
                      <td>
                        <Link
                          to="/hr-management/employee-list"
                          className="btn btn-sm"
                        >
                          View Employee
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
                <Form.Label>Employee Name</Form.Label>
                <Form.Control
                  as="select"
                  name="employeeId"
                  value={newDocument.employeeId}
                  onChange={(e) => {
                    const selectedEmployee = employees.find((emp) => emp.id === e.target.value);
                    setNewDocument((prev) => ({
                      ...prev,
                      employeeId: e.target.value,
                      employeeName: selectedEmployee ? selectedEmployee.full_name : '',
                    }));
                  }}
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.full_name}
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