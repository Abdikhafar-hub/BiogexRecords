import React, { useState } from 'react';
import { Card, ListGroup, Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Messenger = ({ employees, messages, addMessage }) => {
  const [showModal, setShowModal] = useState(false);
  const [newMessage, setNewMessage] = useState({
    sender: 'HR',
    recipient: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMessage((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendMessage = () => {
    addMessage(newMessage);
    setNewMessage({
      sender: 'HR',
      recipient: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
    });
    handleCloseModal();
  };

  return (
    <div className="container my-5">
      <Card className="shadow">
        <Card.Header className="text-center" style={{ backgroundColor: '#28a745', color: '#fff' }}>
          <h2>Messenger</h2>
        </Card.Header>
        <Card.Body>
          <Button variant="success" className="mb-4" onClick={handleShowModal}>
            Send Message
          </Button>
          {messages.length === 0 ? (
            <p className="text-center text-muted">No messages found.</p>
          ) : (
            <ListGroup>
              {messages.map((msg, index) => (
                <ListGroup.Item key={index}>
                  <strong>From:</strong> {msg.sender} <br />
                  <strong>To:</strong> {msg.recipient} <br />
                  <strong>Date:</strong> {msg.date} <br />
                  <strong>Message:</strong> {msg.content} <br />
                  <Link
                    to="/hr-management/employee-list"
                    className="btn btn-sm btn-primary mt-2"
                  >
                    View Employee
                  </Link>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>

      {/* Modal for Sending Message */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Send Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Recipient</Form.Label>
              <Form.Control
                as="select"
                name="recipient"
                value={newMessage.recipient}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Recipient</option>
                <option value="All Employees">All Employees</option>
                {employees.map((emp) => (
                  <option key={emp.employeeCode} value={emp.fullName}>
                    {emp.fullName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message Content</Form.Label>
              <Form.Control
                as="textarea"
                name="content"
                value={newMessage.content}
                onChange={handleInputChange}
                placeholder="Enter your message"
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="success" onClick={handleSendMessage}>
            Send Message
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Messenger;