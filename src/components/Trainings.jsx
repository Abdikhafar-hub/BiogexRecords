import React, { useState } from 'react';
import { Card, Table, Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Trainings = ({ employees, trainings, addTraining }) => {
  const [showModal, setShowModal] = useState(false);
  const [newTraining, setNewTraining] = useState({
    title: '',
    date: '',
    employeeName: '',
    status: 'Scheduled',
  });

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTraining((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitTraining = () => {
    addTraining(newTraining);
    setNewTraining({
      title: '',
      date: '',
      employeeName: '',
      status: 'Scheduled',
    });
    handleCloseModal();
  };

  return (
    <div className="container my-5">
      <Card className="shadow">
        <Card.Header className="text-center" style={{ backgroundColor: '#28a745', color: '#fff' }}>
          <h2>Training Management</h2>
        </Card.Header>
        <Card.Body>
          <Button variant="success" className="mb-4" onClick={handleShowModal}>
            Schedule Training
          </Button>
          {trainings.length === 0 ? (
            <p className="text-center text-muted">No trainings scheduled.</p>
          ) : (
            <Table striped bordered hover>
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
                {trainings.map((training, index) => (
                  <tr key={index}>
                    <td>{training.title}</td>
                    <td>{training.date}</td>
                    <td>{training.employeeName}</td>
                    <td>{training.status}</td>
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

      {/* Modal for Scheduling Training */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Schedule Training</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Training Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newTraining.title}
                onChange={handleInputChange}
                placeholder="e.g., GMP Compliance Training"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={newTraining.date}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Employee Name</Form.Label>
              <Form.Control
                as="select"
                name="employeeName"
                value={newTraining.employeeName}
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="success" onClick={handleSubmitTraining}>
            Schedule Training
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Trainings;