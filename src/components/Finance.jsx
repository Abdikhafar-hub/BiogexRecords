import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

// Custom CSS with Mobile Responsiveness
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

  .expense-container {
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
    background: linear-gradient(135deg, #f8fafc 0%, #e6f0fa 100%);
    padding: 2rem 1rem;
  }

  .expense-card {
    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
    border: 2px solid transparent;
    border-image: linear-gradient(90deg, #047857 0%, #28a745 100%) 1;
    border-radius: 20px;
    box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.5);
    transition: all 0.3s ease;
  }

  .expense-card:hover {
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.15), -10px -10px 20px rgba(255, 255, 255, 0.7);
  }

  .expense-header {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    padding: 1.5rem;
  }

  .expense-header-title {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 1px;
  }

  .expense-body {
    padding: 2rem 1.5rem;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }

  .expense-section-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #047857;
    margin-top: 2rem;
    margin-bottom: 1rem;
    position: relative;
    padding-bottom: 0.5rem;
  }

  .expense-section-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    border-radius: 2px;
  }

  .expense-info-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .expense-info-item {
    flex: 1 1 200px;
  }

  .expense-info-label {
    font-weight: 600;
    color: #1f2937;
  }

  .expense-info-value {
    color: #4b5563;
  }

  .expense-table {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    font-size: 0.9rem;
  }

  .expense-table th {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    font-weight: 600;
    padding: 0.75rem;
  }

  .expense-table td {
    color: #4b5563;
    vertical-align: middle;
    padding: 0.75rem;
  }

  .expense-button {
    font-weight: 600;
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(4, 120, 87, 0.3);
    margin: 0.2rem;
  }

  .expense-button.primary {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border: none;
  }

  .expense-button.primary:hover {
    background: linear-gradient(90deg, #28a745 0%, #047857 100%);
    box-shadow: 0 6px 16px rgba(4, 120, 87, 0.5);
    transform: translateY(-2px);
  }

  .expense-button.reject {
    background: linear-gradient(90deg, #dc3545 0%, #b02a37 100%);
    color: #fff;
    border: none;
  }

  .expense-button.reject:hover {
    background: linear-gradient(90deg, #b02a37 0%, #dc3545 100%);
    box-shadow: 0 6px 16px rgba(220, 53, 69, 0.5);
    transform: translateY(-2px);
  }

  .modal-title {
    font-size: 1.25rem;
  }

  .modal-body {
    padding: 1rem;
  }

  .modal-footer {
    padding: 0.75rem;
  }

  .modal-footer .btn {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
  }

  /* Mobile Responsiveness */
  @media (max-width: 768px) {
    .expense-container {
      padding: 0.5rem;
    }

    .expense-card {
      border-radius: 10px;
      box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1), -4px -4px 8px rgba(255, 255, 255, 0.5);
    }

    .expense-header {
      padding: 0.75rem;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    .expense-header-title {
      font-size: 1.25rem;
      letter-spacing: 0.5px;
    }

    .expense-body {
      padding: 0.75rem;
      max-height: calc(100vh - 150px); /* Adjust for header and footer */
      overflow-y: auto;
      -webkit-overflow-scrolling: touch; /* Smooth scrolling on mobile */
    }

    .expense-section-title {
      font-size: 1rem;
      margin-top: 1rem;
      margin-bottom: 0.5rem;
    }

    .expense-section-title::after {
      width: 30px;
      height: 2px;
    }

    .expense-info-row {
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .expense-info-item {
      flex: 1 1 100%; /* Stack items on mobile */
    }

    .expense-info-label {
      font-size: 0.8rem;
    }

    .expense-info-value {
      font-size: 0.8rem;
    }

    .expense-table {
      font-size: 0.75rem;
    }

    .expense-table th,
    .expense-table td {
      padding: 0.5rem;
    }

    .expense-button {
      font-size: 0.8rem;
      padding: 0.4rem 0.75rem;
    }

    .modal-title {
      font-size: 1rem;
    }

    .modal-body {
      padding: 0.75rem;
    }

    .modal-body .form-group {
      margin-bottom: 0.5rem;
    }

    .modal-body .form-label {
      font-size: 0.8rem;
    }

    .modal-body .form-control,
    .modal-body .form-select {
      font-size: 0.8rem;
      padding: 0.35rem;
    }

    .modal-footer {
      padding: 0.5rem;
    }

    .modal-footer .btn {
      font-size: 0.8rem;
      padding: 0.4rem 0.75rem;
    }
  }
`;

const ExpenseReimbursements = () => {
  const [employees, setEmployees] = useState([]);
  const [reimbursements, setReimbursements] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newReimbursement, setNewReimbursement] = useState({
    employeeId: '',
    employeeName: '',
    expenseDate: '',
    amount: '',
    description: '',
    status: 'Pending',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch employees
        const { data: employeesData, error: employeesError } = await supabase
          .from('employees')
          .select('*');
        if (employeesError) throw employeesError;
        setEmployees(employeesData);

        // Fetch reimbursement records
        const { data: reimbursementData, error: reimbursementError } = await supabase
          .from('expense_reimbursements')
          .select('*');
        if (reimbursementError) throw reimbursementError;
        setReimbursements(reimbursementData);
      } catch (err) {
        setError('Failed to fetch data.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setError('');
    setNewReimbursement({
      employeeId: '',
      employeeName: '',
      expenseDate: '',
      amount: '',
      description: '',
      status: 'Pending',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReimbursement((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitReimbursement = async () => {
    const requiredFields = ['employeeId', 'expenseDate', 'amount', 'description'];
    const emptyFields = requiredFields.filter((field) => !newReimbursement[field]);

    if (emptyFields.length > 0) {
      setError(`Please fill in all required fields: ${emptyFields.join(', ')}`);
      return;
    }

    try {
      const selectedEmployee = employees.find(emp => emp.id === newReimbursement.employeeId);
      if (!selectedEmployee) throw new Error('Employee not found');

      const reimbursementData = {
        employee_id: newReimbursement.employeeId,
        employee_name: selectedEmployee.full_name,
        expense_date: newReimbursement.expenseDate,
        amount: parseFloat(newReimbursement.amount),
        description: newReimbursement.description,
        status: newReimbursement.status,
      };

      const { data, error: insertError } = await supabase
        .from('expense_reimbursements')
        .insert([reimbursementData])
        .select()
        .single();
      if (insertError) throw insertError;

      setReimbursements((prev) => [...prev, data]);
      handleCloseModal();
    } catch (err) {
      setError('Failed to submit reimbursement request.');
      console.error('Error submitting reimbursement:', err);
    }
  };
    
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const { data, error: updateError } = await supabase
        .from('expense_reimbursements')
        .update({ status: newStatus })
        .eq('id', id)
        .select()
        .single();
      if (updateError) throw updateError;
  
      setReimbursements((prev) =>
        prev.map((reimbursement) =>
          reimbursement.id === id ? data : reimbursement
        )
      );
    } catch (err) {
      setError('Failed to update reimbursement status.');
      console.error('Error updating status:', JSON.stringify(err, null, 2)); // Log the full error object
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const totalPending = reimbursements
    .filter((r) => r.status === 'Pending')
    .reduce((sum, r) => sum + parseFloat(r.amount || 0), 0);
  const totalApproved = reimbursements
    .filter((r) => r.status === 'Approved')
    .reduce((sum, r) => sum + parseFloat(r.amount || 0), 0);
  const totalRejected = reimbursements
    .filter((r) => r.status === 'Rejected')
    .reduce((sum, r) => sum + parseFloat(r.amount || 0), 0);

  return (
    <>
      <style>{customStyles}</style>
      <div className="expense-container">
        <Card className="expense-card">
          <Card.Header className="expense-header text-center">
            <h2 className="expense-header-title">Expense Reimbursement Management</h2>
          </Card.Header>
          <Card.Body className="expense-body">
            <h5 className="expense-section-title">Reimbursement Summary</h5>
            <div className="expense-info-row">
              <div className="expense-info-item">
                <p className="expense-info-label">Total Pending:</p>
                <p className="expense-info-value">{totalPending.toFixed(2)}</p>
              </div>
              <div className="expense-info-item">
                <p className="expense-info-label">Total Approved:</p>
                <p className="expense-info-value">{totalApproved.toFixed(2)}</p>
              </div>
              <div className="expense-info-item">
                <p className="expense-info-label">Total Rejected:</p>
                <p className="expense-info-value">{totalRejected.toFixed(2)}</p>
              </div>
            </div>

            <h5 className="expense-section-title">Expense Claims</h5>
            <Button className="expense-button primary mb-3" onClick={handleShowModal}>
              Add Expense Claim
            </Button>
            {reimbursements.length === 0 ? (
              <p className="text-center text-muted">No expense claims found.</p>
            ) : (
              <Table striped bordered hover className="expense-table">
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>Expense Date</th>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reimbursements.map((reimbursement) => (
                    <tr key={reimbursement.id}>
                      <td>{reimbursement.employee_name}</td>
                      <td>{reimbursement.expense_date}</td>
                      <td>{parseFloat(reimbursement.amount).toFixed(2)}</td>
                      <td>{reimbursement.description}</td>
                      <td>{reimbursement.status}</td>
                      <td>
                        {reimbursement.status === 'Pending' ? (
                          <>
                            <Button
                              className="expense-button primary"
                              onClick={() => handleUpdateStatus(reimbursement.id, 'Approved')}
                            >
                              Approve
                            </Button>
                            <Button
                              className="expense-button reject"
                              onClick={() => handleUpdateStatus(reimbursement.id, 'Rejected')}
                            >
                              Reject
                            </Button>
                          </>
                        ) : (
                          <Link
                            to="/hr-management/employee-list"
                            className="expense-button primary btn"
                          >
                            View Employee
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title className="modal-title">Add Expense Claim</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Form>
              <Form.Group className="mb-3 form-group">
                <Form.Label className="form-label">Employee Name</Form.Label>
                <Form.Control
                  as="select"
                  name="employeeId"
                  value={newReimbursement.employeeId}
                  onChange={(e) => {
                    const selectedEmployee = employees.find(emp => emp.id === e.target.value);
                    setNewReimbursement((prev) => ({
                      ...prev,
                      employeeId: e.target.value,
                      employeeName: selectedEmployee ? selectedEmployee.full_name : '',
                    }));
                  }}
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.full_name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3 form-group">
                <Form.Label className="form-label">Expense Date</Form.Label>
                <Form.Control
                  type="date"
                  name="expenseDate"
                  value={newReimbursement.expenseDate}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3 form-group">
                <Form.Label className="form-label">Amount</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  value={newReimbursement.amount}
                  onChange={handleInputChange}
                  placeholder="Enter expense amount"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3 form-group">
                <Form.Label className="form-label">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={newReimbursement.description}
                  onChange={handleInputChange}
                  placeholder="Describe the expense (e.g., Travel to conference)"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3 form-group">
                <Form.Label className="form-label">Status</Form.Label>
                <Form.Control
                  as="select"
                  name="status"
                  value={newReimbursement.status}
                  onChange={handleInputChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="modal-footer">
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="success" onClick={handleSubmitReimbursement}>
              Submit Claim
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ExpenseReimbursements;