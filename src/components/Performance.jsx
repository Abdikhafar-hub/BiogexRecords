import React, { useState } from 'react';
import { Card, Table, Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Custom CSS for compact styling
const customStyles = `
  .performance-container {
    padding: 1rem 0.5rem;
    box-sizing: border-box;
  }

  .performance-card {
    border-radius: 12px;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.06), -4px -4px 8px rgba(255, 255, 255, 0.3);
    overflow-x: auto;
  }

  .performance-card .card-header {
    background-color: #28a745;
    color: #fff;
    padding: 0.75rem;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    text-align: center;
  }

  .performance-card .card-header h2 {
    font-size: 1.6rem;
    font-weight: 700;
    letter-spacing: 0.5px;
  }

  .performance-card .card-body {
    padding: 0.75rem;
  }

  .performance-table {
    width: 100%;
    min-width: 600px;
    border-collapse: collapse;
    font-size: 0.85rem;
  }

  .performance-table th {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    font-weight: 600;
    padding: 0.5rem;
    text-align: left;
    border-bottom: 2px solid #28a745;
    white-space: nowrap;
  }

  .performance-table td {
    padding: 0.4rem;
    vertical-align: middle;
    border-bottom: 1px solid #d1d5db;
    color: #1f2937;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .performance-table tr {
    transition: background-color 0.3s ease;
  }

  .performance-table tr:hover {
    background-color: #f1f5f9;
  }

  .performance-table .btn {
    padding: 0.2rem 0.5rem;
    font-size: 0.75rem;
  }

  .performance-table .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
  }

  .performance-table .btn-primary:hover {
    background-color: #0056b3;
    border-color: #0056b3;
  }

  .performance-card .btn-success {
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
  }

  .performance-no-reviews {
    font-size: 0.9rem;
    padding: 1rem;
    text-align: center;
    color: #6c757d;
  }

  /* Modal Adjustments */
  .modal-content {
    border-radius: 10px;
  }

  .modal-header {
    padding: 0.5rem;
    border-bottom: 1px solid #dee2e6;
  }

  .modal-title {
    font-size: 1.3rem;
  }

  .modal-body {
    padding: 0.75rem;
  }

  .modal-body .form-group {
    margin-bottom: 0.5rem;
  }

  .modal-body .form-label {
    font-size: 0.9rem;
  }

  .modal-body .form-control {
    font-size: 0.85rem;
    padding: 0.25rem 0.5rem;
  }

  .modal-body textarea.form-control {
    height: 60px;
  }

  .modal-footer {
    padding: 0.5rem;
    border-top: 1px solid #dee2e6;
  }

  .modal-footer .btn {
    padding: 0.2rem 0.5rem;
    font-size: 0.8rem;
  }

  /* Mobile Responsiveness (below 768px) */
  @media (max-width: 768px) {
    .performance-container {
      padding: 0.5rem 0.25rem;
    }

    .performance-card .card-header {
      padding: 0.5rem;
    }

    .performance-card .card-header h2 {
      font-size: 1.4rem;
    }

    .performance-card .card-body {
      padding: 0.5rem;
    }

    .performance-table th,
    .performance-table td {
      padding: 0.3rem;
      font-size: 0.75rem;
    }

    .performance-table .btn {
      padding: 0.15rem 0.4rem;
      font-size: 0.7rem;
    }

    .performance-card .btn-success {
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
    }

    .performance-no-reviews {
      font-size: 0.8rem;
      padding: 0.75rem;
    }

    .modal-title {
      font-size: 1.2rem;
    }

    .modal-body .form-control {
      font-size: 0.8rem;
      padding: 0.2rem 0.4rem;
    }

    .modal-body textarea.form-control {
      height: 50px;
    }

    .modal-footer .btn {
      padding: 0.15rem 0.4rem;
      font-size: 0.75rem;
    }
  }
`;

const Performance = ({ employees = [] }) => { // Default to empty array if undefined
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newReview, setNewReview] = useState({
    employeeName: '',
    date: '',
    rating: '',
    feedback: '',
  });

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitReview = () => {
    setReviews((prev) => [...prev, newReview]);
    setNewReview({
      employeeName: '',
      date: '',
      rating: '',
      feedback: '',
    });
    handleCloseModal();
  };

  return (
    <>
      <style>{customStyles}</style>
      <div className="performance-container">
        <Card className="performance-card">
          <Card.Header>
            <h2>Performance Management</h2>
          </Card.Header>
          <Card.Body>
            <Button variant="success" className="mb-2" onClick={handleShowModal}>
              Add Performance Review
            </Button>
            {reviews.length === 0 ? (
              <p className="performance-no-reviews">No performance reviews found.</p>
            ) : (
              <Table className="performance-table" striped bordered hover>
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>Date</th>
                    <th>Rating (1-5)</th>
                    <th>Feedback</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review, index) => (
                    <tr key={index}>
                      <td>{review.employeeName}</td>
                      <td>{review.date}</td>
                      <td>{review.rating}</td>
                      <td>{review.feedback}</td>
                      <td>
                        <Link
                          to="/hr-management/employee-list"
                          className="btn btn-sm btn-primary"
                        >
                          View Employee
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>

        {/* Modal for Adding Performance Review */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Performance Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Employee Name</Form.Label>
                <Form.Control
                  as="select"
                  name="employeeName"
                  value={newReview.employeeName}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp.employeeCode} value={emp.fullName}>
                      {emp.fullName}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={newReview.date}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Rating (1-5)</Form.Label>
                <Form.Control
                  type="number"
                  name="rating"
                  min="1"
                  max="5"
                  value={newReview.rating}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Feedback</Form.Label>
                <Form.Control
                  as="textarea"
                  name="feedback"
                  value={newReview.feedback}
                  onChange={handleInputChange}
                  placeholder="Enter feedback"
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="success" onClick={handleSubmitReview}>
              Submit Review
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Performance;