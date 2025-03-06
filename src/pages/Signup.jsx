import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { supabase } from '../supabaseClient';

// Custom CSS for styling (same as Login for consistency)
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

  .signup-title {
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

  .error-message {
    font-family: 'Poppins', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    margin-top: 1rem;
  }
`;

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Sign up the user with Supabase Auth
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: 'customer', // Default role for new users
          },
        },
      });

      if (signupError) {
        throw new Error(signupError.message || 'Failed to sign up');
      }

      // Navigate back to login after signup
      navigate('/');
    } catch (err) {
      setError(err.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{customStyles}</style>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card style={{ width: '22rem' }} className="shadow">
          <Card.Body>
            <h2 className="signup-title text-center mb-4">Sign up for Biogex</h2>
            {error && (
              <Alert variant="danger" className="error-message">
                {error}
              </Alert>
            )}
            <Form onSubmit={handleSignup}>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </Form.Group>

              <Button
                style={{ backgroundColor: '#047857', border: 'none' }}
                type="submit"
                className="w-100"
                disabled={loading}
              >
                {loading ? 'Signing up...' : 'Sign up'}
              </Button>
            </Form>
            <div className="text-center mt-3">
              <p>
                Already have an account?{' '}
                <NavLink to="/" style={{ color: '#28a745', textDecoration: 'none' }}>
                  Sign in
                </NavLink>
              </p>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Signup;

