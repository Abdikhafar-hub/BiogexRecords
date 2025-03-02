import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Container, Form, Button, Card } from 'react-bootstrap';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    // Placeholder for signup logic (e.g., API call)
    console.log('Signup attempted with:', { email, password });
    // For now, navigate back to login after signup
    navigate('/');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '22rem' }} className="shadow">
        <Card.Body>
          <h2 className="text-center mb-4">Sign up for Biogex</h2>
          <Form onSubmit={handleSignup}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
              />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100">
              Sign up
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
  );
};

export default Signup;