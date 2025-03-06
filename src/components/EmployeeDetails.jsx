import React from 'react';

const EmployeeDetails = ({ employee, onBack }) => {
  return (
    <div className="container my-5">
      <div className="card shadow" style={{ border: '2px solid #28a745', backgroundColor: '#fff' }}>
        <div className="card-header text-center" style={{ backgroundColor: '#28a745', color: '#fff' }}>
          <h2>Employee Details</h2>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 text-center">
              {employee.profile_pic_url ? (
                <img
                  src={employee.profile_pic_url}
                  alt="Profile"
                  className="img-fluid rounded-circle"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
              ) : (
                <p>No profile picture available.</p>
              )}
            </div>
            <div className="col-md-8">
              <h5 style={{ color: '#28a745' }}>Personal Information</h5>
              <p><strong>Full Name:</strong> {employee.full_name}</p>
              <p><strong>Date of Birth:</strong> {employee.date_of_birth}</p>
              <p><strong>National ID/Passport:</strong> {employee.national_id}</p>
              <p><strong>Tax ID (TIN/KRA PIN):</strong> {employee.tax_id}</p>
              <p><strong>Social Security (NSSF/SSN):</strong> {employee.social_security}</p>
              <p><strong>Nationality:</strong> {employee.nationality}</p>
              <p><strong>Gender:</strong> {employee.gender}</p>
              <p><strong>Marital Status:</strong> {employee.marital_status}</p>

              <h5 style={{ color: '#28a745' }} className="mt-4">Contact Information</h5>
              <p><strong>Permanent Address:</strong> {employee.permanent_address}</p>
              <p><strong>Current Address:</strong> {employee.current_address}</p>
              <p><strong>Phone Number:</strong> {employee.phone_number}</p>
              <p><strong>Email Address:</strong> {employee.email}</p>
              <p><strong>Emergency Contact:</strong> {employee.emergency_contact}</p>

              <h5 style={{ color: '#28a745' }} className="mt-4">Employment Details</h5>
              <p><strong>Position/Job Title:</strong> {employee.position}</p>
              <p><strong>Department/Division:</strong> {employee.department}</p>
              <p><strong>Employment Type:</strong> {employee.employment_type}</p>
              <p><strong>Start Date:</strong> {employee.start_date}</p>
              <p><strong>Work Location/Branch:</strong> {employee.work_location}</p>
              <p><strong>Reporting Manager:</strong> {employee.reporting_manager}</p>
              <p><strong>Probation Period:</strong> {employee.probation_period || 'N/A'}</p>
              <p><strong>Job Description:</strong> {employee.job_description}</p>
              <p><strong>Employee Code/ID:</strong> {employee.employee_code}</p>

              <h5 style={{ color: '#28a745' }} className="mt-4">Compensation Details</h5>
              <p><strong>Gross Basic Salary:</strong> {employee.gross_salary}</p>
              <p><strong>Payment Method:</strong> {employee.payment_method}</p>
              <p><strong>Bank Details:</strong> {employee.bank_details}</p>
              <p><strong>Allowances:</strong> {employee.allowances || 'N/A'}</p>
              <p><strong>Deductions:</strong> {employee.deductions || 'N/A'}</p>
              <p><strong>Overtime & Bonus:</strong> {employee.overtime_bonus || 'N/A'}</p>
              <p><strong>Leave Entitlements:</strong> {employee.leave_entitlements}</p>

              <h5 style={{ color: '#28a745' }} className="mt-4">Benefits & Insurance</h5>
              <p><strong>Health Insurance:</strong> {employee.health_insurance || 'N/A'}</p>
              <p><strong>Pension/Retirement Plan:</strong> {employee.pension_plan || 'N/A'}</p>

              <h5 style={{ color: '#28a745' }} className="mt-4">Additional Information</h5>
              <p><strong>Educational Background:</strong> {employee.educational_background || 'N/A'}</p>
              <p><strong>Professional Certifications:</strong> {employee.certifications || 'N/A'}</p>
              <p><strong>Languages Spoken:</strong> {employee.languages_spoken || 'N/A'}</p>
              <p><strong>Reference 1:</strong> {employee.reference1 || 'N/A'}</p>
              <p><strong>Reference 2:</strong> {employee.reference2 || 'N/A'}</p>

              <h5 style={{ color: '#28a745' }} className="mt-4">Declaration</h5>
              <p><strong>Declared By:</strong> {employee.declaration_name}</p>
              <p><strong>Signature:</strong> {employee.declaration_signature || 'N/A'}</p>
              <p><strong>Date:</strong> {employee.declaration_date}</p>
            </div>
          </div>
        </div>
        <div className="card-footer text-center" style={{ backgroundColor: '#28a745', color: '#fff' }}>
          <button className="btn btn-light" onClick={onBack}>Back to Employee List</button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;