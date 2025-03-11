import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

// Custom CSS for Mobile Responsiveness
const customStyles = `
  .separation-container {
    padding: 1rem;
  }

  .separation-card {
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .separation-header {
    background-color: #28a745;
    color: #fff;
    padding: 1rem;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    text-align: center;
  }

  .separation-header h2 {
    font-size: 1.75rem;
    margin: 0;
  }

  .separation-body {
    padding: 1rem;
  }

  .add-separation-btn {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
  }

  .separation-table {
    font-size: 0.9rem;
  }

  .separation-table th,
  .separation-table td {
    padding: 0.75rem;
    text-align: center;
  }

  .separation-table .btn-sm {
    font-size: 0.85rem;
    padding: 0.25rem 0.5rem;
  }

  .modal-title {
    font-size: 1.25rem;
  }

  .modal-body {
    padding: 1rem;
  }

  .modal-footer {
    padding: 0.75rem;
  }

  .modal-footer .btn {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
  }

  /* Mobile Responsiveness */
  @media (max-width: 768px) {
    .separation-container {
      padding: 0.5rem;
    }

    .separation-card {
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .separation-header {
      padding: 0.75rem;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }

    .separation-header h2 {
      font-size: 1.25rem;
    }

    .separation-body {
      padding: 0.75rem;
      max-height: calc(100vh - 150px); /* Adjust for header and footer */
      overflow-y: auto;
      -webkit-overflow-scrolling: touch; /* Smooth scrolling on mobile */
    }

    .add-separation-btn {
      font-size: 0.8rem;
      padding: 0.4rem 0.75rem;
      margin-bottom: 0.75rem;
    }

    .separation-table {
      font-size: 0.75rem;
    }

    .separation-table th,
    .separation-table td {
      padding: 0.5rem;
    }

    .separation-table .btn-sm {
      font-size: 0.7rem;
      padding: 0.2rem 0.4rem;
    }

    .modal-title {
      font-size: 1rem;
    }

    .modal-body {
      padding: 0.75rem;
    }

    .modal-body .form-group {
      margin-bottom: 0.5rem;
    }

    .modal-body .form-label {
      font-size: 0.8rem;
    }

    .modal-body .form-control,
    .modal-body .form-select {
      font-size: 0.8rem;
      padding: 0.35rem;
    }

    .modal-footer {
      padding: 0.5rem;
    }

    .modal-footer .btn {
      font-size: 0.8rem;
      padding: 0.4rem 0.75rem;
    }
  }
`;

const Separation = () => {
  const [employees, setEmployees] = useState([]);
  const [separations, setSeparations] = useState([]);
  const [hrActions, setHRActions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newSeparation, setNewSeparation] = useState({
    employeeId: '',
    employeeName: '',
    type: 'Resignation',
    date: '',
    exitInterview: '',
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

        // Fetch HR actions (for terminations)
        const { data: actionsData, error: actionsError } = await supabase
          .from('hr_actions')
          .select('*')
          .eq('action', 'Termination');
        if (actionsError) throw actionsError;
        setHRActions(actionsData);

        // Fetch separations
        const { data: separationsData, error: separationsError } = await supabase
          .from('separations')
          .select('*');
        if (separationsError) throw separationsError;
        setSeparations(separationsData);
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
    setNewSeparation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitSeparation = async () => {
    const requiredFields = ['employeeId', 'type', 'date'];
    const emptyFields = requiredFields.filter((field) => !newSeparation[field]);

    if (emptyFields.length > 0) {
      setError(`Please fill in all required fields: ${emptyFields.join(', ')}`);
      return;
    }

    try {
      const selectedEmployee = employees.find(emp => emp.id === newSeparation.employeeId);
      if (!selectedEmployee) throw new Error('Employee not found');

      const separationData = {
        employee_id: newSeparation.employeeId,
        employee_name: selectedEmployee.full_name,
        type: newSeparation.type,
        date: newSeparation.date,
        exit_interview: newSeparation.exitInterview || 'N/A',
      };

      const { data, error: insertError } = await supabase
        .from('separations')
        .insert([separationData])
        .select()
        .single();
      if (insertError) throw insertError;

      setSeparations((prev) => [...prev, data]);
      setNewSeparation({
        employeeId: '',
        employeeName: '',
        type: 'Resignation',
        date: '',
        exitInterview: '',
      });
      setError('');
      handleCloseModal();
    } catch (err) {
      setError('Failed to submit separation.');
      console.error('Error submitting separation:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const terminations = hrActions.map((action) => ({
    id: action.id,
    employeeId: action.employee_id,
    employeeName: action.employee_name,
    type: 'Termination',
    date: action.date,
    exitInterview: action.details || 'N/A',
  }));

  return (
    <>
      <style>{customStyles}</style>
      <div className="separation-container">
        <Card className="separation-card">
          <Card.Header className="separation-header">
            <h2>Separation Management</h2>
          </Card.Header>
          <Card.Body className="separation-body">
            <Button variant="success" className="add-separation-btn" onClick={handleShowModal}>
              Add Separation
            </Button>
            {separations.length === 0 && terminations.length === 0 ? (
              <p className="text-center text-muted">No separations recorded.</p>
            ) : (
              <Table striped bordered hover className="separation-table">
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Exit Interview</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[...separations, ...terminations].map((separation) => (
                    <tr key={separation.id || separation.employee_id}>
                      <td>{separation.employee_name || separation.employeeName || 'Unknown'}</td>
                      <td>{separation.type}</td>
                      <td>{separation.date}</td>
                      <td>{separation.exit_interview || separation.exitInterview || 'N/A'}</td>
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
            <Modal.Title className="modal-title">Add Separation</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Form>
              <Form.Group className="mb-3 form-group">
                <Form.Label className="form-label">Employee Name</Form.Label>
                <Form.Control
                  as="select"
                  name="employeeId"
                  value={newSeparation.employeeId}
                  onChange={(e) => {
                    const selectedEmployee = employees.find(emp => emp.id === e.target.value);
                    setNewSeparation((prev) => ({
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
              <Form.Group className="mb-3 form-group">
                <Form.Label className="form-label">Type</Form.Label>
                <Form.Control
                  as="select"
                  name="type"
                  value={newSeparation.type}
                  onChange={handleInputChange}
                >
                  <option value="Resignation">Resignation</option>
                  <option value="Termination">Termination</option>
                  <option value="Retirement">Retirement</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3 form-group">
                <Form.Label className="form-label">Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={newSeparation.date}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3 form-group">
                <Form.Label className="form-label">Exit Interview Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  name="exitInterview"
                  value={newSeparation.exitInterview}
                  onChange={handleInputChange}
                  placeholder="Enter exit interview notes"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="modal-footer">
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="success" onClick={handleSubmitSeparation}>
              Submit Separation
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Separation;