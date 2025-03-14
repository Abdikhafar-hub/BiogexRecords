import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

// Custom CSS with Spinner and Mobile Responsiveness
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

  .hr-actions-container {
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
    background: linear-gradient(135deg, #f8fafc 0%, #e6f0fa 100%);
    padding: 2rem 1rem;
  }

  .hr-actions-card {
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

  .hr-actions-card:hover {
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.15), -10px -10px 20px rgba(255, 255, 255, 0.7);
  }

  .hr-actions-header {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    padding: 1.5rem;
    text-align: center;
  }

  .hr-actions-header-title {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 1px;
  }

  .hr-actions-body {
    padding: 2rem 1.5rem;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }

  .hr-actions-table {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    min-width: 600px; /* Ensure table scrolls horizontally on small screens */
  }

  .hr-actions-table th {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    font-weight: 600;
    padding: 0.75rem;
    font-size: 0.9rem;
    white-space: nowrap;
  }

  .hr-actions-table td {
    color: #4b5563;
    vertical-align: middle;
    padding: 0.75rem;
    font-size: 0.85rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .hr-actions-table tr:hover {
    background-color: #f1f5f9;
  }

  .hr-actions-button {
    font-weight: 600;
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(4, 120, 87, 0.3);
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border: none;
  }

  .hr-actions-button:hover {
    background: linear-gradient(90deg, #28a745 0%, #047857 100%);
    box-shadow: 0 6px 16px rgba(4, 120, 87, 0.5);
    transform: translateY(-2px);
  }

  .hr-actions-modal-header {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding: 1rem;
  }

  .hr-actions-modal-title {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .hr-actions-modal-body {
    padding: 1.5rem;
  }

  .hr-actions-modal-footer {
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
    .hr-actions-container {
      padding: 1rem 0.5rem;
    }

    .hr-actions-card {
      border-radius: 12px;
      box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1), -4px -4px 8px rgba(255, 255, 255, 0.5);
      max-width: 100%;
    }

    .hr-actions-header {
      padding: 1rem;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    .hr-actions-header-title {
      font-size: 1.5rem;
      letter-spacing: 0.5px;
    }

    .hr-actions-body {
      padding: 1rem;
    }

    .hr-actions-table th {
      padding: 0.5rem;
      font-size: 0.8rem;
    }

    .hr-actions-table td {
      padding: 0.5rem;
      font-size: 0.75rem;
    }

    .hr-actions-button {
      font-size: 0.85rem;
      padding: 0.5rem 1rem;
    }

    .hr-actions-modal-header {
      padding: 0.75rem;
    }

    .hr-actions-modal-title {
      font-size: 1.25rem;
    }

    .hr-actions-modal-body {
      padding: 1rem;
    }

    .hr-actions-modal-footer {
      padding: 0.75rem;
    }

    .form-error {
      font-size: 0.8rem;
      margin: 0.5rem 0;
      padding: 0.5rem;
    }

    .spinner {
      width: 30px; /* Smaller on mobile */
      height: 30px;
      border: 3px solid #047857;
      border-top: 3px solid transparent;
    }
  }
`;

const HRActions = () => {
  const [employees, setEmployees] = useState([]);
  const [hrActions, setHRActions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newAction, setNewAction] = useState({
    employeeId: '',
    employeeName: '',
    action: 'Promotion',
    date: '',
    details: '',
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

        // Fetch HR actions
        const { data: actionsData, error: actionsError } = await supabase
          .from('hr_actions')
          .select('*');
        if (actionsError) throw actionsError;
        setHRActions(actionsData || []); // Ensure array even if null
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
    setNewAction((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitAction = async () => {
    const requiredFields = ['employeeId', 'action', 'date', 'details'];
    const emptyFields = requiredFields.filter((field) => !newAction[field]);

    if (emptyFields.length > 0) {
      setError(`Please fill in all required fields: ${emptyFields.join(', ')}`);
      return;
    }

    try {
      const selectedEmployee = employees.find((emp) => emp.id === newAction.employeeId);
      if (!selectedEmployee) throw new Error('Employee not found');

      const actionData = {
        employee_id: newAction.employeeId,
        employee_name: selectedEmployee.full_name,
        action: newAction.action,
        date: newAction.date,
        details: newAction.details,
      };

      const { data, error: insertError } = await supabase
        .from('hr_actions')
        .insert([actionData])
        .select()
        .single();
      if (insertError) throw insertError;

      setHRActions((prev) => [...prev, data]);
      setNewAction({
        employeeId: '',
        employeeName: '',
        action: 'Promotion',
        date: '',
        details: '',
      });
      setError('');
      handleCloseModal();
    } catch (err) {
      setError('Failed to submit HR action.');
      console.error('Error submitting HR action:', err);
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
      <div className="hr-actions-container">
        <Card className="hr-actions-card">
          <Card.Header className="hr-actions-header">
            <h2 className="hr-actions-header-title">HR Actions</h2>
          </Card.Header>
          <Card.Body className="hr-actions-body">
            <Button className="hr-actions-button mb-4" onClick={handleShowModal}>
              Add HR Action
            </Button>
            {hrActions.length === 0 ? (
              <p className="text-center text-muted">No HR actions recorded.</p>
            ) : (
              <Table striped bordered hover className="hr-actions-table">
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>Action</th>
                    <th>Date</th>
                    <th>Details</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {hrActions.map((action) => (
                    <tr key={action.id}>
                      <td>{action.employee_name}</td>
                      <td>{action.action}</td>
                      <td>{action.date}</td>
                      <td>{action.details}</td>
                      <td>
                        <Link
                          to={action.action === 'Termination' ? '/hr-management/separation' : '/hr-management/employee-list'}
                          className="btn btn-sm hr-actions-button"
                        >
                          {action.action === 'Termination' ? 'View Separation' : 'View Employee'}
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
          <Modal.Header closeButton className="hr-actions-modal-header">
            <Modal.Title className="hr-actions-modal-title">Add HR Action</Modal.Title>
          </Modal.Header>
          <Modal.Body className="hr-actions-modal-body">
            {error && <div className="form-error">{error}</div>}
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Employee Name</Form.Label>
                <Form.Control
                  as="select"
                  name="employeeId"
                  value={newAction.employeeId}
                  onChange={(e) => {
                    const selectedEmployee = employees.find((emp) => emp.id === e.target.value);
                    setNewAction((prev) => ({
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
                <Form.Label>Action</Form.Label>
                <Form.Control
                  as="select"
                  name="action"
                  value={newAction.action}
                  onChange={handleInputChange}
                >
                  <option value="Promotion">Promotion</option>
                  <option value="Transfer">Transfer</option>
                  <option value="Warning">Warning</option>
                  <option value="Termination">Termination</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={newAction.date}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Details</Form.Label>
                <Form.Control
                  as="textarea"
                  name="details"
                  value={newAction.details}
                  onChange={handleInputChange}
                  placeholder="Enter details of the action"
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="hr-actions-modal-footer">
            <Button variant="secondary" className="hr-actions-button" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="success" className="hr-actions-button" onClick={handleSubmitAction}>
              Submit Action
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default HRActions;