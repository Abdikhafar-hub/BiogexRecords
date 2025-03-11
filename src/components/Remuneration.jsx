import React, { useState, useEffect } from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

// Custom CSS for compact styling
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

  .mysary-container {
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
    background: linear-gradient(135deg, #f8fafc 0%, #e6f0fa 100%);
    padding: 1rem 0.5rem; /* Reduced padding */
    display: flex;
    justify-content: center;
    align-items: flex-start;
    box-sizing: border-box;
  }

  .mysary-card {
    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
    border: 2px solid transparent;
    border-image: linear-gradient(90deg, #047857 0%, #28a745 100%) 1;
    border-radius: 15px; /* Slightly smaller radius */
    box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.08), -6px -6px 12px rgba(255, 255, 255, 0.4); /* Reduced shadow */
    transition: all 0.3s ease;
    width: 100%;
    max-width: 90%;
    max-height: calc(100vh - 2rem);
    display: flex;
    flex-direction: column;
    overflow-x: auto; /* Horizontal scrolling for table */
  }

  .mysary-card:hover {
    box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.12), -8px -8px 16px rgba(255, 255, 255, 0.6);
  }

  .mysary-header {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    padding: 0.75rem; /* Reduced padding */
    text-align: center;
  }

  .mysary-header-title {
    font-size: 1.6rem; /* Smaller title */
    font-weight: 700;
    letter-spacing: 0.5px; /* Reduced spacing */
  }

  .mysary-body {
    padding: 0.75rem; /* Reduced padding */
    flex: 1;
    overflow-y: auto;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }

  .mysary-section-title {
    font-size: 1.1rem; /* Smaller title */
    font-weight: 600;
    color: #047857;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    position: relative;
    padding-bottom: 0.2rem;
  }

  .mysary-section-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 30px; /* Reduced width */
    height: 2px; /* Reduced height */
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    border-radius: 2px;
  }

  .mysary-table {
    border-radius: 6px; /* Smaller radius */
    overflow: hidden;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04); /* Reduced shadow */
    min-width: 600px; /* Compact width with scrolling */
  }

  .mysary-table th {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    font-weight: 600;
    padding: 0.5rem; /* Reduced padding */
    text-align: left;
    border-bottom: 2px solid #28a745;
    font-size: 0.9rem; /* Smaller text */
    white-space: nowrap; /* Prevents wrapping */
  }

  .mysary-table td {
    padding: 0.4rem; /* Reduced padding */
    vertical-align: middle;
    border-bottom: 1px solid #d1d5db;
    color: #4b5563;
    font-size: 0.85rem; /* Smaller text */
    white-space: nowrap; /* Prevents wrapping */
    overflow: hidden;
    text-overflow: ellipsis; /* Truncates long text */
  }

  .mysary-table tr {
    transition: background-color 0.3s ease;
  }

  .mysary-table tr:hover {
    background-color: #f1f5f9;
  }

  .mysary-button {
    font-weight: 600;
    font-size: 0.85rem; /* Smaller text */
    padding: 0.3rem 0.8rem; /* Reduced padding */
    border-radius: 8px; /* Smaller radius */
    transition: all 0.3s ease;
    box-shadow: 0 3px 8px rgba(4, 120, 87, 0.2); /* Reduced shadow */
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border: none;
  }

  .mysary-button:hover {
    background: linear-gradient(90deg, #28a745 0%, #047857 100%);
    box-shadow: 0 4px 12px rgba(4, 120, 87, 0.3);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    .mysary-container {
      padding: 0.5rem 0.25rem; /* Further reduced padding */
    }

    .mysary-card {
      max-width: 100%;
      max-height: calc(100vh - 1rem);
    }

    .mysary-header {
      padding: 0.5rem;
    }

    .mysary-header-title {
      font-size: 1.4rem;
    }

    .mysary-body {
      padding: 0.5rem;
    }

    .mysary-section-title {
      font-size: 1rem;
      margin-top: 0.75rem;
      margin-bottom: 0.25rem;
    }

    .mysary-section-title::after {
      width: 25px;
      height: 1.5px;
    }

    .mysary-table th,
    .mysary-table td {
      padding: 0.3rem;
      font-size: 0.8rem;
    }

    .mysary-button {
      padding: 0.25rem 0.6rem;
      font-size: 0.75rem;
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

        setEmployees(data || []); // Ensure data is an array
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