import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Import Supabase client

const EmployeeList = ({ onSelectEmployee }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
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

    fetchEmployees();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  return (
    <div className="container my-5">
      <div className="card shadow" style={{ border: '2px solid #28a745', backgroundColor: '#fff' }}>
        <div className="card-header text-center" style={{ backgroundColor: '#28a745', color: '#fff' }}>
          <h2>Employee List</h2>
        </div>
        <div className="card-body">
          {employees.length === 0 ? (
            <p className="text-center">No employees found.</p>
          ) : (
            <table className="table table-bordered">
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
                        className="btn btn-success btn-sm"
                        onClick={() => onSelectEmployee(employee)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;