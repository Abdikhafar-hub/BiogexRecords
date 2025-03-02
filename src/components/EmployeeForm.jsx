import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const EmployeeForm = ({ onSubmit }) => {
  // State for form inputs
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    nationalId: '',
    taxId: '',
    socialSecurity: '',
    nationality: '',
    gender: '',
    maritalStatus: '',
    permanentAddress: '',
    currentAddress: '',
    phoneNumber: '',
    email: '',
    emergencyContact: '',
    position: '',
    department: '',
    employmentType: '',
    startDate: '',
    workLocation: '',
    reportingManager: '',
    probationPeriod: '',
    jobDescription: '',
    employeeCode: '',
    grossSalary: '',
    paymentMethod: '',
    bankDetails: '',
    allowances: '',
    deductions: '',
    overtimeBonus: '',
    leaveEntitlements: '',
    healthInsurance: '',
    pensionPlan: '',
    educationalBackground: '',
    certifications: '',
    languagesSpoken: '',
    reference1: '',
    reference2: '',
    declarationName: '',
    declarationSignature: '',
    declarationDate: '',
  });

  // State for file uploads
  const [files, setFiles] = useState({});

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input changes
  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    setFiles((prevFiles) => ({ ...prevFiles, [fieldName]: file }));
    if (fieldName === 'profilePic') {
      setFormData((prev) => ({ ...prev, profilePic: file }));
    }
    if (fieldName === 'certifications') {
      setFormData((prev) => ({ ...prev, certificationsFile: file }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const employeeData = { ...formData, ...files };
    onSubmit(employeeData); // Add employee to the list via the onSubmit prop
    // Reset form after submission
    setFormData({
      fullName: '',
      dateOfBirth: '',
      nationalId: '',
      taxId: '',
      socialSecurity: '',
      nationality: '',
      gender: '',
      maritalStatus: '',
      permanentAddress: '',
      currentAddress: '',
      phoneNumber: '',
      email: '',
      emergencyContact: '',
      position: '',
      department: '',
      employmentType: '',
      startDate: '',
      workLocation: '',
      reportingManager: '',
      probationPeriod: '',
      jobDescription: '',
      employeeCode: '',
      grossSalary: '',
      paymentMethod: '',
      bankDetails: '',
      allowances: '',
      deductions: '',
      overtimeBonus: '',
      leaveEntitlements: '',
      healthInsurance: '',
      pensionPlan: '',
      educationalBackground: '',
      certifications: '',
      languagesSpoken: '',
      reference1: '',
      reference2: '',
      declarationName: '',
      declarationSignature: '',
      declarationDate: '',
    });
    setFiles({});
  };

  return (
    <div className="container my-5">
      <div className="card shadow" style={{ border: '2px solid #28a745', backgroundColor: '#fff' }}>
        <div className="card-header text-center" style={{ backgroundColor: '#28a745', color: '#fff' }}>
          <h2>BIOGEX PHARMA LIMITED</h2>
          <h4>Employee Account Form</h4>
        </div>
        <div className="card-body" style={{ backgroundColor: '#f8f9fa', color: '#000' }}>
          <Form onSubmit={handleSubmit}>
            {/* Section 1: Personal Information */}
            <h5 className="mt-4" style={{ color: '#28a745' }}>Section 1: Personal Information</h5>
            <hr style={{ borderColor: '#28a745' }} />
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Full Legal Name</label>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="As per official documents"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Date of Birth</label>
                <Form.Control
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label>National ID / Passport Number</label>
                <Form.Control
                  type="text"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleInputChange}
                  placeholder="Include issuing country"
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label>Tax Identification Number (TIN/KRA PIN)</label>
                <Form.Control
                  type="text"
                  name="taxId"
                  value={formData.taxId}
                  onChange={handleInputChange}
                  placeholder="Enter TIN or KRA PIN"
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label>Social Security Number (NSSF/SSN)</label>
                <Form.Control
                  type="text"
                  name="socialSecurity"
                  value={formData.socialSecurity}
                  onChange={handleInputChange}
                  placeholder="Enter NSSF/SSN"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label>Nationality</label>
                <Form.Control
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  placeholder="Include work permit if applicable"
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label>Gender</label>
                <Form.Select name="gender" value={formData.gender} onChange={handleInputChange} required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </div>
              <div className="col-md-4 mb-3">
                <label>Marital Status</label>
                <Form.Select name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange} required>
                  <option value="">Select Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </Form.Select>
              </div>
            </div>
            <div className="mb-3">
              <label>Profile Picture</label>
              <Form.Control
                type="file"
                accept=".jpg,.png"
                onChange={(e) => handleFileChange(e, 'profilePic')}
              />
              {files.profilePic && <p className="mt-2">Uploaded: {files.profilePic.name}</p>}
            </div>

            {/* Section 2: Contact Information */}
            <h5 className="mt-4" style={{ color: '#28a745' }}>Section 2: Contact Information</h5>
            <hr style={{ borderColor: '#28a745' }} />
            <div className="mb-3">
              <label>Permanent Home Address</label>
              <Form.Control
                as="textarea"
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleInputChange}
                placeholder="Street, City, Postal Code, Country"
                required
              />
            </div>
            <div className="mb-3">
              <label>Current Residential Address</label>
              <Form.Control
                as="textarea"
                name="currentAddress"
                value={formData.currentAddress}
                onChange={handleInputChange}
                placeholder="If different from permanent address"
              />
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Primary Phone Number</label>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Include country code"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Email Address</label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Personal or business email"
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label>Emergency Contact</label>
              <Form.Control
                type="text"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                placeholder="Name, Relationship, Phone"
                required
              />
            </div>

            {/* Section 3: Employment Details */}
            <h5 className="mt-4" style={{ color: '#28a745' }}>Section 3: Employment Details</h5>
            <hr style={{ borderColor: '#28a745' }} />
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Position/Job Title</label>
                <Form.Control
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="Current role"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Department/Division</label>
                <Form.Control
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="e.g., Sales, Finance"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label>Employment Type</label>
                <Form.Select name="employmentType" value={formData.employmentType} onChange={handleInputChange} required>
                  <option value="">Select Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Temporary">Temporary</option>
                  <option value="Freelancer">Freelancer</option>
                </Form.Select>
              </div>
              <div className="col-md-4 mb-3">
                <label>Start Date</label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label>Work Location/Branch</label>
                <Form.Control
                  type="text"
                  name="workLocation"
                  value={formData.workLocation}
                  onChange={handleInputChange}
                  placeholder="Office or site"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Reporting Manager/Supervisor</label>
                <Form.Control
                  type="text"
                  name="reportingManager"
                  value={formData.reportingManager}
                  onChange={handleInputChange}
                  placeholder="Name and contact"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Probation Period (if any)</label>
                <Form.Control
                  type="text"
                  name="probationPeriod"
                  value={formData.probationPeriod}
                  onChange={handleInputChange}
                  placeholder="Duration in months"
                />
              </div>
            </div>
            <div className="mb-3">
              <label>Job Description & Responsibilities</label>
              <Form.Control
                as="textarea"
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleInputChange}
                placeholder="Brief summary"
                required
              />
            </div>
            <div className="mb-3">
              <label>Employee Code/ID</label>
              <Form.Control
                type="text"
                name="employeeCode"
                value={formData.employeeCode}
                onChange={handleInputChange}
                placeholder="Unique identifier"
                required
              />
            </div>

            {/* Section 4: Compensation Details */}
            <h5 className="mt-4" style={{ color: '#28a745' }}>Section 4: Compensation Details</h5>
            <hr style={{ borderColor: '#28a745' }} />
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Gross Basic Salary</label>
                <Form.Control
                  type="text"
                  name="grossSalary"
                  value={formData.grossSalary}
                  onChange={handleInputChange}
                  placeholder="Monthly/Annual, Currency"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Payment Method</label>
                <Form.Select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange} required>
                  <option value="">Select Method</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Check">Check</option>
                  <option value="Cash">Cash</option>
                  <option value="Mobile Money">Mobile Money</option>
                </Form.Select>
              </div>
            </div>
            <div className="mb-3">
              <label>Bank Account Information</label>
              <Form.Control
                type="text"
                name="bankDetails"
                value={formData.bankDetails}
                onChange={handleInputChange}
                placeholder="Bank Name, Branch, Account Number, Swift Code"
                required
              />
            </div>
            <div className="mb-3">
              <label>Allowances</label>
              <Form.Control
                as="textarea"
                name="allowances"
                value={formData.allowances}
                onChange={handleInputChange}
                placeholder="e.g., Housing, Transport - Specify amounts"
              />
            </div>
            <div className="mb-3">
              <label>Deductions</label>
              <Form.Control
                as="textarea"
                name="deductions"
                value={formData.deductions}
                onChange={handleInputChange}
                placeholder="e.g., Tax, Social Security - Itemize"
              />
            </div>
            <div className="mb-3">
              <label>Overtime & Bonus Eligibility</label>
              <Form.Control
                as="textarea"
                name="overtimeBonus"
                value={formData.overtimeBonus}
                onChange={handleInputChange}
                placeholder="Policy details or rates"
              />
            </div>
            <div className="mb-3">
              <label>Leave Entitlements</label>
              <Form.Control
                as="textarea"
                name="leaveEntitlements"
                value={formData.leaveEntitlements}
                onChange={handleInputChange}
                placeholder="Annual, Sick, etc. - Days per year"
                required
              />
            </div>

            {/* Section 5: Benefits & Insurance */}
            <h5 className="mt-4" style={{ color: '#28a745' }}>Section 5: Benefits & Insurance</h5>
            <hr style={{ borderColor: '#28a745' }} />
            <div className="mb-3">
              <label>Health Insurance Information</label>
              <Form.Control
                type="text"
                name="healthInsurance"
                value={formData.healthInsurance}
                onChange={handleInputChange}
                placeholder="Provider, Policy Number, Coverage"
              />
            </div>
            <div className="mb-3">
              <label>Pension/Retirement Plan</label>
              <Form.Control
                type="text"
                name="pensionPlan"
                value={formData.pensionPlan}
                onChange={handleInputChange}
                placeholder="Provider, Contribution Rates, Plan ID"
              />
            </div>

            {/* Section 6: Additional Information */}
            <h5 className="mt-4" style={{ color: '#28a745' }}>Section 6: Additional Information</h5>
            <hr style={{ borderColor: '#28a745' }} />
            <div className="mb-3">
              <label>Educational Background</label>
              <Form.Control
                as="textarea"
                name="educationalBackground"
                value={formData.educationalBackground}
                onChange={handleInputChange}
                placeholder="Highest qualification, institution, year"
              />
            </div>
            <div className="mb-3">
              <label>Professional Certifications</label>
              <Form.Control
                type="text"
                name="certifications"
                value={formData.certifications}
                onChange={handleInputChange}
                placeholder="e.g., CPA, PMP"
                className="mb-2"
              />
              <Form.Control
                type="file"
                accept=".pdf,.jpg,.png"
                onChange={(e) => handleFileChange(e, 'certifications')}
              />
              {files.certifications && <p className="mt-2">Uploaded: {files.certifications.name}</p>}
            </div>
            <div className="mb-3">
              <label>Languages Spoken</label>
              <Form.Control
                type="text"
                name="languagesSpoken"
                value={formData.languagesSpoken}
                onChange={handleInputChange}
                placeholder="e.g., English (Fluent), Swahili (Intermediate)"
              />
            </div>
            <div className="mb-3">
              <label>References</label>
              <Form.Control
                type="text"
                name="reference1"
                value={formData.reference1}
                onChange={handleInputChange}
                placeholder="Reference 1: Name, Position, Contact"
                className="mb-2"
              />
              <Form.Control
                type="text"
                name="reference2"
                value={formData.reference2}
                onChange={handleInputChange}
                placeholder="Reference 2: Name, Position, Contact"
              />
            </div>

            {/* Section 7: Declaration */}
            <h5 className="mt-4" style={{ color: '#28a745' }}>Section 7: Declaration</h5>
            <hr style={{ borderColor: '#28a745' }} />
            <p>
              I certify that the information provided is true and accurate to the best of my knowledge. I understand that
              any misrepresentation may result in termination of services or employment.
            </p>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label>Full Name</label>
                <Form.Control
                  type="text"
                  name="declarationName"
                  value={formData.declarationName}
                  onChange={handleInputChange}
                  placeholder="Enter Full Name"
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label>Digital Signature</label>
                <Form.Control
                  type="text"
                  name="declarationSignature"
                  value={formData.declarationSignature}
                  onChange={handleInputChange}
                  placeholder="Type or upload signature"
                />
              </div>
              <div className="col-md-4 mb-3">
                <label>Date of Submission</label>
                <Form.Control
                  type="date"
                  name="declarationDate"
                  value={formData.declarationDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="card-footer text-center" style={{ backgroundColor: '#28a745', color: '#fff' }}>
              <Button type="submit" variant="light">Create Employee</Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;