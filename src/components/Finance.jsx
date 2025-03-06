import React, { useState, useEffect } from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

// Custom CSS for styling (reusing from MySary)
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

  .mysary-container {
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
    background: linear-gradient(135deg, #f8fafc 0%, #e6f0fa 100%);
    padding: 2rem 1rem;
  }

  .mysary-card {
    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
    border: 2px solid transparent;
    border-image: linear-gradient(90deg, #047857 0%, #28a745 100%) 1;
    border-radius: 20px;
    box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.5);
    transition: all 0.3s ease;
  }

  .mysary-card:hover {
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.15), -10px -10px 20px rgba(255, 255, 255, 0.7);
  }

  .mysary-header {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    padding: 1.5rem;
  }

  .mysary-header-title {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 1px;
  }

  .mysary-body {
    padding: 2rem 1.5rem;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }

  .mysary-section-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #047857;
    margin-top: 2rem;
    margin-bottom: 1rem;
    position: relative;
    padding-bottom: 0.5rem;
  }

  .mysary-section-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    border-radius: 2px;
  }

  .mysary-info-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .mysary-info-item {
    flex: 1 1 200px;
  }

  .mysary-info-label {
    font-weight: 600;
    color: #1f2937;
  }

  .mysary-info-value {
    color: #4b5563;
  }

  .mysary-table {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .mysary-table th {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    font-weight: 600;
  }

  .mysary-table td {
    color: #4b5563;
    vertical-align: middle;
  }

  .mysary-button {
    font-weight: 600;
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(4, 120, 87, 0.3);
  }

  .mysary-button.primary {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border: none;
  }

  .mysary-button.primary:hover {
    background: linear-gradient(90deg, #28a745 0%, #047857 100%);
    box-shadow: 0 6px 16px rgba(4, 120, 87, 0.5);
    transform: translateY(-2px);
  }
`;

const Finance = () => {
  const [employees, setEmployees] = useState([]);
  const [finances, setFinances] = useState([]);
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

        // Fetch finance records
        const { data: financeData, error: financeError } = await supabase
          .from('finance')
          .select('*');
        if (financeError) throw financeError;
        setFinances(financeData);
      } catch (err) {
        setError('Failed to fetch data.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const totalExpenses = finances.reduce(
    (sum, fin) => sum + parseFloat(fin.amount || 0),
    0
  );

  return (
    <>
      <style>{customStyles}</style>
      <div className="mysary-container">
        <Card className="mysary-card">
          <Card.Header className="mysary-header text-center">
            <h2 className="mysary-header-title">HR Finance</h2>
          </Card.Header>
          <Card.Body className="mysary-body">
            <h5 className="mysary-section-title">Expense Summary</h5>
            <div className="mysary-info-row">
              <div className="mysary-info-item">
                <p className="mysary-info-label">Total Expenses:</p>
                <p className="mysary-info-value">{totalExpenses.toFixed(2)}</p>
              </div>
              <div className="mysary-info-item">
                <p className="mysary-info-label">Total Records:</p>
                <p className="mysary-info-value">{finances.length}</p>
              </div>
              <div className="mysary-info-item">
                <p className="mysary-info-label">Average Expense per Record:</p>
                <p className="mysary-info-value">{(totalExpenses / (finances.length || 1)).toFixed(2)}</p>
              </div>
            </div>

            <h5 className="mysary-section-title">Expense Breakdown</h5>
            {finances.length === 0 ? (
              <p className="text-center text-muted">No expense records found.</p>
            ) : (
              <Table striped bordered hover className="mysary-table">
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>Expense Date</th>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {finances.map((fin) => (
                    <tr key={fin.id}>
                      <td>{fin.employee_name}</td>
                      <td>{fin.expense_date}</td>
                      <td>{fin.amount}</td>
                      <td>{fin.description || 'N/A'}</td>
                      <td>
                        <Link
                          to="/hr-management/employee-list"
                          className="btn btn-sm mysary-button primary"
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
      </div>
    </>
  );
};

export default Finance;