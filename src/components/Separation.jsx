import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

// Custom CSS with Spinner and Enhanced Mobile Responsiveness
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

  .separation-container {
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
    background: linear-gradient(135deg, #f8fafc 0%, #e6f0fa 100%);
    padding: 2rem 1rem;
  }

  .separation-card {
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

  .separation-card:hover {
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.15), -10px -10px 20px rgba(255, 255, 255, 0.7);
  }

  .separation-header {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    padding: 1.5rem;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    text-align: center;
  }

  .separation-header h2 {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 1px;
    margin: 0;
  }

  .separation-body {
    padding: 2rem 1.5rem;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }

  .add-separation-btn {
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

  .add-separation-btn:hover {
    background: linear-gradient(90deg, #28a745 0%, #047857 100%);
    box-shadow: 0 6px 16px rgba(4, 120, 87, 0.5);
    transform: translateY(-2px);
  }

  .separation-table {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    min-width: 600px; /* Ensure table scrolls horizontally on small screens */
    font-size: 0.9rem;
  }

  .separation-table th {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    font-weight: 600;
    padding: 0.75rem;
    text-align: center;
    white-space: nowrap;
  }

  .separation-table td {
    color: #4b5563;
    padding: 0.75rem;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .separation-table tr:hover {
    background-color: #f1f5f9;
  }

  .separation-table .btn-sm {
    font-size: 0.85rem;
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border: none;
    transition: all 0.3s ease;
  }

  .separation-table .btn-sm:hover {
    background: linear-gradient(90deg, #28a745 0%, #047857 100%);
    box-shadow: 0 4px 8px rgba(4, 120, 87, 0.4);
  }

  .separation-modal-header {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding: 1rem;
  }

  .modal-title {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .modal-body {
    padding: 1.5rem;
  }

  .modal-footer {
    border-top: none;
    padding: 1rem;
  }

  .modal-footer .btn {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    transition: all 0.3s ease;
  }

  .modal-footer .btn-secondary {
    background: #6c757d;
    border: none;
    box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);
  }

  .modal-footer .btn-secondary:hover {
    background: #5a6268;
    box-shadow: 0 6px 16px rgba(108, 117, 125, 0.5);
    transform: translateY(-2px);
  }

  .modal-footer .btn-success {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    border: none;
    box-shadow: 0 4px 12px rgba(4, 120, 87, 0.3);
  }

  .modal-footer .btn-success:hover {
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
    .separation-container {
      padding: 1rem 0.5rem;
    }

    .separation-card {
      border-radius: 12px;
      box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1), -4px -4px 8px rgba(255, 255, 255, 0.5);
      max-width: 100%;
    }

    .separation-header {
      padding: 1rem;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    .separation-header h2 {
      font-size: 1.5rem;
      letter-spacing: 0.5px;
    }

    .separation-body {
      padding: 1rem;
      max-height: calc(100vh - 150px); /* Adjust for header and footer */
      overflow-y: auto;
      -webkit-overflow-scrolling: touch; /* Smooth scrolling on mobile */
    }

    .add-separation-btn {
      font-size: 0.85rem;
      padding: 0.5rem 1rem;
      margin-bottom: 1rem;
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

    .separation-modal-header {
      padding: 0.75rem;
    }

    .modal-title {
      font-size: 1.25rem;
    }

    .modal-body {
      padding: 1rem;
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
      padding: 0.75rem;
    }

    .modal-footer .btn {
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
        setEmployees(employeesData || []); // Ensure array even if null

        // Fetch HR actions (for terminations)
        const { data: actionsData, error: actionsError } = await supabase
          .from('hr_actions')
          .select('*')
          .eq('action', 'Termination');
        if (actionsError) throw actionsError;
        setHRActions(actionsData || []); // Ensure array even if null

        // Fetch separations
        const { data: separationsData, error: separationsError } = await supabase
          .from('separations')
          .select('*');
        if (separationsError) throw separationsError;
        setSeparations(separationsData || []); // Ensure array even if null
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
      const selectedEmployee = employees.find((emp) => emp.id === newSeparation.employeeId);
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

  if (loading) return (
    <>
      <style>{customStyles}</style>
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    </>
  );
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
            <Button className="add-separation-btn" onClick={handleShowModal}>
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
                    <tr key={separation.id || separation.employeeId}>
                      <td>{separation.employee_name || separation.employeeName || 'Unknown'}</td>
                      <td>{separation.type}</td>
                      <td>{separation.date}</td>
                      <td>{separation.exit_interview || separation.exitInterview || 'N/A'}</td>
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
          <Modal.Header closeButton className="separation-modal-header">
            <Modal.Title className="modal-title">Add Separation</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            {error && <div className="form-error">{error}</div>}
            <Form>
              <Form.Group className="mb-3 form-group">
                <Form.Label className="form-label">Employee Name</Form.Label>
                <Form.Control
                  as="select"
                  name="employeeId"
                  value={newSeparation.employeeId}
                  onChange={(e) => {
                    const selectedEmployee = employees.find((emp) => emp.id === e.target.value);
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