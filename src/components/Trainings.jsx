import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

// Custom CSS for styling (reusing from MySary)
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

  .mysary-container {
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
    background: linear-gradient(135deg, #f8fafc 0%, #e6f0fa 100%);
    padding: 2rem 1rem;
  }

  .mysary-card {
    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
    border: 2px solid transparent;
    border-image: linear-gradient(90deg, #047857 0%, #28a745 100%) 1;
    border-radius: 20px;
    box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.5);
    transition: all 0.3s ease;
  }

  .mysary-card:hover {
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.15), -10px -10px 20px rgba(255, 255, 255, 0.7);
  }

  .mysary-header {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    padding: 1.5rem;
  }

  .mysary-header-title {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 1px;
  }

  .mysary-body {
    padding: 2rem 1.5rem;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }

  .mysary-section-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #047857;
    margin-top: 2rem;
    margin-bottom: 1rem;
    position: relative;
    padding-bottom: 0.5rem;
  }

  .mysary-section-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    border-radius: 2px;
  }

  .mysary-table {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .mysary-table th {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    font-weight: 600;
  }

  .mysary-table td {
    color: #4b5563;
    vertical-align: middle;
  }

  .mysary-button {
    font-weight: 600;
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(4, 120, 87, 0.3);
  }

  .mysary-button.primary {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border: none;
  }

  .mysary-button.primary:hover {
    background: linear-gradient(90deg, #28a745 0%, #047857 100%);
    box-shadow: 0 6px 16px rgba(4, 120, 87, 0.5);
    transform: translateY(-2px);
  }

  .mysary-modal-header {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .mysary-modal-title {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .mysary-modal-body {
    padding: 1.5rem;
  }

  .mysary-modal-footer {
    border-top: none;
    padding: 1rem;
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
`;

const Trainings = () => {
  const [employees, setEmployees] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTraining, setNewTraining] = useState({
    employeeId: '',
    employeeName: '',
    trainingName: '',
    trainingDate: '',
    description: '',
    status: 'Scheduled',
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

        // Fetch trainings
        const { data: trainingData, error: trainingError } = await supabase
          .from('trainings')
          .select('*');
        if (trainingError) throw trainingError;
        setTrainings(trainingData);
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
    setNewTraining((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitTraining = async () => {
    const requiredFields = ['employeeId', 'trainingName', 'trainingDate'];
    const emptyFields = requiredFields.filter((field) => !newTraining[field]);

    if (emptyFields.length > 0) {
      setError(`Please fill in all required fields: ${emptyFields.join(', ')}`);
      return;
    }

    try {
      const selectedEmployee = employees.find(emp => emp.id === newTraining.employeeId);
      if (!selectedEmployee) throw new Error('Employee not found');

      const trainingData = {
        employee_id: newTraining.employeeId,
        employee_name: selectedEmployee.full_name,
        training_name: newTraining.trainingName,
        training_date: newTraining.trainingDate,
        description: newTraining.description,
        status: newTraining.status, // Include status
      };

      const { data, error: insertError } = await supabase
        .from('trainings')
        .insert([trainingData])
        .select()
        .single();
      if (insertError) throw insertError;

      setTrainings((prev) => [...prev, { ...data, status: newTraining.status }]);
      setNewTraining({
        employeeId: '',
        employeeName: '',
        trainingName: '',
        trainingDate: '',
        description: '',
        status: 'Scheduled',
      });
      setError('');
      handleCloseModal();
    } catch (err) {
      setError('Failed to schedule training.');
      console.error('Error scheduling training:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <style>{customStyles}</style>
      <div className="mysary-container">
        <Card className="mysary-card">
          <Card.Header className="mysary-header text-center">
            <h2 className="mysary-header-title">Training Management</h2>
          </Card.Header>
          <Card.Body className="mysary-body">
            <Button variant="success" className="mysary-button primary mb-4" onClick={handleShowModal}>
              Schedule Training
            </Button>
            {trainings.length === 0 ? (
              <p className="text-center text-muted">No trainings scheduled.</p>
            ) : (
              <Table striped bordered hover className="mysary-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Employee Name</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {trainings.map((training) => (
                    <tr key={training.id}>
                      <td>{training.training_name}</td>
                      <td>{training.training_date}</td>
                      <td>{training.employee_name}</td>
                      <td>{training.status || 'Scheduled'}</td>
                      <td>
                        <Link
                          to="/hr-management/employee-list"
                          className="btn btn-sm mysary-button primary"
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
          <Modal.Header closeButton className="mysary-modal-header">
            <Modal.Title className="mysary-modal-title">Schedule Training</Modal.Title>
          </Modal.Header>
          <Modal.Body className="mysary-modal-body">
            {error && <div className="form-error">{error}</div>}
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Training Title</Form.Label>
                <Form.Control
                  type="text"
                  name="trainingName"
                  value={newTraining.trainingName}
                  onChange={handleInputChange}
                  placeholder="e.g., GMP Compliance Training"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="trainingDate"
                  value={newTraining.trainingDate}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Employee Name</Form.Label>
                <Form.Control
                  as="select"
                  name="employeeId"
                  value={newTraining.employeeId}
                  onChange={(e) => {
                    const selectedEmployee = employees.find(emp => emp.id === e.target.value);
                    setNewTraining((prev) => ({
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
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={newTraining.description}
                  onChange={handleInputChange}
                  placeholder="Enter description (optional)"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="mysary-modal-footer">
            <Button variant="secondary" className="mysary-button secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="success" className="mysary-button primary" onClick={handleSubmitTraining}>
              Schedule Training
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Trainings;