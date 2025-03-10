import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        throw new Error(error.message);
      }

      setMessage("Password updated successfully. You can now log in.");
      setTimeout(() => navigate("/"), 3000); // Redirect to login after success
    } catch (err) {
      setError(err.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <Card.Body>
          <h2 className="login-title text-center">Set New Password</h2>

          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleUpdatePassword}>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </Form.Group>

            <Button type="submit" className="login-button w-100" disabled={loading}>
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UpdatePassword;
