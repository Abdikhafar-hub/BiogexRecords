import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import BiogexLogo from '../assets/biogexlogo.jpeg';
import { supabase } from '../supabaseClient'; // Import Supabase client

const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

  .login-title {
    font-family: 'Poppins', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    letter-spacing: 1px;
    margin-top: 1rem;
  }

  .login-logo {
    width: 120px;
    height: auto;
    transition: transform 0.3s ease;
  }

  .login-logo:hover {
    transform: scale(1.1);
  }

  .error-message {
    color: #dc3545;
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }
`;

const AdminLogin = ({ onAdminLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Check admin credentials against the admins table
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('email', email)
        .eq('password', password) // Note: In production, use hashed passwords
        .single();

      if (error || !data) {
        setError('Invalid email or password');
        return;
      }

      // If credentials are correct, trigger onAdminLogin and navigate
      onAdminLogin();
      navigate('/hr-management');
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    }
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <>
      <style>{customStyles}</style>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card style={{ width: '22rem' }} className="shadow">
          <Card.Body>
            <div className="text-center mb-3">
              <img src={BiogexLogo} alt="Biogex Pharma Logo" className="login-logo" />
            </div>
            <h2 className="login-title text-center mb-4">Admin Login - HR Portal</h2>
            {error && <p className="error-message text-center">{error}</p>}
            <Form onSubmit={handleAdminLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter admin email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button style={{ backgroundColor: '#047857', border: 'none' }} type="submit" className="w-100 mb-3">
                Login as Admin
              </Button>
              <Button
                variant="outline-secondary"
                onClick={handleBackToDashboard}
                className="w-100 d-flex align-items-center justify-content-center"
              >
                <FaArrowLeft className="mr-2" />
                Back to Dashboard
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default AdminLogin;