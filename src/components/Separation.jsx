import React, { useState } from 'react';
import { Card, Table, Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Separation = ({ employees, hrActions }) => {
  const [separations, setSeparations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newSeparation, setNewSeparation] = useState({
    employeeName: '',
    type: 'Resignation',
    date: '',
    exitInterview: '',
  });

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSeparation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitSeparation = () => {
    setSeparations((prev) => [...prev, newSeparation]);
    setNewSeparation({
      employeeName: '',
      type: 'Resignation',
      date: '',
      exitInterview: '',
    });
    handleCloseModal();
  };

  // Filter HR actions for terminations
  const terminations = hrActions.filter((action) => action.action === 'Termination');

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
                {[...separations, ...terminations.map((action) => ({
                  employeeName: action.employeeName,
                  type: 'Termination',
                  date: action.date,
                  exitInterview: action.details,
                }))].map((separation, index) => (
                  <tr key={index}>
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

      {/* Modal for Adding Separation */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Separation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Employee Name</Form.Label>
              <Form.Control
                as="select"
                name="employeeName"
                value={newSeparation.employeeName}
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