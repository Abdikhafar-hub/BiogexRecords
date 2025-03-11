import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

// Custom CSS for styling with mobile responsiveness
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

  .employee-list-container {
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
    background: linear-gradient(135deg, #f8fafc 0%, #e6f0fa 100%);
    width: 100%; /* Full width, no padding */
  }

  .employee-list-card {
    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
    border: 2px solid transparent;
    border-image: linear-gradient(90deg, #047857 0%, #28a745 100%) 1;
    border-radius: 20px;
    box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.5);
    transition: all 0.3s ease;
    padding: 0 1rem; /* Move padding here to control internal spacing */
  }

  .employee-list-card:hover {
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.15), -10px -10px 20px rgba(255, 255, 255, 0.7);
  }

  .employee-list-header {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    padding: 1.5rem;
    text-align: center;
  }

  .employee-list-title {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 1px;
  }

  .employee-list-body {
    padding: 2rem 1.5rem;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius 16px;
    background-color: #f8f9fa;
  }

  .employee-list-table-wrapper {
    overflow-x: auto; /* Enable horizontal scrolling on mobile */
  }

  .employee-list-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    font-family: 'Poppins', sans-serif;
    min-width: 600px; /* Reduced from 800px for better mobile fit */
  }

  .employee-list-table th {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    font-weight: 600;
    padding: 1rem;
    text-align: left;
    border-bottom: 2px solid #28a745;
  }

  .employee-list-table td {
    padding: 1rem;
    vertical-align: middle;
    border-bottom: 1px solid #d1d5db;
    color: #1f2937;
  }

  .employee-list-table tr {
    transition: background-color 0.3s ease;
  }

  .employee-list-table tr:hover {
    background-color: #f1f5f9;
  }

  .employee-list-table th:first-child,
  .employee-list-table td:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  .employee-list-table th:last-child,
  .employee-list-table td:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius 8px;
  }

  .employee-list-table .action-btn {
    background-color: #28a745;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    border: none;
    font-weight: 500;
    transition: background-color 0.3s ease;
    cursor: pointer;
    white-space: nowrap; /* Prevent button text wrap */
  }

  .employee-list-table .action-btn:hover {
    background-color: #047857;
  }

  .loading-text,
  .error-text,
  .empty-text {
    font-family: 'Poppins', sans-serif;
    font-size: 1.2rem;
    text-align: center;
    padding: 2rem;
  }

  .loading-text {
    color: #4b5563;
  }

  .error-text {
    color: #dc3545;
    background: #f8d7da;
    border-left: 4px solid #dc3545;
    margin: 1rem;
    border-radius: 8px;
  }

  .empty-text {
    color: #6c757d;
  }

  @media (max-width: 768px) {
    .employee-list-container {
      padding: 3.5rem 0.5rem 1rem 0.5rem; /* Adjusted for hamburger menu */
    }

    .employee-list-title {
      font-size: 1.5rem;
    }

    .employee-list-header {
      padding: 1rem;
    }

    .employee-list-body {
      padding: 1rem;
    }

    .employee-list-table th,
    .employee-list-table td {
      padding: 0.5rem; /* Reduced padding for compactness */
      font-size: 0.85rem; /* Smaller font for mobile */
    }

    .employee-list-table .action-btn {
      padding: 0.3rem 0.6rem;
      font-size: 0.8rem;
    }

    .loading-text,
    .error-text,
    .empty-text {
      font-size: 1rem;
      padding: 1rem;
    }
  }

  @media (max-width: 576px) {
    .employee-list-title {
      font-size: 1.25rem;
    }

    .employee-list-table th,
    .employee-list-table td {
      padding: 0.4rem; /* Further reduced padding */
      font-size: 0.75rem; /* Even smaller font */
    }

    .employee-list-table .action-btn {
      padding: 0.2rem 0.4rem;
      font-size: 0.7rem;
    }

    .employee-list-table {
      min-width: 400px; /* Further reduced min-width */
    }
  }
`;

const EmployeeList = ({ onSelectEmployee }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error('Failed to fetch employees: ' + error.message);
      }

      setEmployees(data || []);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();

    const subscription = supabase
      .channel('employees-channel')
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'employees' },
        (payload) => {
          setEmployees((prevEmployees) =>
            prevEmployees.filter((employee) => employee.id !== payload.old.id)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <>
      <style>{customStyles}</style>
      <div className="employee-list-container">
        <div className="employee-list-card">
          <div className="employee-list-header">
            <h2 className="employee-list-title">Employee List</h2>
          </div>
          <div className="employee-list-body">
            {employees.length === 0 ? (
              <p className="empty-text">No employees found.</p>
            ) : (
              <div className="employee-list-table-wrapper">
                <table className="employee-list-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>Position</th>
                      <th>Department</th>
                      <th>Action</th>
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
                        <td>
                          <button
                            className="action-btn"
                            onClick={() => onSelectEmployee(employee)}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeList;