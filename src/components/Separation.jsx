import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

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
        exit_interview: newSeparation.exitInterview,
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
    exitInterview: action.details,
  }));

  return (
    <div className="container my-5">
      <Card className="shadow">
        <Card.Header className="text-center" style={{ backgroundColor: '#28a745', color: '#fff' }}>
          <h2>Separation Management</h2>
        </Card.Header>
        <Card.Body>
          <Button variant="success" className="mb-4" onClick={handleShowModal}>
            Add Separation
          </Button>
          {separations.length === 0 && terminations.length === 0 ? (
            <p className="text-center text-muted">No separations recorded.</p>
          ) : (
            <Table striped bordered hover>
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
                  <tr key={separation.id}>
                    <td>{separation.employeeName}</td>
                    <td>{separation.type}</td>
                    <td>{separation.date}</td>
                    <td>{separation.exitInterview || 'N/A'}</td>
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
          <Modal.Title>Add Separation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Employee Name</Form.Label>
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
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
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
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={newSeparation.date}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Exit Interview Notes</Form.Label>
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
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="success" onClick={handleSubmitSeparation}>
            Submit Separation
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Separation;