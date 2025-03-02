import React from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Finance = ({ employees }) => {
  const totalPayroll = employees.reduce(
    (sum, emp) => sum + (parseFloat(emp.grossSalary || 0) - parseFloat(emp.deductions || 0)),
    0
  );

  return (
    <div className="container my-5">
      <Card className="shadow">
        <Card.Header className="text-center" style={{ backgroundColor: '#28a745', color: '#fff' }}>
          <h2>HR Finance</h2>
        </Card.Header>
        <Card.Body>
          <h5 style={{ color: '#28a745' }}>Payroll Summary</h5>
          <p><strong>Total Payroll Budget:</strong> {totalPayroll.toFixed(2)}</p>
          <p><strong>Total Employees:</strong> {employees.length}</p>
          <p><strong>Average Salary per Employee:</strong> {(totalPayroll / (employees.length || 1)).toFixed(2)}</p>

          <h5 style={{ color: '#28a745' }} className="mt-4">Payroll Breakdown</h5>
          {employees.length === 0 ? (
            <p className="text-center text-muted">No employees found.</p>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Gross Salary</th>
                  <th>Deductions</th>
                  <th>Net Salary</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => {
                  const netSalary = (parseFloat(emp.grossSalary || 0) - parseFloat(emp.deductions || 0)).toFixed(2);
                  return (
                    <tr key={emp.employeeCode}>
                      <td>{emp.fullName}</td>
                      <td>{emp.grossSalary || '0'}</td>
                      <td>{emp.deductions || '0'}</td>
                      <td>{netSalary}</td>
                      <td>
                        <Link
                          to="/hr-management/remuneration"
                          className="btn btn-sm btn-primary"
                        >
                          Manage Payroll
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Finance;