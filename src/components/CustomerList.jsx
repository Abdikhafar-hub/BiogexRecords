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
    padding: 1.5rem 0.5rem; /* Reduced padding */
    box-sizing: border-box;
  }

  .customer-list-card {
    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
    border: 2px solid transparent;
    border-image: linear-gradient(90deg, #047857 0%, #28a745 100%) 1;
    border-radius: 15px; /* Slightly smaller radius */
    box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.08), -6px -6px 12px rgba(255, 255, 255, 0.4); /* Reduced shadow */
    transition: all 0.3s ease;
    overflow-x: auto;
  }

  .customer-list-card:hover {
    box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.12), -8px -8px 16px rgba(255, 255, 255, 0.6);
  }

  .customer-list-header {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    padding: 1rem; /* Reduced padding */
    text-align: center;
  }

  .customer-list-title {
    font-size: 1.8rem; /* Slightly smaller title */
    font-weight: 700;
    letter-spacing: 0.5px; /* Reduced spacing */
  }

  .customer-list-body {
    padding: 1rem 0.75rem; /* Reduced padding */
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    background-color: #f8f9fa;
  }

  .customer-list-table {
    width: 100%;
    border-collapse: collapse;
    font-family: 'Poppins', sans-serif;
    min-width: 600px; /* Reduced minimum width for compactness */
  }

  .customer-list-table th {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    font-weight: 600;
    padding: 0.75rem; /* Reduced padding */
    text-align: left;
    border-bottom: 2px solid #28a745;
    font-size: 0.9rem; /* Smaller text */
  }

  .customer-list-table td {
    padding: 0.5rem; /* Reduced padding */
    vertical-align: middle;
    border-bottom: 1px solid #d1d5db;
    color: #1f2937;
    font-size: 0.85rem; /* Smaller text */
    white-space: nowrap; /* Prevents text wrapping */
    overflow: hidden;
    text-overflow: ellipsis; /* Truncates long text */
  }

  .customer-list-table tr {
    transition: background-color 0.3s ease;
  }

  .customer-list-table tr:hover {
    background-color: #f1f5f9;
  }

  .customer-list-table th:first-child,
  .customer-list-table td:first-child {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }

  .customer-list-table th:last-child,
  .customer-list-table td:last-child {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  .customer-list-table .details-btn {
    background-color: #28a745;
    color: #fff;
    padding: 0.3rem 0.6rem; /* Reduced padding */
    border-radius: 6px;
    text-decoration: none;
    font-weight: 500;
    transition: background-color 0.3s ease;
    display: inline-block;
    font-size: 0.8rem; /* Smaller text */
  }

  .customer-list-table .details-btn:hover {
    background-color: #047857;
  }

  .loading-container {
    min-height: 100vh; /* Match container height */
    display: flex;
    justify-content: center;
    align-items: center; /* Center spinner vertically and horizontally */
    background: linear-gradient(135deg, #f8fafc 0%, #e6f0fa 100%); /* Match background */
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #047857; /* Green color matching theme */
    border-top: 4px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .error-text,
  .empty-text {
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    text-align: center;
    padding: 1.5rem;
  }

  .error-text {
    color: #dc3545;
    background: #f8d7da;
    border-left: 4px solid #dc3545;
    margin: 1rem;
    border-radius: 6px;
  }

  .empty-text {
    color: #6c757d;
  }

  /* Mobile Responsiveness (below 768px, matching EmployeeList) */
  @media (max-width: 768px) {
    .customer-list-container {
      padding: 1rem 0.25rem; /* Further reduced padding */
    }

    .customer-list-card {
      border-radius: 10px;
      box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.06), -3px -3px 6px rgba(255, 255, 255, 0.3);
    }

    .customer-list-header {
      padding: 0.75rem;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    .customer-list-title {
      font-size: 1.4rem;
    }

    .customer-list-body {
      padding: 0.75rem 0.5rem;
    }

    .customer-list-table {
      min-width: 600px; /* Maintains horizontal scroll */
    }

    .customer-list-table th,
    .customer-list-table td {
      padding: 0.4rem; /* Further reduced padding */
      font-size: 0.8rem; /* Smaller text */
    }

    .customer-list-table .details-btn {
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
    }

    .spinner {
      width: 30px; /* Slightly smaller on mobile */
      height: 30px;
      border: 3px solid #047857;
      border-top: 3px solid transparent;
    }

    .error-text,
    .empty-text {
      font-size: 0.9rem;
      padding: 1rem;
    }
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

  if (loading) return (
    <>
      <style>{customStyles}</style>
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    </>
  );
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
                    <th>Details</th>
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