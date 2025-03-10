import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { supabase } from "../supabaseClient";
import { useNavigate, NavLink } from "react-router-dom";
import BiogexLogo from "../assets/biogexlogo.jpeg";

const customStyles = `
  .login-container {
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
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
    font-size: 2rem;
    font-weight: 700;
    color: #047857;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
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

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
  
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "https://biogex-records.vercel.app/update-password",
      });
  
      if (error) {
        throw new Error(error.message);
      }
  
      setMessage("A password reset link has been sent to your email.");
    } catch (err) {
      setError(err.message || "An error occurred while sending reset email.");
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
            <div className="text-center mb-3">
              <img src={BiogexLogo} alt="Biogex Pharma Logo" className="login-logo" />
            </div>

            <h2 className="login-title text-center">Reset Password</h2>

            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleResetPassword}>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </Form.Group>

              <Button type="submit" className="login-button w-100" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </Form>

            <div className="text-center mt-3">
              <NavLink to="/" className="signup-link">
                Back to Login
              </NavLink>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default ForgotPassword;
