import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

// Custom CSS for styling
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

  .customer-details-container {
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
    background: linear-gradient(135deg, #f8fafc 0%, #e6f0fa 100%);
    padding: 2rem 1rem;
  }

  .customer-details-card {
    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
    border: 2px solid transparent;
    border-image: linear-gradient(90deg, #047857 0%, #28a745 100%) 1;
    border-radius: 20px;
    box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.5);
    transition: all 0.3s ease;
  }

  .customer-details-card:hover {
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.15), -10px -10px 20px rgba(255, 255, 255, 0.7);
  }

  .customer-details-header {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    padding: 1.5rem;
    text-align: center;
  }

  .customer-details-title {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 1px;
  }

  .customer-details-body {
    padding: 2rem 1.5rem;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    background-color: #f8f9fa;
  }

  .customer-details-section {
    margin-bottom: 2rem;
  }

  .customer-details-section-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #047857;
    margin-bottom: 1rem;
    position: relative;
    padding-bottom: 0.5rem;
  }

  .customer-details-section-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    border-radius: 2px;
  }

  .customer-details-subsection-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #4b5563;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }

  .customer-details-label {
    font-weight: 500;
    color: #1f2937;
    margin-bottom: 0.5rem;
    display: inline-block;
    width: 200px;
  }

  .customer-details-value {
    color: #333;
    padding-left: 1rem;
    word-break: break-word;
  }

  .back-btn,
  .delete-btn {
    padding: 0.5rem 1rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 500;
    transition: background-color 0.3s ease;
    margin-right: 1rem;
    margin-top: 1rem;
    display: inline-block;
  }

  .back-btn {
    background-color: #28a745;
    color: #fff;
  }

  .back-btn:hover {
    background-color: #047857;
  }

  .delete-btn {
    background-color: #dc3545;
    color: #fff;
    border: none;
    cursor: pointer;
  }

  .delete-btn:hover {
    background-color: #b02a37;
  }

  .loading-text,
  .error-text {
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
`;

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('customers')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          throw new Error('Failed to fetch customer details: ' + error.message);
        }

        setCustomer(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  const handleDelete = async () => {
    // Show confirmation prompt
    const confirmDelete = window.confirm('Are you sure you want to delete this customer?');
    if (!confirmDelete) return;

    try {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error('Failed to delete customer: ' + error.message);
      }

      // Navigate back to the customer list after deletion
      navigate('/hr-management/customer-list');
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  };

  if (loading) return <div className="loading-text">Loading...</div>;
  if (error) return <div className="error-text">{error}</div>;
  if (!customer) return <div className="error-text">Customer not found.</div>;

  return (
    <>
      <style>{customStyles}</style>
      <div className="customer-details-container">
        <div className="customer-details-card">
          <div className="customer-details-header">
            <h2 className="customer-details-title">Customer Details</h2>
          </div>
          <div className="customer-details-body">
            <div className="customer-details-section">
              <h3 className="customer-details-section-title">Customer Details</h3>
              <div className="customer-details-subsection-title">1. Contact Information</div>
              <div>
                <span className="customer-details-label">Full Name:</span>
                <span className="customer-details-value">{customer.full_name}</span>
              </div>
              <div>
                <span className="customer-details-label">Business Name:</span>
                <span className="customer-details-value">{customer.business_name}</span>
              </div>
              <div>
                <span className="customer-details-label">Business Type:</span>
                <span className="customer-details-value">{customer.business_type}</span>
              </div>
              <div>
                <span className="customer-details-label">Contact Person:</span>
                <span className="customer-details-value">{customer.contact_person}</span>
              </div>
              <div>
                <span className="customer-details-label">Position/Title:</span>
                <span className="customer-details-value">{customer.position_title}</span>
              </div>
              <div>
                <span className="customer-details-label">Phone Number:</span>
                <span className="customer-details-value">{customer.phone_number}</span>
              </div>
              <div>
                <span className="customer-details-label">Email Address:</span>
                <span className="customer-details-value">{customer.email_address}</span>
              </div>
              <div>
                <span className="customer-details-label">Alternative Phone Number:</span>
                <span className="customer-details-value">{customer.alt_phone_number || 'N/A'}</span>
              </div>

              <div className="customer-details-subsection-title">2. Address Details</div>
              <div>
                <span className="customer-details-label">Street Address:</span>
                <span className="customer-details-value">{customer.street_address}</span>
              </div>
              <div>
                <span className="customer-details-label">City:</span>
                <span className="customer-details-value">{customer.city}</span>
              </div>
              <div>
                <span className="customer-details-label">County:</span>
                <span className="customer-details-value">{customer.county || 'N/A'}</span>
              </div>
              <div>
                <span className="customer-details-label">Postal Code:</span>
                <span className="customer-details-value">{customer.postal_code || 'N/A'}</span>
              </div>
              <div>
                <span className="customer-details-label">Country:</span>
                <span className="customer-details-value">{customer.country}</span>
              </div>
              <div>
                <span className="customer-details-label">Nature of Premises:</span>
                <span className="customer-details-value">{customer.nature_of_premises}</span>
              </div>
              <div>
                <span className="customer-details-label">Area/Locality:</span>
                <span className="customer-details-value">{customer.area_locality || 'N/A'}</span>
              </div>
              <div>
                <span className="customer-details-label">Nearest Landmark:</span>
                <span className="customer-details-value">{customer.nearest_landmark || 'N/A'}</span>
              </div>
              <div>
                <span className="customer-details-label">GPS Coordinates:</span>
                <span className="customer-details-value">{customer.gps_coordinates || 'N/A'}</span>
              </div>

              <div className="customer-details-subsection-title">3. Financial Information</div>
              <div>
                <span className="customer-details-label">Bank Name:</span>
                <span className="customer-details-value">{customer.bank_name}</span>
              </div>
              <div>
                <span className="customer-details-label">Branch Name:</span>
                <span className="customer-details-value">{customer.branch_name || 'N/A'}</span>
              </div>
              <div>
                <span className="customer-details-label">Account Name:</span>
                <span className="customer-details-value">{customer.account_name}</span>
              </div>
              <div>
                <span className="customer-details-label">Account Number:</span>
                <span className="customer-details-value">{customer.account_number}</span>
              </div>
              <div>
                <span className="customer-details-label">SWIFT Code:</span>
                <span className="customer-details-value">{customer.swift_code || 'N/A'}</span>
              </div>
              <div>
                <span className="customer-details-label">VAT PIN:</span>
                <span className="customer-details-value">{customer.vat_pin || 'N/A'}</span>
              </div>
              <div>
                <span className="customer-details-label">KRA PIN:</span>
                <span className="customer-details-value">{customer.kra_pin}</span>
              </div>
              <div>
                <span className="customer-details-label">Credit Limit:</span>
                <span className="customer-details-value">{customer.credit_limit || 'N/A'}</span>
              </div>
              <div>
                <span className="customer-details-label">Payment Terms:</span>
                <span className="customer-details-value">{customer.payment_terms || 'N/A'}</span>
              </div>

              <div className="customer-details-subsection-title">4. Trade References</div>
              <div>
                <span className="customer-details-label">Trade Ref 1 Company:</span>
                <span className="customer-details-value">{customer.trade_ref1_company || 'N/A'}</span>
              </div>
              <div>
                <span className="customer-details-label">Trade Ref 1 Contact:</span>
                <span className="customer-details-value">{customer.trade_ref1_contact || 'N/A'}</span>
              </div>
              <div>
                <span className="customer-details-label">Trade Ref 1 Phone:</span>
                <span className="customer-details-value">{customer.trade_ref1_phone || 'N/A'}</span>
              </div>
              <div>
                <span className="customer-details-label">Trade Ref 1 Email:</span>
                <span className="customer-details-value">{customer.trade_ref1_email || 'N/A'}</span>
              </div>
              <div>
                <span className="customer-details-label">Trade Ref 2 Company:</span>
                <span className="customer-details-value">{customer.trade_ref2_company || 'N/A'}</span>
              </div>
              <div>
                <span className="customer-details-label">Trade Ref 2 Contact:</span>
                <span className="customer-details-value">{customer.trade_ref2_contact || 'N/A'}</span>
              </div>
              <div>
                <span className="customer-details-label">Trade Ref 2 Phone:</span>
                <span className="customer-details-value">{customer.trade_ref2_phone || 'N/A'}</span>
              </div>
              <div>
                <span className="customer-details-label">Trade Ref 2 Email:</span>
                <span className="customer-details-value">{customer.trade_ref2_email || 'N/A'}</span>
              </div>

              <div className="customer-details-subsection-title">5. Declaration</div>
              <div>
                <span className="customer-details-label">Declaration Name:</span>
                <span className="customer-details-value">{customer.declaration_name}</span>
              </div>
              <div>
                <span className="customer-details-label">Declaration Signature:</span>
                <span className="customer-details-value">{customer.declaration_signature || 'N/A'}</span>
              </div>
              <div>
                <span className="customer-details-label">Declaration Date:</span>
                <span className="customer-details-value">{customer.declaration_date}</span>
              </div>
            </div>
            <div>
              <Link to="/hr-management/customer-list" className="back-btn">
                Back to List
              </Link>
              <button
                className="delete-btn"
                onClick={handleDelete}
              >
                Delete Customer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDetails;