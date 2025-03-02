import React, { useState } from 'react';
import { Card, Table, Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LeaveAttendance = ({ employees, leaveRequests, addLeaveRequest }) => {
  const [showModal, setShowModal] = useState(false);
  const [newRequest, setNewRequest] = useState({
    employeeName: '',
    startDate: '',
    endDate: '',
    type: 'Sick Leave',
    status: 'Pending',
  });

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRequest((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitRequest = () => {
    addLeaveRequest(newRequest);
    setNewRequest({
      employeeName: '',
      startDate: '',
      endDate: '',
      type: 'Sick Leave',
      status: 'Pending',
    });
    handleCloseModal();
  };

  return (
    <div className="container my-5">
      <Card className="shadow">
        <Card.Header className="text-center" style={{ backgroundColor: '#28a745', color: '#fff' }}>
          <h2>Leave & Attendance</h2>
        </Card.Header>
        <Card.Body>
          <Button variant="success" className="mb-4" onClick={handleShowModal}>
            Add Leave Request
          </Button>
          {leaveRequests.length === 0 ? (
            <p className="text-center text-muted">No leave requests found.</p>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((request, index) => (
                  <tr key={index}>
                    <td>{request.employeeName}</td>
                    <td>{request.startDate}</td>
                    <td>{request.endDate}</td>
                    <td>{request.type}</td>
                    <td>{request.status}</td>
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

      {/* Modal for Adding Leave Request */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Leave Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Employee Name</Form.Label>
              <Form.Control
                as="select"
                name="employeeName"
                value={newRequest.employeeName}
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
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={newRequest.startDate}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={newRequest.endDate}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Leave Type</Form.Label>
              <Form.Control
                as="select"
                name="type"
                value={newRequest.type}
                onChange={handleInputChange}
              >
                <option value="Sick Leave">Sick Leave</option>
                <option value="Annual Leave">Annual Leave</option>
                <option value="Maternity Leave">Maternity Leave</option>
                <option value="Paternity Leave">Paternity Leave</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="success" onClick={handleSubmitRequest}>
            Submit Request
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LeaveAttendance;