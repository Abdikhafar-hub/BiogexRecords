import React, { useState, useEffect } from 'react';
import { Card, Table, Container } from 'react-bootstrap';
import { supabase } from '../supabaseClient';

// Custom CSS for styling
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

  .dashboard-container {
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
    background: linear-gradient(135deg, #f8fafc 0%, #e6f0fa 100%);
    padding: 2rem 1rem;
  }

  .dashboard-card {
    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
    border: 2px solid transparent;
    border-image: linear-gradient(90deg, #047857 0%, #28a745 100%) 1;
    border-radius: 20px;
    box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.5);
    transition: all 0.3s ease;
  }

  .dashboard-card:hover {
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.15), -10px -10px 20px rgba(255, 255, 255, 0.7);
  }

  .dashboard-header {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    padding: 1.5rem;
    text-align: center;
  }

  .dashboard-title {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 1px;
  }

  .dashboard-body {
    padding: 2rem 1.5rem;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }

  .dashboard-table {
    font-family: 'Poppins', sans-serif;
    margin-top: 1rem;
  }

  .dashboard-table th {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    font-weight: 600;
  }

  .dashboard-table td {
    vertical-align: middle;
  }

  .empty-message {
    font-family: 'Poppins', sans-serif;
    font-size: 1.2rem;
    color: #4b5563;
    text-align: center;
    margin-top: 2rem;
  }
`;

const HRManagementDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('employees')
          .select('*');

        if (fetchError) {
          throw new Error(fetchError.message || 'Failed to fetch employees');
        }

        setEmployees(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <>
      <style>{customStyles}</style>
      <div className="dashboard-container">
        <Container>
          <Card className="dashboard-card">
            <div className="dashboard-header">
              <h2 className="dashboard-title">HR Management Dashboard</h2>
            </div>
            <div className="dashboard-body">
              {employees.length === 0 ? (
                <p className="empty-message">No employees recorded.</p>
              ) : (
                <Table striped bordered hover className="dashboard-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>Position</th>
                      <th>Department</th>
                      <th>Date of Joining</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee, index) => (
                      <tr key={employee.id}>
                        <td>{index + 1}</td>
                        <td>{employee.full_name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.phone_number}</td>
                        <td>{employee.position}</td>
                        <td>{employee.department}</td>
                        <td>{employee.date_of_joining}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default HRManagementDashboard;