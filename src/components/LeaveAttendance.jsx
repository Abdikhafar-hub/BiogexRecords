import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

  .leave-container {
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
    background: linear-gradient(135deg, #f8fafc 0%, #e6f0fa 100%);
    padding: 2rem 1rem;
  }

  .leave-card {
    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
    border: 2px solid transparent;
    border-image: linear-gradient(90deg, #047857 0%, #28a745 100%) 1;
    border-radius: 20px;
    box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.5);
    transition: all 0.3s ease;
  }

  .leave-card:hover {
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.15), -10px -10px 20px rgba(255, 255, 255, 0.7);
  }

  .leave-header {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    padding: 1.5rem;
  }

  .leave-header-title {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 1px;
  }

  .leave-body {
    padding: 2rem 1.5rem;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }

  .leave-section-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #047857;
    margin-top: 2rem;
    margin-bottom: 1rem;
    position: relative;
    padding-bottom: 0.5rem;
  }

  .leave-section-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    border-radius: 2px;
  }

  .leave-table {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .leave-table th {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    font-weight: 600;
  }

  .leave-table td {
    color: #4b5563;
    vertical-align: middle;
  }

  .leave-button {
    font-weight: 600;
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(4, 120, 87, 0.3);
  }

  .leave-button.primary {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border: none;
  }

  .leave-button.primary:hover {
    background: linear-gradient(90deg, #28a745 0%, #047857 100%);
    box-shadow: 0 6px 16px rgba(4, 120, 87, 0.5);
    transform: translateY(-2px);
  }

  .leave-button.secondary {
    background: transparent;
    color: #047857;
    border: 2px solid #047857;
  }

  .leave-button.secondary:hover {
    background: rgba(4, 120, 87, 0.1);
    box-shadow: 0 6px 16px rgba(4, 120, 87, 0.3);
    transform: translateY(-2px);
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
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .leave-filter select:focus {
    border-color: #047857;
    box-shadow: 0 0 0 3px rgba(4, 120, 87, 0.1);
    outline: none;
  }

  .leave-modal-header {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
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
  }

  .form-error {
    color: #dc3545;
    font-size: 0.9rem;
    font-weight: 500;
    margin: 1rem 0;
    padding: 0.75rem;
    background: #f8d7da;
    border-left: 4px solid #dc3545;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
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
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRequest((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitRequest = async () => {
    const requiredFields = ['employeeId', 'startDate', 'endDate'];
    const emptyFields = requiredFields.filter((field) => !newRequest[field]);

    if (emptyFields.length > 0) {
      setError(`Please fill in all required fields: ${emptyFields.join(', ')}`);
      return;
    }

    try {
      const selectedEmployee = employees.find(emp => emp.id === newRequest.employeeId);
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
      if (insertError) throw insertError;

      setLeaveRequests((prev) => [...prev, data]);
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
      setError('Failed to submit leave request.');
      console.error('Error submitting leave request:', err);
    }
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredRequests = filterStatus === 'All'
    ? leaveRequests
    : leaveRequests.filter((request) => request.status === filterStatus);

  // Mock data for attendance summary (could be fetched from Supabase in a real app)
  const attendanceSummary = {
    totalLeavesTaken: leaveRequests.length,
    remainingLeaveBalance: 15,
    sickLeavesTaken: leaveRequests.filter(req => req.type === 'Sick Leave').length,
    annualLeavesTaken: leaveRequests.filter(req => req.type === 'Annual Leave').length,
  };

  // Mock data for recent attendance history (could be fetched from Supabase in a real app)
  const attendanceHistory = [
    { date: '2025-03-01', status: 'Present', hoursWorked: '8', notes: 'On time' },
    { date: '2025-02-28', status: 'Absent', hoursWorked: '0', notes: 'Sick Leave' },
    { date: '2025-02-27', status: 'Present', hoursWorked: '7', notes: 'Left early' },
  ];

  const handleExportReport = () => {
    alert('Exporting leave report... (This is a placeholder action)');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <style>{customStyles}</style>
      <div className="leave-container">
        <Card className="leave-card">
          <Card.Header className="leave-header text-center">
            <h2 className="leave-header-title">Leave & Attendance</h2>
          </Card.Header>
          <Card.Body className="leave-body">
            <h5 className="leave-section-title">Attendance Summary</h5>
            <div className="mysary-info-row">
              <div className="mysary-info-item">
                <p className="mysary-info-label">Total Leaves Taken:</p>
                <p className="mysary-info-value">{attendanceSummary.totalLeavesTaken} days</p>
              </div>
              <div className="mysary-info-item">
                <p className="mysary-info-label">Remaining Leave Balance:</p>
                <p className="mysary-info-value">{attendanceSummary.remainingLeaveBalance} days</p>
              </div>
              <div className="mysary-info-item">
                <p className="mysary-info-label">Sick Leaves Taken:</p>
                <p className="mysary-info-value">{attendanceSummary.sickLeavesTaken} days</p>
              </div>
              <div className="mysary-info-item">
                <p className="mysary-info-label">Annual Leaves Taken:</p>
                <p className="mysary-info-value">{attendanceSummary.annualLeavesTaken} days</p>
              </div>
            </div>

            <h5 className="leave-section-title">Leave Requests</h5>
            <div className="d-flex justify-content-between align-items-center mb-4">
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
              <Button variant="success" className="leave-button primary" onClick={handleShowModal}>
                Add Leave Request
              </Button>
            </div>
            {filteredRequests.length === 0 ? (
              <p className="text-center text-muted">No leave requests found.</p>
            ) : (
              <Table striped bordered hover className="leave-table">
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((request) => (
                    <tr key={request.id}>
                      <td>{request.employee_name}</td>
                      <td>{request.start_date}</td>
                      <td>{request.end_date}</td>
                      <td>{request.type}</td>
                      <td>{request.status}</td>
                      <td>
                        <Link
                          to="/hr-management/employee-list"
                          className="btn btn-sm leave-button primary"
                        >
                          View Employee
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            <h5 className="leave-section-title">Recent Attendance History</h5>
            <Table striped bordered hover className="leave-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Hours Worked</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {attendanceHistory.map((record, index) => (
                  <tr key={index}>
                    <td>{record.date}</td>
                    <td>{record.status}</td>
                    <td>{record.hoursWorked}</td>
                    <td>{record.notes}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="text-center mt-4 d-flex justify-content-center gap-3">
              <Link to="/hr-management/leave-policy" className="btn leave-button secondary">
                View Leave Policy
              </Link>
              <Button onClick={handleExportReport} className="leave-button primary">
                Export Leave Report
              </Button>
            </div>
          </Card.Body>
        </Card>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton className="leave-modal-header">
            <Modal.Title className="leave-modal-title">Add Leave Request</Modal.Title>
          </Modal.Header>
          <Modal.Body className="leave-modal-body">
            {error && <div className="form-error">{error}</div>}
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Employee Name</Form.Label>
                <Form.Control
                  as="select"
                  name="employeeId"
                  value={newRequest.employeeId}
                  onChange={(e) => {
                    const selectedEmployee = employees.find(emp => emp.id === e.target.value);
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
            </Form>
          </Modal.Body>
          <Modal.Footer className="leave-modal-footer">
            <Button variant="secondary" className="leave-button secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="success" className="leave-button primary" onClick={handleSubmitRequest}>
              Submit Request
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default LeaveAttendance;