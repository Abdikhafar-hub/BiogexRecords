import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

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
        setEmployees(employeesData);

        // Fetch HR actions
        const { data: actionsData, error: actionsError } = await supabase
          .from('hr_actions')
          .select('*');
        if (actionsError) throw actionsError;
        setHRActions(actionsData);
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
      const selectedEmployee = employees.find(emp => emp.id === newAction.employeeId);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container my-5">
      <Card className="shadow">
        <Card.Header className="text-center" style={{ backgroundColor: '#28a745', color: '#fff' }}>
          <h2>HR Actions</h2>
        </Card.Header>
        <Card.Body>
          <Button variant="success" className="mb-4" onClick={handleShowModal}>
            Add HR Action
          </Button>
          {hrActions.length === 0 ? (
            <p className="text-center text-muted">No HR actions recorded.</p>
          ) : (
            <Table striped bordered hover>
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
                        className="btn btn-sm btn-primary"
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
        <Modal.Header closeButton>
          <Modal.Title>Add HR Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="form-error">{error}</div>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Employee Name</Form.Label>
              <Form.Control
                as="select"
                name="employeeId"
                value={newAction.employeeId}
                onChange={(e) => {
                  const selectedEmployee = employees.find(emp => emp.id === e.target.value);
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
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="success" onClick={handleSubmitAction}>
            Submit Action
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HRActions;