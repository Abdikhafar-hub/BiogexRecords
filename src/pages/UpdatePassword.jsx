import React, { useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  // 🔹 Extract the token from the URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.replace("#", "?"));
    const token = params.get("access_token");

    if (!token) {
      setError("Invalid or expired reset link. Please request a new one.");
    } else {
      setAccessToken(token);
    }
  }, []);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    if (!accessToken) {
      setError("Missing or invalid access token.");
      setLoading(false);
      return;
    }

    try {
      // 🔹 Authenticate user with the token before updating password
      const { error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: accessToken, // Supabase requires refresh_token as well, use access_token as a workaround
      });

      if (sessionError) {
        throw new Error(sessionError.message);
      }

      // 🔹 Now update the password
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        throw new Error(error.message);
      }

      setMessage("Password updated successfully. Redirecting to login...");
      setTimeout(() => navigate("/"), 3000); // Redirect to login
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
                disabled={loading || !accessToken} // Disable if no valid token
              />
            </Form.Group>

            <Button type="submit" className="login-button w-100" disabled={loading || !accessToken}>
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UpdatePassword;
