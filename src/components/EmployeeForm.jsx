import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { supabase } from '../supabaseClient';

// Custom CSS (unchanged from your previous version)
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

  .form-container {
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
    background: linear-gradient(135deg, #f8fafc 0%, #e6f0fa 100%);
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .form-card {
    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
    border: 2px solid transparent;
    border-image: linear-gradient(90deg, #047857 0%, #28a745 100%) 1;
    border-radius: 20px;
    box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.5);
    transition: all 0.3s ease;
    width: 100%;
    max-width: 90%;
    max-height: calc(100vh - 2rem);
    display: flex;
    flex-direction: column;
  }

  .form-card:hover {
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.15), -10px -10px 20px rgba(255, 255, 255, 0.7);
  }

  .form-header {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    padding: 1rem;
  }

  .form-header-title {
    font-size: 1.75rem;
    font-weight: 700;
    letter-spacing: 1px;
  }

  .form-header-subtitle {
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 0.5px;
  }

  .form-instruction {
    font-family: 'Poppins', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    color: #4b5563;
    background: #f1f5f9;
    border-left: 4px solid #047857;
    padding: 0.5rem 1rem;
    margin: 0.5rem 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    animation: fadeIn 1s ease-in-out forwards;
  }

  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  .form-error {
    font-family: 'Poppins', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    color: #dc3545;
    background: #f8d7da;
    border-left: 4px solid #dc3545;
    padding: 0.5rem 1rem;
    margin: 0.5rem 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .form-body {
    background-color: #f8f9fa;
    color: #000;
    padding: 1rem;
    flex: 1;
    overflow-y: auto;
  }

  .form-section-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #047857;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    position: relative;
    padding-bottom: 0.25rem;
  }

  .form-section-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    border-radius: 2px;
  }

  .form-subsection-title {
    font-size: 1rem;
    font-weight: 600;
    color: #4b5563;
    margin-top: 1rem;
    margin-bottom: 0.75rem;
  }

  .form-label {
    font-weight: 500;
    color: #1f2937;
    margin-bottom: 0.25rem;
    font-size: 0.9rem;
  }

  .form-control, .form-select {
    border: 1px solid #d1d5db;
    border-radius: 8px;
    padding: 0.5rem;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    font-size: 0.9rem;
  }

  .form-control:focus, .form-select:focus {
    border-color: #047857;
    box-shadow: 0 0 0 3px rgba(4, 120, 87, 0.1);
    outline: none;
  }

  .form-control::placeholder {
    color: #9ca3af;
    font-style: italic;
    font-size: 0.85rem;
  }

  .form-footer {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    padding: 0.75rem;
  }

  .form-button {
    font-weight: 600;
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
    background: #ffffff;
    color: #047857;
  }

  .form-button:hover {
    background: #f8fafc;
    box-shadow: 0 6px 16px rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    .form-card {
      max-width: 100%;
      max-height: calc(100vh - 1rem);
    }

    .form-body {
      padding: 0.75rem;
    }

    .form-section-title {
      font-size: 1.1rem;
    }

    .form-subsection-title {
      font-size: 0.9rem;
    }

    .form-label {
      font-size: 0.85rem;
    }

    .form-control, .form-select {
      font-size: 0.85rem;
      padding: 0.4rem;
    }
  }
`;

const EmployeeForm = () => {
  const navigate = useNavigate();
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

  const [files, setFiles] = useState({});
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    setFiles((prevFiles) => ({ ...prevFiles, [fieldName]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = [
      'fullName',
      'dateOfBirth',
      'nationalId',
      'taxId',
      'socialSecurity',
      'nationality',
      'gender',
      'maritalStatus',
      'permanentAddress',
      'phoneNumber',
      'email',
      'emergencyContact',
      'position',
      'department',
      'employmentType',
      'startDate',
      'workLocation',
      'reportingManager',
      'jobDescription',
      'employeeCode',
      'grossSalary',
      'paymentMethod',
      'bankDetails',
      'leaveEntitlements',
      'declarationName',
      'declarationDate',
    ];

    const emptyFields = requiredFields.filter((field) => !formData[field]);
    if (emptyFields.length > 0) {
      setError(`Please fill in all required fields: ${emptyFields.join(', ')}`);
      return;
    }

    setError('');

    try {
      // Check if the employeeCode already exists
      const { data: existingEmployee, error: checkError } = await supabase
        .from('employees')
        .select('employee_code')
        .eq('employee_code', formData.employeeCode)
        .single();

      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 means no rows found, which is okay
        throw new Error('Error checking employee code: ' + checkError.message);
      }

      if (existingEmployee) {
        setError('Employee Code already exists. Please use a unique code.');
        return;
      }

      // Upload profile picture to Supabase Storage if provided
      let profilePicUrl = null;
      if (files.profilePic) {
        const file = files.profilePic;
        const filePath = `profile-pics/${Date.now()}_${file.name}`;
        const { data, error: uploadError } = await supabase.storage
          .from('biogex-files')
          .upload(filePath, file);

        if (uploadError) {
          throw new Error('Failed to upload profile picture: ' + uploadError.message);
        }

        // Get the public URL of the uploaded file
        const { data: urlData } = supabase.storage
          .from('biogex-files')
          .getPublicUrl(filePath);
        profilePicUrl = urlData.publicUrl;
      }

      // Get the current authenticated user to associate the employee with their user_id
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData.user) {
        throw new Error('Failed to get authenticated user: ' + (userError?.message || 'User not found'));
      }

      // Prepare employee data for insertion
      const employeeData = {
        user_id: userData.user.id,
        full_name: formData.fullName,
        date_of_birth: formData.dateOfBirth,
        national_id: formData.nationalId,
        tax_id: formData.taxId,
        social_security: formData.socialSecurity,
        nationality: formData.nationality,
        gender: formData.gender,
        marital_status: formData.maritalStatus,
        permanent_address: formData.permanentAddress,
        current_address: formData.currentAddress,
        phone_number: formData.phoneNumber,
        email: formData.email,
        emergency_contact: formData.emergencyContact,
        position: formData.position,
        department: formData.department,
        employment_type: formData.employmentType,
        date_of_joining: formData.startDate,
        work_location: formData.workLocation,
        reporting_manager: formData.reportingManager,
        probation_period: formData.probationPeriod,
        job_description: formData.jobDescription,
        employee_code: formData.employeeCode,
        gross_salary: formData.grossSalary,
        payment_method: formData.paymentMethod,
        bank_details: formData.bankDetails,
        allowances: formData.allowances,
        deductions: formData.deductions,
        overtime_bonus: formData.overtimeBonus,
        leave_entitlements: formData.leaveEntitlements,
        health_insurance: formData.healthInsurance,
        pension_plan: formData.pensionPlan,
        educational_background: formData.educationalBackground,
        certifications: formData.certifications,
        languages_spoken: formData.languagesSpoken,
        reference1: formData.reference1,
        reference2: formData.reference2,
        declaration_name: formData.declarationName,
        declaration_signature: formData.declarationSignature,
        declaration_date: formData.declarationDate,
        profile_pic_url: profilePicUrl,
      };

      // Insert employee data into Supabase
      const { data: employeeInsertData, error: insertError } = await supabase
        .from('employees')
        .insert([employeeData])
        .select();

      if (insertError) {
        throw new Error('Failed to create employee: ' + insertError.message);
      }

      const newEmployeeId = employeeInsertData[0].id;

      // Insert initial salary transaction into the remuneration table
      const remunerationData = {
        employee_id: newEmployeeId,
        employee_name: formData.fullName,
        gross_salary: formData.grossSalary,
        deductions: formData.deductions || '0',
        allowances: formData.allowances || '0',
        overtime_bonus: formData.overtimeBonus || '0',
        payment_method: formData.paymentMethod,
        bank_details: formData.bankDetails,
        created_at: new Date().toISOString(),
      };

      const { error: remunerationError } = await supabase
        .from('remuneration')
        .insert([remunerationData]);

      if (remunerationError) {
        throw new Error('Failed to create remuneration record: ' + remunerationError.message);
      }

      // Reset form
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

      // Navigate back to HR Management Dashboard
      navigate('/hr-management');
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <>
      <style>{customStyles}</style>
      <div className="form-container">
        <Container>
          <div className="form-card">
            <div className="form-header text-center">
              <h2 className="form-header-title">BIOGEX PHARMA LIMITED</h2>
              <h4 className="form-header-subtitle">Employee Account Form</h4>
            </div>
            <div className="form-instruction">
              Please fill all the required information and click "Create Employee" to submit the form.
            </div>
            {error && <div className="form-error">{error}</div>}
            <div className="form-body">
              <Form onSubmit={handleSubmit}>
                {/* Section 1: Personal Information */}
                <h5 className="form-section-title">Section 1: Personal Information</h5>
                <hr style={{ borderColor: '#28a745' }} />
                <Row>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Full Legal Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="As per official documents"
                      required
                    />
                  </Col>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">National ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="nationalId"
                      value={formData.nationalId}
                      onChange={handleInputChange}
                      placeholder="Enter National ID"
                      required
                    />
                  </Col>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Tax ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="taxId"
                      value={formData.taxId}
                      onChange={handleInputChange}
                      placeholder="Enter Tax ID"
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Social Security Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="socialSecurity"
                      value={formData.socialSecurity}
                      onChange={handleInputChange}
                      placeholder="Enter Social Security Number"
                      required
                    />
                  </Col>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Nationality</Form.Label>
                    <Form.Control
                      type="text"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      placeholder="Enter Nationality"
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Gender</Form.Label>
                    <Form.Select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Col>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Marital Status</Form.Label>
                    <Form.Select
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Marital Status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </Form.Select>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Permanent Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="permanentAddress"
                      value={formData.permanentAddress}
                      onChange={handleInputChange}
                      placeholder="Enter Permanent Address"
                      required
                    />
                  </Col>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Current Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="currentAddress"
                      value={formData.currentAddress}
                      onChange={handleInputChange}
                      placeholder="Enter Current Address (if different)"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="+254 123 456 789"
                      required
                    />
                  </Col>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="example@domain.com"
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Emergency Contact</Form.Label>
                    <Form.Control
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      placeholder="Name and Phone Number"
                      required
                    />
                  </Col>
                </Row>

                {/* Section 2: Employment Details */}
                <h5 className="form-section-title">Section 2: Employment Details</h5>
                <hr style={{ borderColor: '#28a745' }} />
                <Row>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Position</Form.Label>
                    <Form.Control
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      placeholder="Enter Position"
                      required
                    />
                  </Col>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Department</Form.Label>
                    <Form.Control
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      placeholder="Enter Department"
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Employment Type</Form.Label>
                    <Form.Select
                      name="employmentType"
                      value={formData.employmentType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Employment Type</option>
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Intern">Intern</option>
                    </Form.Select>
                  </Col>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Work Location</Form.Label>
                    <Form.Control
                      type="text"
                      name="workLocation"
                      value={formData.workLocation}
                      onChange={handleInputChange}
                      placeholder="Enter Work Location"
                      required
                    />
                  </Col>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Reporting Manager</Form.Label>
                    <Form.Control
                      type="text"
                      name="reportingManager"
                      value={formData.reportingManager}
                      onChange={handleInputChange}
                      placeholder="Enter Reporting Manager"
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Probation Period (Months)</Form.Label>
                    <Form.Control
                      type="text"
                      name="probationPeriod"
                      value={formData.probationPeriod}
                      onChange={handleInputChange}
                      placeholder="e.g., 3 months"
                    />
                  </Col>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Job Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="jobDescription"
                      value={formData.jobDescription}
                      onChange={handleInputChange}
                      placeholder="Enter Job Description"
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Employee Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="employeeCode"
                      value={formData.employeeCode}
                      onChange={handleInputChange}
                      placeholder="Enter Employee Code"
                      required
                    />
                  </Col>
                </Row>

                {/* Section 3: Compensation Details */}
                <h5 className="form-section-title">Section 3: Compensation Details</h5>
                <hr style={{ borderColor: '#28a745' }} />
                <Row>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Gross Salary</Form.Label>
                    <Form.Control
                      type="text"
                      name="grossSalary"
                      value={formData.grossSalary}
                      onChange={handleInputChange}
                      placeholder="Enter Gross Salary"
                      required
                    />
                  </Col>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Payment Method</Form.Label>
                    <Form.Select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Payment Method</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Check">Check</option>
                      <option value="Cash">Cash</option>
                      <option value="Mobile Money">Mobile Money</option>
                    </Form.Select>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Bank Details</Form.Label>
                    <Form.Control
                      type="text"
                      name="bankDetails"
                      value={formData.bankDetails}
                      onChange={handleInputChange}
                      placeholder="Enter Bank Details"
                      required
                    />
                  </Col>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Allowances</Form.Label>
                    <Form.Control
                      type="text"
                      name="allowances"
                      value={formData.allowances}
                      onChange={handleInputChange}
                      placeholder="Enter Allowances"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Deductions</Form.Label>
                    <Form.Control
                      type="text"
                      name="deductions"
                      value={formData.deductions}
                      onChange={handleInputChange}
                      placeholder="Enter Deductions"
                    />
                  </Col>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Overtime Bonus</Form.Label>
                    <Form.Control
                      type="text"
                      name="overtimeBonus"
                      value={formData.overtimeBonus}
                      onChange={handleInputChange}
                      placeholder="Enter Overtime Bonus"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Leave Entitlements</Form.Label>
                    <Form.Control
                      type="text"
                      name="leaveEntitlements"
                      value={formData.leaveEntitlements}
                      onChange={handleInputChange}
                      placeholder="Enter Leave Entitlements"
                      required
                    />
                  </Col>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Health Insurance</Form.Label>
                    <Form.Control
                      type="text"
                      name="healthInsurance"
                      value={formData.healthInsurance}
                      onChange={handleInputChange}
                      placeholder="Enter Health Insurance Details"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Pension Plan</Form.Label>
                    <Form.Control
                      type="text"
                      name="pensionPlan"
                      value={formData.pensionPlan}
                      onChange={handleInputChange}
                      placeholder="Enter Pension Plan Details"
                    />
                  </Col>
                </Row>

                {/* Section 4: Education and Skills */}
                <h5 className="form-section-title">Section 4: Education and Skills</h5>
                <hr style={{ borderColor: '#28a745' }} />
                <Row>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Educational Background</Form.Label>
                    <Form.Control
                      type="text"
                      name="educationalBackground"
                      value={formData.educationalBackground}
                      onChange={handleInputChange}
                      placeholder="Enter Educational Background"
                    />
                  </Col>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Certifications</Form.Label>
                    <Form.Control
                      type="text"
                      name="certifications"
                      value={formData.certifications}
                      onChange={handleInputChange}
                      placeholder="Enter Certifications"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Languages Spoken</Form.Label>
                    <Form.Control
                      type="text"
                      name="languagesSpoken"
                      value={formData.languagesSpoken}
                      onChange={handleInputChange}
                      placeholder="Enter Languages Spoken"
                    />
                  </Col>
                </Row>

                {/* Section 5: References */}
                <h5 className="form-section-title">Section 5: References</h5>
                <hr style={{ borderColor: '#28a745' }} />
                <h6 className="form-subsection-title">Reference 1</h6>
                <Row>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Reference 1 Details</Form.Label>
                    <Form.Control
                      type="text"
                      name="reference1"
                      value={formData.reference1}
                      onChange={handleInputChange}
                      placeholder="Name, Position, Contact"
                    />
                  </Col>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Reference 2 Details</Form.Label>
                    <Form.Control
                      type="text"
                      name="reference2"
                      value={formData.reference2}
                      onChange={handleInputChange}
                      placeholder="Name, Position, Contact"
                    />
                  </Col>
                </Row>

                {/* Section 6: Declaration */}
                <h5 className="form-section-title">Section 6: Declaration</h5>
                <hr style={{ borderColor: '#28a745' }} />
                <Row>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Declaration Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="declarationName"
                      value={formData.declarationName}
                      onChange={handleInputChange}
                      placeholder="Enter Your Name"
                      required
                    />
                  </Col>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Declaration Signature</Form.Label>
                    <Form.Control
                      type="text"
                      name="declarationSignature"
                      value={formData.declarationSignature}
                      onChange={handleInputChange}
                      placeholder="Type your name as a signature"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Declaration Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="declarationDate"
                      value={formData.declarationDate}
                      onChange={handleInputChange}
                      required
                    />
                  </Col>
                </Row>

                {/* Section 7: Document Uploads */}
                <h5 className="form-section-title">Section 7: Document Uploads</h5>
                <hr style={{ borderColor: '#28a745' }} />
                <Row>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Profile Picture</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(e) => handleFileChange(e, 'profilePic')}
                    />
                  </Col>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Copy of ID/Passport</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(e) => handleFileChange(e, 'idPassport')}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Certificates</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(e) => handleFileChange(e, 'certificates')}
                    />
                  </Col>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Label className="form-label">Other Documents</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(e) => handleFileChange(e, 'otherDocs')}
                    />
                  </Col>
                </Row>

                {/* Form Footer */}
                <div className="form-footer text-center">
                  <Button type="submit" className="form-button">Create Employee</Button>
                </div>
              </Form>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default EmployeeForm;