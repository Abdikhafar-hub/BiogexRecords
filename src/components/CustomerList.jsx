import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

// Custom CSS for styling
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

  .customer-list-container {
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
    background: linear-gradient(135deg, #f8fafc 0%, #e6f0fa 100%);
    padding: 2rem 1rem;
  }

  .customer-list-card {
    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
    border: 2px solid transparent;
    border-image: linear-gradient(90deg, #047857 0%, #28a745 100%) 1;
    border-radius: 20px;
    box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.5);
    transition: all 0.3s ease;
  }

  .customer-list-card:hover {
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.15), -10px -10px 20px rgba(255, 255, 255, 0.7);
  }

  .customer-list-header {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    padding: 1.5rem;
    text-align: center;
  }

  .customer-list-title {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 1px;
  }

  .customer-list-body {
    padding: 2rem 1.5rem;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius 16px;
    background-color: #f8f9fa;
  }

  .customer-list-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    font-family: 'Poppins', sans-serif;
  }

  .customer-list-table th {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    font-weight: 600;
    padding: 1rem;
    text-align: left;
    border-bottom: 2px solid #28a745;
  }

  .customer-list-table td {
    padding: 1rem;
    vertical-align: middle;
    border-bottom: 1px solid #d1d5db;
    color: #1f2937;
  }

  .customer-list-table tr {
    transition: background-color 0.3s ease;
  }

  .customer-list-table tr:hover {
    background-color: #f1f5f9;
  }

  .customer-list-table th:first-child,
  .customer-list-table td:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  .customer-list-table th:last-child,
  .customer-list-table td:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .customer-list-table .details-btn {
    background-color: #28a745;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 500;
    transition: background-color 0.3s ease;
  }

  .customer-list-table .details-btn:hover {
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
`;

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error('Failed to fetch customers: ' + error.message);
      }

      setCustomers(data || []);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchCustomers();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('customers-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'customers' },
        (payload) => {
          setCustomers((prevCustomers) => [payload.new, ...prevCustomers]);
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  if (loading) return <div className="loading-text">Loading...</div>;
  if (error) return <div className="error-text">{error}</div>;

  return (
    <>
      <style>{customStyles}</style>
      <div className="customer-list-container">
        <div className="customer-list-card">
          <div className="customer-list-header">
            <h2 className="customer-list-title">Customer List</h2>
          </div>
          <div className="customer-list-body">
            {customers.length === 0 ? (
              <p className="empty-text">No customers found.</p>
            ) : (
              <table className="customer-list-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Full Name</th>
                    <th>Business Name</th>
                    <th>Contact Person</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Details</th> {/* New column for Details */}
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer, index) => (
                    <tr key={customer.id}>
                      <td>{index + 1}</td>
                      <td>{customer.full_name}</td>
                      <td>{customer.business_name}</td>
                      <td>{customer.contact_person}</td>
                      <td>{customer.email_address}</td>
                      <td>{customer.phone_number}</td>
                      <td>
                        <Link
                          to={`/hr-management/customer-details/${customer.id}`}
                          className="details-btn"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerList;