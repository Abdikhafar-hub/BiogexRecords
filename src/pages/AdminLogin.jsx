import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import BiogexLogo from '../assets/biogexlogo.jpeg';
import { supabase } from '../supabaseClient';

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

  /* Mobile responsive styles */
  @media (max-width: 768px) {
    .login-card {
      width: 18rem !important; /* Reduced size for mobile */
      height: 420px; /* Reduced height for mobile, no scrolling */
      padding: 1rem; /* Adjusted padding to fit content */
    }

    .login-title {
      font-size: 1.5rem; /* Slightly smaller title */
    }

    .login-logo {
      width: 100px; /* Slightly smaller logo */
    }

    .form-control {
      font-size: 0.9rem; /* Slightly smaller inputs */
    }

    .btn {
      font-size: 0.9rem; /* Slightly smaller buttons */
    }

    .mb-3 {
      margin-bottom: 0.75rem !important; /* Adjusted spacing */
    }

    .mb-4 {
      margin-bottom: 1rem !important; /* Adjusted spacing */
    }
  }

  @media (max-width: 480px) {
    .login-card {
      width: 16rem !important; /* Even smaller for very small screens */
      height: 380px; /* Further reduced height, no scrolling */
      padding: 0.75rem; /* Further adjusted padding */
    }

    .login-title {
      font-size: 1.25rem;
    }

    .login-logo {
      width: 80px;
    }

    .form-control {
      font-size: 0.85rem;
    }

    .btn {
      font-size: 0.85rem;
    }

    .mb-3 {
      margin-bottom: 0.5rem !important;
    }

    .mb-4 {
      margin-bottom: 0.75rem !important;
    }
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
      console.log("Attempting login with:", { email, password });
      const { data, error: queryError } = await supabase
        .from('admins')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();
      console.log("Admin check response:", { data, queryError });

      if (queryError || !data) {
        setError('Invalid email or password');
        return;
      }

      onAdminLogin();
      navigate('/hr-management/employee-list');
    } catch (err) {
      setError('An unexpected error occurred. Check the console.');
      console.error('Login error:', err);
    }
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <>
      <style>{customStyles}</style>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card style={{ width: '22rem' }} className="shadow login-card">
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
                className="w-100 d-flex align-items-center justify-content-center mb-3"
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