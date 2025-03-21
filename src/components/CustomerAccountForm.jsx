import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { supabase } from '../supabaseClient';

// Custom CSS with Mobile Responsiveness and Spinner
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

  .form-container {
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
    background: linear-gradient(135deg, #f8fafc 0%, #e6f0fa 100%);
    padding: 2rem 1rem;
    margin-top: 50px;
  }

  .form-card {
    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
    border: 2px solid transparent;
    border-image: linear-gradient(90deg, #047857 0%, #28a745 100%) 1;
    border-radius: 20px;
    box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.5);
    transition: all 0.3s ease;
  }

  .form-card:hover {
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.15), -10px -10px 20px rgba(255, 255, 255, 0.7);
  }

  .form-header {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    padding: 1.5rem;
  }

  .form-header-title {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 1px;
  }

  .form-header-subtitle {
    font-size: 1.25rem;
    font-weight: 400;
    letter-spacing: 0.5px;
  }

  .form-instruction {
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: #4b5563;
    background: #f1f5f9;
    border-left: 4px solid #047857;
    padding: 0.75rem 1.5rem;
    margin: 1rem 1.5rem;
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
    font-size: 0.9rem;
    font-weight: 500;
    color: #dc3545;
    background: #f8d7da;
    border-left: 4px solid #dc3545;
    padding: 0.75rem 1.5rem;
    margin: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .form-success, .form-submitting {
    font-family: 'Poppins', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    margin: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .form-success {
    color: #28a745;
    background: #d4edda;
    border-left: 4px solid #28a745;
  }

  .form-submitting {
    color: #047857;
    background: #e6f0fa;
    border-left: 4px solid #047857;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .spinner {
    width: 20px;
    height: 20px;
    border: 3px solid #047857;
    border-top: 3px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .form-body {
    background-color: #f8f9fa;
    color: #000;
    padding: 2rem 1.5rem;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }

  .form-section-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #047857;
    margin-top: 2rem;
    margin-bottom: 1rem;
    position: relative;
    padding-bottom: 0.5rem;
  }

  .form-section-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    border-radius: 2px;
  }

  .form-subsection-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #4b5563;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }

  .form-label {
    font-weight: 500;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  .form-control, .form-select {
    border: 1px solid #d1d5db;
    border-radius: 8px;
    padding: 0.75rem;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .form-control:focus, .form-select:focus {
    border-color: #047857;
    box-shadow: 0 0 0 3px rgba(4, 120, 87, 0.1);
    outline: none;
  }

  .form-control::placeholder {
    color: #9ca3af;
    font-style: italic;
  }

  .form-footer {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    padding: 1rem;
  }

  .form-button {
    font-weight: 600;
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
  }

  .form-button.submit {
    background: #ffffff;
    color: #047857;
  }

  .form-button.submit:disabled {
    background: #d1d5db;
    color: #6b7280;
    cursor: not-allowed;
  }

  .form-button.submit:hover:not(:disabled) {
    background: #f8fafc;
    box-shadow: 0 6px 16px rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  .form-button.cancel {
    background: transparent;
    color: #ffffff;
    border: 2px solid #ffffff;
  }

  .form-button.cancel:hover {
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 6px 16px rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  @media (max-width: 767px) {
    .form-container {
      padding: 1rem 0.5rem;
      margin-top: 20px;
    }

    .form-card {
      border-radius: 10px;
      box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1), -4px -4px 8px rgba(255, 255, 255, 0.5);
    }

    .form-header {
      padding: 1rem;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    .form-header-title {
      font-size: 1.5rem;
      letter-spacing: 0.5px;
    }

    .form-header-subtitle {
      font-size: 1rem;
      letter-spacing: 0.3px;
    }

    .form-instruction {
      font-size: 0.85rem;
      padding: 0.5rem 1rem;
      margin: 0.5rem 1rem;
      border-radius: 6px;
    }

    .form-error, .form-success, .form-submitting {
      font-size: 0.8rem;
      padding: 0.5rem 1rem;
      margin: 0.5rem 1rem;
      border-radius: 6px;
    }

    .form-body {
      padding: 1rem;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }

    .form-section-title {
      font-size: 1.2rem;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
      padding-bottom: 0.3rem;
    }

    .form-section-title::after {
      width: 30px;
      height: 2px;
    }

    .form-subsection-title {
      font-size: 0.95rem;
      margin-top: 1rem;
      margin-bottom: 0.75rem;
    }

    .form-label {
      font-size: 0.9rem;
      margin-bottom: 0.3rem;
    }

    .form-control, .form-select {
      padding: 0.5rem;
      font-size: 0.9rem;
      border-radius: 6px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .form-footer {
      flex-direction: column;
      gap: 0.5rem;
    }

    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid #047857;
      border-top: 2px solid transparent;
    }
  }
`;

const CustomerAccountForm = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState({
    kraPinCertificate: null,
    vatCertificate: null,
    businessRegCertificate: null,
    idPassport: null,
  });
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    businessType: '',
    contactPerson: '',
    positionTitle: '',
    phoneNumber: '',
    emailAddress: '',
    altPhoneNumber: '',
    streetAddress: '',
    city: '',
    county: '',
    postalCode: '',
    country: '',
    natureOfPremises: '',
    areaLocality: '',
    nearestLandmark: '',
    gpsCoordinates: '',
    bankName: '',
    branchName: '',
    accountName: '',
    accountNumber: '',
    swiftCode: '',
    vatPin: '',
    kraPin: '',
    creditLimit: '',
    paymentTerms: '',
    tradeRef1Company: '',
    tradeRef1Contact: '',
    tradeRef1Phone: '',
    tradeRef1Email: '',
    tradeRef2Company: '',
    tradeRef2Contact: '',
    tradeRef2Phone: '',
    tradeRef2Email: '',
    declarationName: '',
    declarationSignature: '',
    declarationDate: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

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

    const requiredFields = [
      'fullName',
      'businessName',
      'businessType',
      'contactPerson',
      'positionTitle',
      'phoneNumber',
      'emailAddress',
      'streetAddress',
      'city',
      'country',
      'natureOfPremises',
      'bankName',
      'accountName',
      'accountNumber',
      'kraPin',
      'declarationName',
      'declarationDate',
    ];

    const emptyFields = requiredFields.filter((field) => !formData[field]);
    if (emptyFields.length > 0) {
      setError(`Please fill in all required fields: ${emptyFields.join(', ')}`);
      return;
    }

    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      const customerData = {
        full_name: formData.fullName,
        business_name: formData.businessName,
        business_type: formData.businessType,
        contact_person: formData.contactPerson,
        position_title: formData.positionTitle,
        phone_number: formData.phoneNumber,
        email_address: formData.emailAddress,
        alt_phone_number: formData.altPhoneNumber,
        street_address: formData.streetAddress,
        city: formData.city,
        county: formData.county,
        postal_code: formData.postalCode,
        country: formData.country,
        nature_of_premises: formData.natureOfPremises,
        area_locality: formData.areaLocality,
        nearest_landmark: formData.nearestLandmark,
        gps_coordinates: formData.gpsCoordinates,
        bank_name: formData.bankName,
        branch_name: formData.branchName,
        account_name: formData.accountName,
        account_number: formData.accountNumber,
        swift_code: formData.swiftCode,
        vat_pin: formData.vatPin,
        kra_pin: formData.kraPin,
        credit_limit: formData.creditLimit,
        payment_terms: formData.paymentTerms,
        trade_ref1_company: formData.tradeRef1Company,
        trade_ref1_contact: formData.tradeRef1Contact,
        trade_ref1_phone: formData.tradeRef1Phone,
        trade_ref1_email: formData.tradeRef1Email,
        trade_ref2_company: formData.tradeRef2Company,
        trade_ref2_contact: formData.tradeRef2Contact,
        trade_ref2_phone: formData.tradeRef2Phone,
        trade_ref2_email: formData.tradeRef2Email,
        declaration_name: formData.declarationName,
        declaration_signature: formData.declarationSignature,
        declaration_date: formData.declarationDate,
        created_at: new Date().toISOString(),
      };

      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .insert([customerData])
        .select()
        .single();

      if (customerError) throw customerError;

      const documentUploads = Object.entries(files).map(async ([fieldName, file]) => {
        if (file) {
          const fileName = `customer/${customer.id}/${fieldName}/${Date.now()}-${file.name.replace(/ /g, '-')}`;
          console.log('Uploading file to path:', fileName);
          const { error: uploadError } = await supabase.storage
            .from('biogex-files')
            .upload(fileName, file);

          if (uploadError) {
            console.error('Upload error:', uploadError);
            throw uploadError;
          }

          const documentData = {
            title: `${fieldName} - ${file.name}`,
            file_url: fileName,
            entity_type: 'customer',
            entity_id: customer.id,
            entity_name: customer.full_name,
          };

          const { error: docError } = await supabase.from('documents').insert([documentData]);
          if (docError) {
            console.error('Document insert error:', docError);
            throw docError;
          }

          console.log('Document inserted successfully:', documentData);
        }
      });

      await Promise.all(documentUploads);

      setFormData({
        fullName: '',
        businessName: '',
        businessType: '',
        contactPerson: '',
        positionTitle: '',
        phoneNumber: '',
        emailAddress: '',
        altPhoneNumber: '',
        streetAddress: '',
        city: '',
        county: '',
        postalCode: '',
        country: '',
        natureOfPremises: '',
        areaLocality: '',
        nearestLandmark: '',
        gpsCoordinates: '',
        bankName: '',
        branchName: '',
        accountName: '',
        accountNumber: '',
        swiftCode: '',
        vatPin: '',
        kraPin: '',
        creditLimit: '',
        paymentTerms: '',
        tradeRef1Company: '',
        tradeRef1Contact: '',
        tradeRef1Phone: '',
        tradeRef1Email: '',
        tradeRef2Company: '',
        tradeRef2Contact: '',
        tradeRef2Phone: '',
        tradeRef2Email: '',
        declarationName: '',
        declarationSignature: '',
        declarationDate: '',
      });
      setFiles({
        kraPinCertificate: null,
        vatCertificate: null,
        businessRegCertificate: null,
        idPassport: null,
      });

      setSubmitting(false);
      setSuccess('The details have been submitted to Biogex admin');
      setTimeout(() => {
        navigate('/hr-management/customer-list');
      }, 1500);
    } catch (err) {
      setSubmitting(false);
      setError('Error submitting form: ' + err.message);
      console.error(err);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <>
      <style>{customStyles}</style>
      <div className="form-container">
        <div className="form-card">
          <div className="form-header text-center">
            <h2 className="form-header-title">BIOGEX PHARMA LIMITED</h2>
            <h4 className="form-header-subtitle">Customer Account Form</h4>
          </div>
          <div className="form-instruction">
            Please fill all the required information, attach the required documents, and click submit to complete your registration.
          </div>
          {error && <div className="form-error">{error}</div>}
          {submitting && (
            <div className="form-submitting">
              <div className="spinner"></div>
              Submitting...
            </div>
          )}
          {success && <div className="form-success">{success}</div>}
          <div className="form-body">
            <Form onSubmit={handleSubmit}>
              <h5 className="form-section-title">Section 1: Customer Details</h5>
              <hr style={{ borderColor: '#28a745' }} />

              <h6 className="form-subsection-title">1. Contact Information</h6>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">Full Legal Name (Contact Person)</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="As per official documents"
                    required
                    disabled={submitting}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">Business/Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder="Enter Business Name"
                    required
                    disabled={submitting}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">Business Type</Form.Label>
                  <Form.Select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    required
                    disabled={submitting}
                  >
                    <option value="">Select Business Type</option>
                    <option value="Sole Proprietorship">Sole Proprietorship</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Limited Company">Limited Company</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">Contact Person</Form.Label>
                  <Form.Control
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    placeholder="Enter Contact Person Name"
                    required
                    disabled={submitting}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">Position/Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="positionTitle"
                    value={formData.positionTitle}
                    onChange={handleInputChange}
                    placeholder="e.g., Manager, Director"
                    required
                    disabled={submitting}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="+254 123 456 789"
                    required
                    disabled={submitting}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    placeholder="example@domain.com"
                    required
                    disabled={submitting}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">Alternative Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="altPhoneNumber"
                    value={formData.altPhoneNumber}
                    onChange={handleInputChange}
                    placeholder="+254 987 654 321"
                    disabled={submitting}
                  />
                </Col>
              </Row>

              <h6 className="form-subsection-title">2. Address Details</h6>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">Street Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    placeholder="Enter Street Address"
                    required
                    disabled={submitting}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter City"
                    required
                    disabled={submitting}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">County</Form.Label>
                  <Form.Control
                    type="text"
                    name="county"
                    value={formData.county}
                    onChange={handleInputChange}
                    placeholder="Enter County"
                    disabled={submitting}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">Postal Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="Enter Postal Code"
                    disabled={submitting}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Enter Country"
                    required
                    disabled={submitting}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">Nature of Premises</Form.Label>
                  <Form.Control
                    type="text"
                    name="natureOfPremises"
                    value={formData.natureOfPremises}
                    onChange={handleInputChange}
                    placeholder="e.g., Office, Warehouse"
                    required
                    disabled={submitting}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">Area/Locality</Form.Label>
                  <Form.Control
                    type="text"
                    name="areaLocality"
                    value={formData.areaLocality}
                    onChange={handleInputChange}
                    placeholder="Enter Area/Locality"
                    disabled={submitting}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">Nearest Landmark</Form.Label>
                  <Form.Control
                    type="text"
                    name="nearestLandmark"
                    value={formData.nearestLandmark}
                    onChange={handleInputChange}
                    placeholder="Enter Nearest Landmark"
                    disabled={submitting}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">GPS Coordinates (Optional)</Form.Label>
                  <Form.Control
                    type="text"
                    name="gpsCoordinates"
                    value={formData.gpsCoordinates}
                    onChange={handleInputChange}
                    placeholder="e.g., -1.2921, 36.8219"
                    disabled={submitting}
                  />
                </Col>
              </Row>

              <h5 className="form-section-title">Section 2: Financial Information</h5>
              <hr style={{ borderColor: '#28a745' }} />

              <h6 className="form-subsection-title">1. Banking Details</h6>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">Bank Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    placeholder="Enter Bank Name"
                    required
                    disabled={submitting}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">Branch Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="branchName"
                    value={formData.branchName}
                    onChange={handleInputChange}
                    placeholder="Enter Branch Name"
                    disabled={submitting}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">Account Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="accountName"
                    value={formData.accountName}
                    onChange={handleInputChange}
                    placeholder="Enter Account Name"
                    required
                    disabled={submitting}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">Account Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    placeholder="Enter Account Number"
                    required
                    disabled={submitting}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">SWIFT Code (Optional)</Form.Label>
                  <Form.Control
                    type="text"
                    name="swiftCode"
                    value={formData.swiftCode}
                    onChange={handleInputChange}
                    placeholder="Enter SWIFT Code"
                    disabled={submitting}
                  />
                </Col>
              </Row>

              <h6 className="form-subsection-title">2. Tax Details</h6>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">VAT PIN (If applicable)</Form.Label>
                  <Form.Control
                    type="text"
                    name="vatPin"
                    value={formData.vatPin}
                    onChange={handleInputChange}
                    placeholder="Enter VAT PIN"
                    disabled={submitting}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">KRA PIN</Form.Label>
                  <Form.Control
                    type="text"
                    name="kraPin"
                    value={formData.kraPin}
                    onChange={handleInputChange}
                    placeholder="Enter KRA PIN"
                    required
                    disabled={submitting}
                  />
                </Col>
              </Row>

              <h6 className="form-subsection-title">3. Credit Details</h6>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">Credit Limit Requested</Form.Label>
                  <Form.Control
                    type="text"
                    name="creditLimit"
                    value={formData.creditLimit}
                    onChange={handleInputChange}
                    placeholder="Enter Credit Limit"
                    disabled={submitting}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">Payment Terms</Form.Label>
                  <Form.Select
                    name="paymentTerms"
                    value={formData.paymentTerms}
                    onChange={handleInputChange}
                    disabled={submitting}
                  >
                    <option value="">Select Payment Terms</option>
                    <option value="Cash on Delivery">Cash on Delivery</option>
                    <option value="Net 30">Net 30 Days</option>
                    <option value="Net 60">Net 60 Days</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Col>
              </Row>

              <h5 className="form-section-title">Section 3: Trade References</h5>
              <hr style={{ borderColor: '#28a745' }} />

              <h6 className="form-subsection-title">Trade Reference 1</h6>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="tradeRef1Company"
                    value={formData.tradeRef1Company}
                    onChange={handleInputChange}
                    placeholder="Enter Company Name"
                    disabled={submitting}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">Contact Person</Form.Label>
                  <Form.Control
                    type="text"
                    name="tradeRef1Contact"
                    value={formData.tradeRef1Contact}
                    onChange={handleInputChange}
                    placeholder="Enter Contact Person"
                    disabled={submitting}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="tradeRef1Phone"
                    value={formData.tradeRef1Phone}
                    onChange={handleInputChange}
                    placeholder="+254 123 456 789"
                    disabled={submitting}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="tradeRef1Email"
                    value={formData.tradeRef1Email}
                    onChange={handleInputChange}
                    placeholder="example@domain.com"
                    disabled={submitting}
                  />
                </Col>
              </Row>

              <h6 className="form-subsection-title">Trade Reference 2</h6>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="tradeRef2Company"
                    value={formData.tradeRef2Company}
                    onChange={handleInputChange}
                    placeholder="Enter Company Name"
                    disabled={submitting}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">Contact Person</Form.Label>
                  <Form.Control
                    type="text"
                    name="tradeRef2Contact"
                    value={formData.tradeRef2Contact}
                    onChange={handleInputChange}
                    placeholder="Enter Contact Person"
                    disabled={submitting}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="tradeRef2Phone"
                    value={formData.tradeRef2Phone}
                    onChange={handleInputChange}
                    placeholder="+254 123 456 789"
                    disabled={submitting}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="tradeRef2Email"
                    value={formData.tradeRef2Email}
                    onChange={handleInputChange}
                    placeholder="example@domain.com"
                    disabled={submitting}
                  />
                </Col>
              </Row>

              <h5 className="form-section-title">Section 4: Declaration</h5>
              <hr style={{ borderColor: '#28a745' }} />
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="declarationName"
                    value={formData.declarationName}
                    onChange={handleInputChange}
                    placeholder="Enter Your Name"
                    required
                    disabled={submitting}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">Signature</Form.Label>
                  <Form.Control
                    type="text"
                    name="declarationSignature"
                    value={formData.declarationSignature}
                    onChange={handleInputChange}
                    placeholder="Type your name as a signature"
                    disabled={submitting}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="declarationDate"
                    value={formData.declarationDate}
                    onChange={handleInputChange}
                    required
                    disabled={submitting}
                  />
                </Col>
              </Row>

              <h5 className="form-section-title">Section 5: Document Uploads</h5>
              <hr style={{ borderColor: '#28a745' }} />
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">Copy of KRA PIN Certificate</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => handleFileChange(e, 'kraPinCertificate')}
                    disabled={submitting}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">Copy of VAT Certificate (If applicable)</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => handleFileChange(e, 'vatCertificate')}
                    disabled={submitting}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">Copy of Business Registration Certificate</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => handleFileChange(e, 'businessRegCertificate')}
                    disabled={submitting}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label className="form-label">Copy of ID/Passport of Contact Person</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => handleFileChange(e, 'idPassport')}
                    disabled={submitting}
                  />
                </Col>
              </Row>

              <div className="form-footer text-center d-flex justify-content-center gap-3">
                <Button
                  type="submit"
                  variant="light"
                  className="form-button submit"
                  disabled={submitting}
                >
                  Submit Form
                </Button>
                <Button
                  variant="danger"
                  onClick={handleCancel}
                  className="form-button cancel"
                  disabled={submitting}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerAccountForm;