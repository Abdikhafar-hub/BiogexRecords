import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

// Custom CSS as a styled component
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

  .employee-details-container {
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
    background: linear-gradient(135deg, #f8fafc 0%, #e6f0fa 100%);
    padding: 2rem 1rem;
  }

  .employee-details-card {
    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
    border: 2px solid transparent;
    border-image: linear-gradient(90deg, #047857 0%, #28a745 100%) 1;
    border-radius: 20px;
    box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.5);
    transition: all 0.3s ease;
  }

  .employee-details-card:hover {
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.15), -10px -10px 20px rgba(255, 255, 255, 0.7);
  }

  .employee-details-header {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    padding: 1.5rem;
    text-align: center;
  }

  .employee-details-title {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 1px;
  }

  .employee-details-body {
    padding: 2rem 1.5rem;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    background-color: #f8f9fa;
  }

  .employee-details-section {
    margin-bottom: 2rem;
  }

  .employee-details-section-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #047857;
    margin-bottom: 1rem;
    position: relative;
    padding-bottom: 0.5rem;
  }

  .employee-details-section-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    border-radius: 2px;
  }

  .employee-details-label {
    font-weight: 500;
    color: #1f2937;
    margin-bottom: 0.5rem;
    display: inline-block;
    width: 200px;
  }

  .employee-details-value {
    color: #333;
    padding-left: 1rem;
    word-break: break-word;
  }

  .employee-details-image {
    max-width: 150px;
    max-height: 150px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 1rem;
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

  .footer-btn-container {
    text-align: center;
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    padding: 1rem;
  }

  .employee-details-error {
    color: #dc3545;
    text-align: center;
    padding: 1rem;
  }
`;

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchEmployee = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('employees')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        if (isMounted) {
          console.log('Fetched employee:', data);
          console.log('Profile pic URL:', data.profile_pic_url);
          setEmployee(data);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to fetch employee details: ' + err.message);
          console.error(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchEmployee();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (!confirmDelete) return;

    try {
      const { error } = await supabase
        .from('employees')
        .delete()
        .eq('id', id);

      if (error) throw error;

      navigate('/hr-management/employee-list');
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="employee-details-error">{error}</div>;
  if (!employee) return <div className="employee-details-error">Employee not found.</div>;

  return (
    <>
      <style>{customStyles}</style>
      <div className="employee-details-container">
        <div className="employee-details-card">
          <div className="employee-details-header">
            <h2 className="employee-details-title">Employee Details</h2>
          </div>
          <div className="employee-details-body">
            <div className="employee-details-section">
              <div className="row">
                <div className="col-md-4 text-center">
                  {!imageError && employee.profile_pic_url ? (
                    <img
                      src={employee.profile_pic_url}
                      alt="Profile"
                      className="employee-details-image"
                      onError={(e) => {
                        console.log('Primary image failed to load, URL:', employee.profile_pic_url);
                        setImageError(true);
                      }}
                    />
                  ) : (
                    <img
                      src="/default-profile.png"
                      alt="Default Profile"
                      className="employee-details-image"
                      onError={(e) => {
                        console.log('Fallback image failed to load, URL:', e.target.src);
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                </div>
                <div className="col-md-8">
                  <h3 className="employee-details-section-title">Personal Information</h3>
                  <div>
                    <span className="employee-details-label">Full Name:</span>
                    <span className="employee-details-value">{employee.full_name || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="employee-details-label">Date of Birth:</span>
                    <span className="employee-details-value">{employee.date_of_birth || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="employee-details-label">National ID/Passport:</span>
                    <span className="employee-details-value">{employee.national_id || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="employee-details-label">Tax ID (TIN/KRA PIN):</span>
                    <span className="employee-details-value">{employee.tax_id || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="employee-details-label">Social Security (NSSF/SSN):</span>
                    <span className="employee-details-value">{employee.social_security || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="employee-details-label">Nationality:</span>
                    <span className="employee-details-value">{employee.nationality || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="employee-details-label">Gender:</span>
                    <span className="employee-details-value">{employee.gender || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="employee-details-label">Marital Status:</span>
                    <span className="employee-details-value">{employee.marital_status || 'N/A'}</span>
                  </div>

                  <h3 className="employee-details-section-title">Contact Information</h3>
                  <div>
                    <span className="employee-details-label">Permanent Address:</span>
                    <span className="employee-details-value">{employee.permanent_address || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="employee-details-label">Current Address:</span>
                    <span className="employee-details-value">{employee.current_address || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="employee-details-label">Phone Number:</span>
                    <span className="employee-details-value">{employee.phone_number || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="employee-details-label">Email Address:</span>
                    <span className="employee-details-value">{employee.email || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="employee-details-label">Emergency Contact:</span>
                    <span className="employee-details-value">{employee.emergency_contact || 'N/A'}</span>
                  </div>

                  <h3 className="employee-details-section-title">Employment Details</h3>
                  <div>
                    <span className="employee-details-label">Position/Job Title:</span>
                    <span className="employee-details-value">{employee.position || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="employee-details-label">Department/Division:</span>
                    <span className="employee-details-value">{employee.department || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="employee-details-label">Employment Type:</span>
                    <span className="employee-details-value">{employee.employment_type || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="employee-details-label">Start Date:</span>
                    <span className="employee-details-value">{employee.start_date || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="employee-details-label">Work Location/Branch:</span>
                    <span className="employee-details-value">{employee.work_location || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="employee-details-label">Reporting Manager:</span>
                    <span className="employee-details-value">{employee.reporting_manager || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="employee-details-label">Probation Period:</span>
                    <span className="employee-details-value">{employee.probation_period || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="employee-details-label">Job Description:</span>
                    <span className="employee-details-value">{employee.job_description || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="employee-details-label">Employee Code/ID:</span>
                    <span className="employee-details-value">{employee.employee_code || 'N/A'}</span>
                  </div>

                  <h3 className="employee-details-section-title">Compensation Details</h3>
                  <div>
                    <span className="employee-details-label">Gross Basic Salary:</span>
                    <span className="employee-details-value">{employee.gross_salary || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="employee-details-label">Payment Method:</span>
                    <span className="employee-details-value">{employee.payment_method || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="employee-details-label">Bank Details:</span>
                    <span className="employee-details-value">{employee.bank_details || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="employee-details-label">Allowances:</span>
                    <span className="employee-details-value">{employee.allowances || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="employee-details-label">Deductions:</span>
                    <span className="employee-details-value">{employee.deductions || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="employee-details-label">Overtime & Bonus:</span>
                    <span className="employee-details-value">{employee.overtime_bonus || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="employee-details-label">Leave Entitlements:</span>
                    <span className="employee-details-value">{employee.leave_entitlements || 'N/A'}</span>
                  </div>

                  <h3 className="employee-details-section-title">Benefits & Insurance</h3>
                  <div>
                    <span className="employee-details-label">Health Insurance:</span>
                    <span className="employee-details-value">{employee.health_insurance || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="employee-details-label">Pension/Retirement Plan:</span>
                    <span className="employee-details-value">{employee.pension_plan || 'N/A'}</span>
                  </div>

                  <h3 className="employee-details-section-title">Additional Information</h3>
                  <div>
                    <span className="employee-details-label">Educational Background:</span>
                    <span className="employee-details-value">{employee.educational_background || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="employee-details-label">Professional Certifications:</span>
                    <span className="employee-details-value">{employee.certifications || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="employee-details-label">Languages Spoken:</span>
                    <span className="employee-details-value">{employee.languages_spoken || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="employee-details-label">Reference 1:</span>
                    <span className="employee-details-value">{employee.reference1 || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="employee-details-label">Reference 2:</span>
                    <span className="employee-details-value">{employee.reference2 || 'N/A'}</span>
                  </div>

                  <h3 className="employee-details-section-title">Declaration</h3>
                  <div>
                    <span className="employee-details-label">Declared By:</span>
                    <span className="employee-details-value">{employee.declaration_name || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="employee-details-label">Signature:</span>
                    <span className="employee-details-value">{employee.declaration_signature || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="employee-details-label">Date:</span>
                    <span className="employee-details-value">{employee.declaration_date || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-btn-container">
            <Link to="/hr-management/employee-list" className="back-btn">Back to List</Link>
            <button className="delete-btn" onClick={handleDelete}>Delete Employee</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeDetails;