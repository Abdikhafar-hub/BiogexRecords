import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

  .leave-container {
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
    background: #f9fafb;
    padding: 2rem 1.5rem;
  }

  .leave-card {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }

  .leave-card:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }

  .leave-header {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #ffffff;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    padding: 1.5rem;
  }

  .leave-header-title {
    font-size: 1.875rem;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  .leave-body {
    padding: 1.5rem;
  }

  .leave-section-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #047857;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    position: relative;
    padding-bottom: 0.25rem;
  }

  .leave-section-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 2px;
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    border-radius: 1px;
  }

  .leave-table {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  .leave-table th {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #ffffff;
    font-weight: 500;
    vertical-align: middle;
  }

  .leave-table td {
    color: #374151;
    vertical-align: middle;
  }

  .leave-button {
    font-weight: 500;
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .leave-button.primary {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #ffffff;
    border: none;
  }

  .leave-button.primary:hover {
    background: linear-gradient(90deg, #28a745 0%, #047857 100%);
    box-shadow: 0 4px 6px rgba(4, 120, 87, 0.1);
    transform: translateY(-1px);
  }

  .leave-button.secondary {
    background: #ffffff;
    color: #047857;
    border: 1px solid #047857;
  }

  .leave-button.secondary:hover {
    background: #f3f4f6;
    box-shadow: 0 4px 6px rgba(4, 120, 87, 0.05);
    transform: translateY(-1px);
  }

  .leave-button.danger {
    background: #dc3545;
    color: #ffffff;
    border: none;
  }

  .leave-button.danger:hover {
    background: #c82333;
    box-shadow: 0 4px 6px rgba(220, 53, 69, 0.1);
    transform: translateY(-1px);
  }

  .leave-filter {
    font-weight: 500;
    color: #1f2937;
    margin-bottom: 1rem;
  }

  .leave-filter select {
    border: 1px solid #d1d5db;
    border-radius: 8px;
    padding: 0.5rem;
    transition: all 0.3s ease;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  .leave-filter select:focus {
    border-color: #047857;
    box-shadow: 0 0 0 3px rgba(4, 120, 87, 0.2);
    outline: none;
  }

  .leave-modal-header {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #ffffff;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .leave-modal-title {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .leave-modal-body {
    padding: 1.5rem;
  }

  .leave-modal-footer {
    border-top: none;
    padding: 1rem;
    justify-content: flex-end;
  }

  .form-error {
    color: #dc2626;
    font-size: 0.875rem;
    font-weight: 500;
    margin: 1rem 0;
    padding: 0.75rem;
    background: #fee2e2;
    border-left: 4px solid #dc2626;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  .no-records {
    text-align: center;
    color: #6b7280;
    padding: 1rem;
  }

  .countdown {
    font-weight: 500;
    color: #dc3545;
  }
`;

const LeaveAttendance = () => {
  const [employees, setEmployees] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newRequest, setNewRequest] = useState({
    employeeId: '',
    employeeName: '',
    startDate: '',
    endDate: '',
    type: 'Sick Leave',
    status: 'Pending',
  });
  const [filterStatus, setFilterStatus] = useState('All');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Current date (March 06, 2025)
  const currentDate = new Date('2025-03-06');

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

        // Fetch leave requests
        const { data: leaveData, error: leaveError } = await supabase
          .from('leave_requests')
          .select('*');
        if (leaveError) throw leaveError;
        setLeaveRequests(leaveData);
        console.log('Fetched leave requests:', leaveData); // Debug log
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
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
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRequest((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    const requiredFields = ['employeeId', 'startDate', 'endDate'];
    const emptyFields = requiredFields.filter((field) => !newRequest[field]);

    if (emptyFields.length > 0) {
      setError(`Please fill in all required fields: ${emptyFields.join(', ')}`);
      return;
    }

    try {
      console.log('Submitting request:', newRequest); // Debug log
      const selectedEmployee = employees.find((emp) => emp.id === newRequest.employeeId);
      if (!selectedEmployee) throw new Error('Employee not found');

      const leaveData = {
        employee_id: newRequest.employeeId,
        employee_name: selectedEmployee.full_name,
        start_date: newRequest.startDate,
        end_date: newRequest.endDate,
        type: newRequest.type,
        status: newRequest.status,
      };

      const { data, error: insertError } = await supabase
        .from('leave_requests')
        .insert([leaveData])
        .select()
        .single();
      if (insertError) {
        throw new Error(`Failed to submit leave request: ${insertError.message}`);
      }

      console.log('Request submitted successfully:', data); // Debug log
      setLeaveRequests((prev) => [...prev, data]); // Ensure state is updated
      setNewRequest({
        employeeId: '',
        employeeName: '',
        startDate: '',
        endDate: '',
        type: 'Sick Leave',
        status: 'Pending',
      });
      setError('');
      handleCloseModal();
    } catch (err) {
      setError(err.message);
      console.error('Error submitting leave request:', err);
    }
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleApprove = async (id) => {
    const { error } = await supabase
      .from('leave_requests')
      .update({ status: 'Approved' })
      .eq('id', id);
    if (error) {
      setError('Failed to approve leave request.');
      console.error('Error approving request:', error);
    } else {
      setLeaveRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status: 'Approved' } : req))
      );
    }
  };

  const handleReject = async (id) => {
    const { error } = await supabase
      .from('leave_requests')
      .update({ status: 'Rejected' })
      .eq('id', id);
    if (error) {
      setError('Failed to reject leave request.');
      console.error('Error rejecting request:', error);
    } else {
      setLeaveRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status: 'Rejected' } : req))
      );
    }
  };

  // Calculate days remaining for active leaves
  const calculateDaysRemaining = (endDate) => {
    const end = new Date(endDate);
    const diffTime = end - currentDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Filter active and historical leave requests
  const activeRequests = leaveRequests.filter((req) => {
    const endDate = new Date(req.end_date);
    return endDate >= currentDate && (req.status === 'Pending' || req.status === 'Approved');
  });

  const historicalRequests = leaveRequests.filter((req) => {
    const endDate = new Date(req.end_date);
    return endDate < currentDate || req.status === 'Rejected';
  });

  const filteredActiveRequests =
    filterStatus === 'All'
      ? activeRequests
      : activeRequests.filter((request) => request.status === filterStatus);

  const filteredHistoricalRequests =
    filterStatus === 'All'
      ? historicalRequests
      : historicalRequests.filter((request) => request.status === filterStatus);

  const handleExportReport = () => {
    alert(
      'Exporting leave report... (This is a placeholder action. Implement export logic here)'
    );
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  return (
    <>
      <style>{customStyles}</style>
      <div className="leave-container">
        <Card className="leave-card">
          <Card.Header className="leave-header text-center">
            <h2 className="leave-header-title">Leave Management</h2>
          </Card.Header>
          <Card.Body className="leave-body">
            <h5 className="leave-section-title">Active Leave Requests</h5>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="leave-filter">
                <Form.Label className="me-2">Filter by Status:</Form.Label>
                <Form.Select
                  value={filterStatus}
                  onChange={handleFilterChange}
                  style={{ display: 'inline-block', width: 'auto' }}
                >
                  <option value="All">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </Form.Select>
              </div>
              <Button variant="primary" className="leave-button primary" onClick={handleShowModal}>
                Add Leave Request
              </Button>
            </div>
            {filteredActiveRequests.length === 0 ? (
              <p className="no-records">No active leave requests found.</p>
            ) : (
              <Table striped bordered hover responsive className="leave-table">
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Type</th>
                    <th>Days Remaining</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredActiveRequests.map((request) => {
                    const daysRemaining = calculateDaysRemaining(request.end_date);
                    console.log('Rendering link for employee_id:', request.employee_id); // Debug log
                    return (
                      <tr key={request.id}>
                        <td>{request.employee_name}</td>
                        <td>{new Date(request.start_date).toLocaleDateString()}</td>
                        <td>{new Date(request.end_date).toLocaleDateString()}</td>
                        <td>{request.type}</td>
                        <td className="countdown">
                          {daysRemaining > 0 ? `${daysRemaining} days` : 'Completed'}
                        </td>
                        <td>{request.status}</td>
                        <td>
                          {request.status === 'Pending' && (
                            <>
                              <Button
                                className="leave-button primary me-2"
                                onClick={() => handleApprove(request.id)}
                              >
                                Approve
                              </Button>
                              <Button
                                className="leave-button danger"
                                onClick={() => handleReject(request.id)}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          <Link
                            to="/hr-management/employee-list" // Points to employee list
                            className="btn btn-sm leave-button secondary mt-2 d-block"
                            onClick={(e) =>
                              console.log('Link clicked, navigating to:', '/hr-management/employee-list')
                            } // Debug log
                          >
                            View Employee
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}

            <h5 className="leave-section-title">Leave History</h5>
            {filteredHistoricalRequests.length === 0 ? (
              <p className="no-records">No leave history found.</p>
            ) : (
              <Table striped bordered hover responsive className="leave-table">
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Type</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHistoricalRequests.map((request) => (
                    <tr key={request.id}>
                      <td>{request.employee_name}</td>
                      <td>{new Date(request.start_date).toLocaleDateString()}</td>
                      <td>{new Date(request.end_date).toLocaleDateString()}</td>
                      <td>{request.type}</td>
                      <td>{request.status}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            <div className="text-center mt-4">
              <Link to="/hr-management/leave-policy" className="btn leave-button secondary me-2">
                View Leave Policy
              </Link>
              <Button onClick={handleExportReport} className="leave-button primary">
                Export Leave Report
              </Button>
            </div>
          </Card.Body>
        </Card>

        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton className="leave-modal-header">
            <Modal.Title className="leave-modal-title">Add New Leave Request</Modal.Title>
          </Modal.Header>
          <Modal.Body className="leave-modal-body">
            {error && <div className="form-error">{error}</div>}
            <Form onSubmit={handleSubmitRequest}>
              <Form.Group className="mb-3">
                <Form.Label>Employee</Form.Label>
                <Form.Control
                  as="select"
                  name="employeeId"
                  value={newRequest.employeeId}
                  onChange={(e) => {
                    const selectedEmployee = employees.find((emp) => emp.id === e.target.value);
                    setNewRequest((prev) => ({
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
              <Form.Group className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={newRequest.startDate}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={newRequest.endDate}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Leave Type</Form.Label>
                <Form.Control
                  as="select"
                  name="type"
                  value={newRequest.type}
                  onChange={handleInputChange}
                >
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Annual Leave">Annual Leave</option>
                  <option value="Maternity Leave">Maternity Leave</option>
                  <option value="Paternity Leave">Paternity Leave</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit" className="leave-button primary">
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer className="leave-modal-footer">
            <Button variant="secondary" className="leave-button secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default LeaveAttendance;