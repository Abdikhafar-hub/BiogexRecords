import React, { useState } from 'react';
import { Card, Table, Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HRActions = ({ employees, hrActions, addHRAction }) => {
  const [showModal, setShowModal] = useState(false);
  const [newAction, setNewAction] = useState({
    employeeName: '',
    action: 'Promotion',
    date: '',
    details: '',
  });

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAction((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitAction = () => {
    addHRAction(newAction);
    setNewAction({
      employeeName: '',
      action: 'Promotion',
      date: '',
      details: '',
    });
    handleCloseModal();
  };

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
                {hrActions.map((action, index) => (
                  <tr key={index}>
                    <td>{action.employeeName}</td>
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

      {/* Modal for Adding HR Action */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add HR Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Employee Name</Form.Label>
              <Form.Control
                as="select"
                name="employeeName"
                value={newAction.employeeName}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp.employeeCode} value={emp.fullName}>
                    {emp.fullName}
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