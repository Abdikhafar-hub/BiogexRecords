import React from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MySary = ({ employees }) => {
  // For simplicity, assume the logged-in user is the first employee
  const employee = employees.length > 0 ? employees[0] : null;

  if (!employee) {
    return (
      <div className="container my-5">
        <p className="text-center text-muted">No employee data available.</p>
      </div>
    );
  }

  const salary = parseFloat(employee.grossSalary || 0);
  const deductions = parseFloat(employee.deductions || 0);
  const netSalary = salary - deductions;

  return (
    <div className="container my-5">
      <Card className="shadow">
        <Card.Header className="text-center" style={{ backgroundColor: '#28a745', color: '#fff' }}>
          <h2>MySary - {employee.fullName}</h2>
        </Card.Header>
        <Card.Body>
          <h5 style={{ color: '#28a745' }}>Personal Information</h5>
          <p><strong>Full Name:</strong> {employee.fullName}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Phone Number:</strong> {employee.phoneNumber}</p>
          <p><strong>Position:</strong> {employee.position}</p>
          <p><strong>Department:</strong> {employee.department}</p>

          <h5 style={{ color: '#28a745' }} className="mt-4">Salary Details</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Gross Salary</th>
                <th>Deductions</th>
                <th>Net Salary</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{salary.toFixed(2)}</td>
                <td>{deductions.toFixed(2)}</td>
                <td>{netSalary.toFixed(2)}</td>
              </tr>
            </tbody>
          </Table>

          <div className="text-center mt-4">
            <Link to="/hr-management/remuneration" className="btn btn-success">
              View Full Payroll (HR Access)
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MySary;