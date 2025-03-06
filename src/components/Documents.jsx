import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

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
        setEmployees(employeesData);

        // Fetch documents
        const { data: documentsData, error: documentsError } = await supabase
          .from('documents')
          .select('*');
        if (documentsError) throw documentsError;
        setDocuments(documentsData);
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
      const selectedEmployee = employees.find(emp => emp.id === newDocument.employeeId);
      if (!selectedEmployee) throw new Error('Employee not found');

      // Upload the file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('biogex-files')
        .upload(`documents/${newDocument.file.name}`, newDocument.file);
      if (uploadError) throw uploadError;

      const fileUrl = supabase.storage.from('biogex-files').getPublicUrl(`documents/${newDocument.file.name}`).data.publicUrl;

      // Save document metadata to Supabase
      const documentData = {
        employee_id: newDocument.employeeId,
        employee_name: selectedEmployee.full_name,
        title: newDocument.title,
        file_url: fileUrl,
      };

      const { data, error: insertError } = await supabase
        .from('documents')
        .insert([documentData])
        .select()
        .single();
      if (insertError) throw insertError;

      setDocuments((prev) => [...prev, data]);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container my-5">
      <Card className="shadow">
        <Card.Header className="text-center" style={{ backgroundColor: '#28a745', color: '#fff' }}>
          <h2>Document Management</h2>
        </Card.Header>
        <Card.Body>
          <Button variant="success" className="mb-4" onClick={handleShowModal}>
            Upload Document
          </Button>
          {documents.length === 0 ? (
            <p className="text-center text-muted">No documents found.</p>
          ) : (
            <Table striped bordered hover>
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
                        className="btn btn-sm btn-primary"
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
        <Modal.Header closeButton>
          <Modal.Title>Upload Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Employee Name</Form.Label>
              <Form.Control
                as="select"
                name="employeeId"
                value={newDocument.employeeId}
                onChange={(e) => {
                  const selectedEmployee = employees.find(emp => emp.id === e.target.value);
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
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="success" onClick={handleSubmitDocument}>
            Upload Document
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Documents;