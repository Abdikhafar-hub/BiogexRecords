import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

// Custom CSS (unchanged)
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

  .mysary-container {
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
    background: linear-gradient(135deg, #f8fafc 0%, #e6f0fa 100%);
    padding: 2rem 1rem;
  }

  .mysary-card {
    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
    border: 2px solid transparent;
    border-image: linear-gradient(90deg, #047857 0%, #28a745 100%) 1;
    border-radius: 20px;
    box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.5);
    transition: all 0.3s ease;
  }

  .mysary-card:hover {
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.15), -10px -10px 20px rgba(255, 255, 255, 0.7);
  }

  .mysary-header {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    padding: 1.5rem;
  }

  .mysary-header-title {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 1px;
  }

  .mysary-body {
    padding: 2rem 1.5rem;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }

  .mysary-section-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #047857;
    margin-top: 2rem;
    margin-bottom: 1rem;
    position: relative;
    padding-bottom: 0.5rem;
  }

  .mysary-section-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    border-radius: 2px;
  }

  .mysary-list-group-item {
    color: #4b5563;
    padding: 1rem;
    border-left: 4px solid #047857;
    margin-bottom: 0.5rem;
    border-radius: 8px;
  }

  .mysary-button {
    font-weight: 600;
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(4, 120, 87, 0.3);
  }

  .mysary-button.primary {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border: none;
  }

  .mysary-button.primary:hover {
    background: linear-gradient(90deg, #28a745 0%, #047857 100%);
    box-shadow: 0 6px 16px rgba(4, 120, 87, 0.5);
    transform: translateY(-2px);
  }

  .mysary-modal-header {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .mysary-modal-title {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .mysary-modal-body {
    padding: 1.5rem;
  }

  .mysary-modal-footer {
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
`;

const Messenger = () => {
  const [employees, setEmployees] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newMessage, setNewMessage] = useState({
    receiverId: '',
    receiverName: '',
    email: '',
    message: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Default sender details
  const defaultSender = {
    email: 'info@biogexpharma.com',
    name: 'Biogex Pharma',
  };

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

        // Fetch messages
        const { data: messageData, error: messageError } = await supabase
          .from('messages')
          .select('*');
        if (messageError) throw messageError;
        setMessages(messageData);
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
    setNewMessage((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendMessage = async () => {
    const requiredFields = ['receiverId', 'email', 'message'];
    const emptyFields = requiredFields.filter((field) => !newMessage[field]);
  
    if (emptyFields.length > 0) {
      setError(`Please fill in all required fields: ${emptyFields.join(', ')}`);
      return;
    }
  
    // Validate that receiverId is a valid UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(newMessage.receiverId)) {
      setError('Invalid recipient ID. Please select a valid employee.');
      return;
    }
  
    try {
      const receiver = employees.find((emp) => emp.id === newMessage.receiverId);
      if (!receiver) throw new Error('Receiver not found');
  
      const messageData = {
        sender_id: 'biogex_default',
        sender_name: defaultSender.name,
        sender_email: defaultSender.email,
        receiver_id: newMessage.receiverId,
        receiver_name: receiver.full_name,
        recipient_email: newMessage.email,
        message: newMessage.message,
      };
  
      const { data, error: insertError } = await supabase
        .from('messages')
        .insert([messageData])
        .select()
        .single();
      if (insertError) throw insertError;
  
      console.log(`Simulating email send to ${newMessage.email}:`, {
        from: defaultSender.name,
        to: receiver.full_name,
        message: newMessage.message,
      });
      alert(`Message saved and email simulated to ${newMessage.email}! Check the console for details.`);
  
      setMessages((prev) => [...prev, data]);
      setNewMessage({
        receiverId: '',
        receiverName: '',
        email: '',
        message: '',
        date: new Date().toISOString().split('T')[0],
      });
      setError('');
      handleCloseModal();
    } catch (err) {
      setError('Failed to send message: ' + err.message);
      console.error('Error sending message:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <style>{customStyles}</style>
      <div className="mysary-container">
        <Card className="mysary-card">
          <Card.Header className="mysary-header text-center">
            <h2 className="mysary-header-title">Messenger</h2>
          </Card.Header>
          <Card.Body className="mysary-body">
            <Button
              variant="success"
              className="mysary-button primary mb-4"
              onClick={handleShowModal}
            >
              Send Message
            </Button>
            {messages.length === 0 ? (
              <p className="text-center text-muted">No messages found.</p>
            ) : (
              <ListGroup>
                {messages.map((msg) => (
                  <ListGroup.Item key={msg.id} className="mysary-list-group-item">
                    <strong>From:</strong> {msg.sender_name} ({msg.sender_email}) <br />
                    <strong>To:</strong> {msg.receiver_name} <br />
                    <strong>Email:</strong> {msg.recipient_email} <br />
                    <strong>Date:</strong> {new Date(msg.created_at).toLocaleDateString()} <br />
                    <strong>Message:</strong> {msg.message} <br />
                    <Link
                      to="/hr-management/employee-list"
                      className="btn btn-sm mysary-button primary mt-2"
                    >
                      View Employee
                    </Link>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Card.Body>
        </Card>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton className="mysary-modal-header">
            <Modal.Title className="mysary-modal-title">Send Message</Modal.Title>
          </Modal.Header>
          <Modal.Body className="mysary-modal-body">
            {error && <div className="form-error">{error}</div>}
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Sender</Form.Label>
                <Form.Control
                  type="text"
                  value={`${defaultSender.name} (${defaultSender.email})`}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Recipient</Form.Label>
                <Form.Control
                  as="select"
                  name="receiverId"
                  value={newMessage.receiverId}
                  onChange={(e) => {
                    const selectedEmployee = employees.find((emp) => emp.id === e.target.value);
                    setNewMessage((prev) => ({
                      ...prev,
                      receiverId: e.target.value,
                      receiverName: selectedEmployee ? selectedEmployee.full_name : '',
                      email: selectedEmployee ? selectedEmployee.email : '',
                    }));
                  }}
                  required
                >
                  <option value="">Select Recipient</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.full_name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={newMessage.email}
                  onChange={handleInputChange}
                  placeholder="Enter recipient's email"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Message Content</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message"
                  value={newMessage.message}
                  onChange={handleInputChange}
                  placeholder="Enter your message"
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="mysary-modal-footer">
            <Button
              variant="secondary"
              className="mysary-button secondary"
              onClick={handleCloseModal}
            >
              Close
            </Button>
            <Button
              variant="success"
              className="mysary-button primary"
              onClick={handleSendMessage}
            >
              Send Message
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Messenger;