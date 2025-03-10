import React, { useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
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
`;

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState("");

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
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        throw new Error(error.message);
      }

      setMessage("Password updated successfully. Redirecting to login...");
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      setError(err.message || "Failed to update password.");
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
                  disabled={loading || !accessToken}
                />
              </Form.Group>

              <Button type="submit" className="login-button w-100" disabled={loading || !accessToken}>
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default UpdatePassword;
