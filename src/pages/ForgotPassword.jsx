import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

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
        redirectTo: "https://biogex-records.vercel.app/update-password", // ✅ Updated to your Vercel domain
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
    <div className="login-container">
      <Card className="login-card">
        <Card.Body>
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
            <Button variant="link" onClick={() => navigate("/")}>
              Back to Login
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ForgotPassword;
