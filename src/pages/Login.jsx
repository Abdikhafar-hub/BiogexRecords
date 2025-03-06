import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { supabase } from '../supabaseClient';

// Import the logo (adjust the path as needed)
import BiogexLogo from '../assets/biogexlogo.jpeg';

// Custom CSS for styling
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

  .login-container {
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff; /* Match the white background in the screenshot */
    padding: 0;
    margin: 0;
    width: 100vw;
    overflow: hidden;
  }

  .login-card {
    width: 100%;
    max-width: 22rem;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .login-logo {
    width: 120px;
    height: auto;
    transition: transform 0.3s ease;
  }

  .login-logo:hover {
    transform: scale(1.1);
  }

  .login-title {
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

  .login-button {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    border: none;
    font-weight: 600;
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(4, 120, 87, 0.3);
  }

  .login-button:hover {
    background: linear-gradient(90deg, #28a745 0%, #047857 100%);
    box-shadow: 0 6px 16px rgba(4, 120, 87, 0.5);
    transform: translateY(-2px);
  }

  .signup-link {
    color: #28a745;
    text-decoration: none;
  }

  .signup-link:hover {
    text-decoration: underline;
  }
`;

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Attempt to log in with Supabase Auth
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        throw new Error(loginError.message || 'Invalid email or password');
      }

      // Ensure user data is available
      if (!data.user) {
        throw new Error('Login failed: No user data returned');
      }

      // Call the onLogin function to set isAuthenticated to true
      onLogin();

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{customStyles}</style>
      <div className="login-container">
        <Card className="login-card">
          <Card.Body>
            {/* Logo above the title */}
            <div className="text-center mb-3">
              <img src={BiogexLogo} alt="Biogex Pharma Logo" className="login-logo" />
            </div>

            {/* Title */}
            <h2 className="login-title text-center">Login to Biogex</h2>

            {error && (
              <Alert variant="danger" className="error-message">
                {error}
              </Alert>
            )}

            <Form onSubmit={handleLogin}>
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
                className="login-button w-100"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </Form>
            <div className="text-center mt-3">
              <p>
                Don’t have an account?{' '}
                <NavLink to="/signup" className="signup-link">
                  Sign up
                </NavLink>
              </p>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Login;