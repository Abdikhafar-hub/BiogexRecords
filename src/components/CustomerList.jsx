import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Import Supabase client

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
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

    fetchCustomers();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  return (
    <div className="container my-5">
      <div className="card shadow" style={{ border: '2px solid #28a745', backgroundColor: '#fff' }}>
        <div className="card-header text-center" style={{ backgroundColor: '#28a745', color: '#fff' }}>
          <h2>Customer List</h2>
        </div>
        <div className="card-body">
          {customers.length === 0 ? (
            <p className="text-center">No customers found.</p>
          ) : (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Full Name</th>
                  <th>Business Name</th>
                  <th>Contact Person</th>
                  <th>Email</th>
                  <th>Phone Number</th>
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

export default CustomerList;