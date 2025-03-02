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
              {employee.profilePic ? (
                <img
                  src={URL.createObjectURL(employee.profilePic)}
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
              <p><strong>Full Name:</strong> {employee.fullName}</p>
              <p><strong>Date of Birth:</strong> {employee.dateOfBirth}</p>
              <p><strong>National ID/Passport:</strong> {employee.nationalId}</p>
              <p><strong>Tax ID (TIN/KRA PIN):</strong> {employee.taxId}</p>
              <p><strong>Social Security (NSSF/SSN):</strong> {employee.socialSecurity}</p>
              <p><strong>Nationality:</strong> {employee.nationality}</p>
              <p><strong>Gender:</strong> {employee.gender}</p>
              <p><strong>Marital Status:</strong> {employee.maritalStatus}</p>

              <h5 style={{ color: '#28a745' }} className="mt-4">Contact Information</h5>
              <p><strong>Permanent Address:</strong> {employee.permanentAddress}</p>
              <p><strong>Current Address:</strong> {employee.currentAddress}</p>
              <p><strong>Phone Number:</strong> {employee.phoneNumber}</p>
              <p><strong>Email Address:</strong> {employee.email}</p>
              <p><strong>Emergency Contact:</strong> {employee.emergencyContact}</p>

              <h5 style={{ color: '#28a745' }} className="mt-4">Employment Details</h5>
              <p><strong>Position/Job Title:</strong> {employee.position}</p>
              <p><strong>Department/Division:</strong> {employee.department}</p>
              <p><strong>Employment Type:</strong> {employee.employmentType}</p>
              <p><strong>Start Date:</strong> {employee.startDate}</p>
              <p><strong>Work Location/Branch:</strong> {employee.workLocation}</p>
              <p><strong>Reporting Manager:</strong> {employee.reportingManager}</p>
              <p><strong>Probation Period:</strong> {employee.probationPeriod || 'N/A'}</p>
              <p><strong>Job Description:</strong> {employee.jobDescription}</p>
              <p><strong>Employee Code/ID:</strong> {employee.employeeCode}</p>

              <h5 style={{ color: '#28a745' }} className="mt-4">Compensation Details</h5>
              <p><strong>Gross Basic Salary:</strong> {employee.grossSalary}</p>
              <p><strong>Payment Method:</strong> {employee.paymentMethod}</p>
              <p><strong>Bank Details:</strong> {employee.bankDetails}</p>
              <p><strong>Allowances:</strong> {employee.allowances || 'N/A'}</p>
              <p><strong>Deductions:</strong> {employee.deductions || 'N/A'}</p>
              <p><strong>Overtime & Bonus:</strong> {employee.overtimeBonus || 'N/A'}</p>
              <p><strong>Leave Entitlements:</strong> {employee.leaveEntitlements}</p>

              <h5 style={{ color: '#28a745' }} className="mt-4">Benefits & Insurance</h5>
              <p><strong>Health Insurance:</strong> {employee.healthInsurance || 'N/A'}</p>
              <p><strong>Pension/Retirement Plan:</strong> {employee.pensionPlan || 'N/A'}</p>

              <h5 style={{ color: '#28a745' }} className="mt-4">Additional Information</h5>
              <p><strong>Educational Background:</strong> {employee.educationalBackground || 'N/A'}</p>
              <p><strong>Professional Certifications:</strong> {employee.certifications || 'N/A'}</p>
              {employee.certificationsFile && (
                <p><strong>Certification File:</strong> {employee.certificationsFile.name}</p>
              )}
              <p><strong>Languages Spoken:</strong> {employee.languagesSpoken || 'N/A'}</p>
              <p><strong>Reference 1:</strong> {employee.reference1 || 'N/A'}</p>
              <p><strong>Reference 2:</strong> {employee.reference2 || 'N/A'}</p>

              <h5 style={{ color: '#28a745' }} className="mt-4">Declaration</h5>
              <p><strong>Declared By:</strong> {employee.declarationName}</p>
              <p><strong>Signature:</strong> {employee.declarationSignature || 'N/A'}</p>
              <p><strong>Date:</strong> {employee.declarationDate}</p>
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