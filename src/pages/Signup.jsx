import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { supabase } from '../supabaseClient';

// Import the logo (adjust the path as needed)
import BiogexLogo from '../assets/biogexlogo.jpeg';

// Custom CSS for styling (aligned with Login)
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

  .signup-container {
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    padding: 0;
    margin: 0;
    width: 100vw;
    overflow: hidden;
  }

  .signup-card {
    width: 100%;
    max-width: 22rem;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .signup-logo {
    width: 120px;
    height: auto;
    transition: transform 0.3s ease;
  }

  .signup-logo:hover {
    transform: scale(1.1);
  }

  .signup-title {
    font-family: 'Poppins', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: #047857;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
  }

  .error-message {
    font-family: 'Poppins', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    margin-top: 1rem;
  }

  .signup-button {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    border: none;
    font-weight: 600;
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(4, 120, 87, 0.3);
  }

  .signup-button:hover {
    background: linear-gradient(90deg, #28a745 0%, #047857 100%);
    box-shadow: 0 6px 16px rgba(4, 120, 87, 0.5);
    transform: translateY(-2px);
  }

  .login-link {
    color: #28a745;
    text-decoration: none;
  }

  .login-link:hover {
    text-decoration: underline;
  }

  .terms-note {
    font-family: 'Poppins', sans-serif;
    font-size: 0.8rem;
    color: #666;
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
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: 'customer',
          },
        },
      });

      if (signupError) {
        throw new Error(signupError.message || 'Failed to sign up');
      }

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
      <div className="signup-container">
        <Card className="signup-card">
          <Card.Body>
            {/* Logo above the title */}
            <div className="text-center mb-3">
              <img src={BiogexLogo} alt="Biogex Pharma Logo" className="signup-logo" />
            </div>

            {/* Title */}
            <h2 className="signup-title text-center">Sign up for Biogex</h2>

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
                type="submit"
                className="signup-button w-100"
                disabled={loading}
              >
                {loading ? 'Signing up...' : 'Sign up'}
              </Button>
            </Form>

            {/* Terms and Conditions Note */}
            <p className="terms-note text-center">
              By signing up, you agree to the Terms and Conditions of Biogex
            </p>

            <div className="text-center mt-3">
              <p>
                Already have an account?{' '}
                <NavLink to="/" className="login-link">
                  Sign in
                </NavLink>
              </p>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Signup;