import React, { useState, useEffect } from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

// Custom CSS for styling the list
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

  .mysary-container {
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
    background: linear-gradient(135deg, #f8fafc 0%, #e6f0fa 100%);
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .mysary-card {
    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
    border: 2px solid transparent;
    border-image: linear-gradient(90deg, #047857 0%, #28a745 100%) 1;
    border-radius: 20px;
    box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.5);
    transition: all 0.3s ease;
    width: 100%;
    max-width: 90%;
    max-height: calc(100vh - 2rem);
    display: flex;
    flex-direction: column;
  }

  .mysary-card:hover {
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.15), -10px -10px 20px rgba(255, 255, 255, 0.7);
  }

  .mysary-header {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    padding: 1rem;
  }

  .mysary-header-title {
    font-size: 1.75rem;
    font-weight: 700;
    letter-spacing: 1px;
  }

  .mysary-body {
    padding: 1rem;
    flex: 1;
    overflow-y: auto;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }

  .mysary-section-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #047857;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    position: relative;
    padding-bottom: 0.25rem;
  }

  .mysary-section-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    border-radius: 2px;
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
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(4, 120, 87, 0.3);
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border: none;
  }

  .mysary-button:hover {
    background: linear-gradient(90deg, #28a745 0%, #047857 100%);
    box-shadow: 0 6px 16px rgba(4, 120, 87, 0.5);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    .mysary-card {
      max-width: 100%;
      max-height: calc(100vh - 1rem);
    }

    .mysary-body {
      padding: 0.75rem;
    }

    .mysary-section-title {
      font-size: 1.1rem;
    }

    .mysary-table th, .mysary-table td {
      font-size: 0.85rem;
    }
  }
`;

const MySaryList = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('employees')
          .select('*');
        if (error) throw error;

        setEmployees(data);
      } catch (err) {
        setError('Failed to fetch employees.');
        console.error('Error fetching employees:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleViewDetails = (employeeId) => {
    navigate(`/hr-management/remuneration/${employeeId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <style>{customStyles}</style>
      <div className="mysary-container">
        <Card className="mysary-card">
          <Card.Header className="mysary-header text-center">
            <h2 className="mysary-header-title">Employee Salary Overview</h2>
          </Card.Header>
          <Card.Body className="mysary-body">
            <h5 className="mysary-section-title">All Employees</h5>
            {employees.length === 0 ? (
              <p className="text-center text-muted">No employees found.</p>
            ) : (
              <Table striped bordered hover className="mysary-table">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Employee Code</th>
                    <th>Position</th>
                    <th>Department</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id}>
                      <td>{employee.full_name}</td>
                      <td>{employee.employee_code || 'N/A'}</td>
                      <td>{employee.position}</td>
                      <td>{employee.department}</td>
                      <td>
                        <Button
                          className="mysary-button"
                          onClick={() => handleViewDetails(employee.id)}
                        >
                          View Details
                        </Button>
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

export default MySaryList;