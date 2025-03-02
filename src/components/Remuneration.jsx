import React, { useState } from 'react';
import { Card, Table, Button, Form } from 'react-bootstrap';

const Remuneration = ({ employees }) => {
  const [salaryData, setSalaryData] = useState(
    employees.map((emp) => ({
      id: emp.employeeCode,
      employeeName: emp.fullName,
      grossSalary: emp.grossSalary || '0',
      bonus: '0',
      deductions: emp.deductions || '0',
    }))
  );

  const handleSalaryChange = (id, field, value) => {
    setSalaryData((prev) =>
      prev.map((data) =>
        data.id === id ? { ...data, [field]: value } : data
      )
    );
  };

  const handleSave = () => {
    console.log('Updated Salary Data:', salaryData);
  };

  return (
    <div className="container my-5">
      <Card className="shadow">
        <Card.Header className="text-center" style={{ backgroundColor: '#28a745', color: '#fff' }}>
          <h2>Remuneration Management</h2>
        </Card.Header>
        <Card.Body>
          {employees.length === 0 ? (
            <p className="text-center text-muted">No employees found.</p>
          ) : (
            <>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>Gross Salary</th>
                    <th>Bonus</th>
                    <th>Deductions</th>
                    <th>Net Salary</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {salaryData.map((data) => {
                    const netSalary =
                      parseFloat(data.grossSalary) +
                      parseFloat(data.bonus) -
                      parseFloat(data.deductions);
                    return (
                      <tr key={data.id}>
                        <td>{data.employeeName}</td>
                        <td>
                          <Form.Control
                            type="number"
                            value={data.grossSalary}
                            onChange={(e) =>
                              handleSalaryChange(data.id, 'grossSalary', e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="number"
                            value={data.bonus}
                            onChange={(e) =>
                              handleSalaryChange(data.id, 'bonus', e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="number"
                            value={data.deductions}
                            onChange={(e) =>
                              handleSalaryChange(data.id, 'deductions', e.target.value)
                            }
                          />
                        </td>
                        <td>{netSalary.toFixed(2)}</td>
                        <td>
                          <Button variant="success" onClick={handleSave}>
                            Save
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Remuneration;