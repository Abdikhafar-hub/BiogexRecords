import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Form, Button } from 'react-bootstrap';

const CustomerAccountForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [files, setFiles] = useState({});
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

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input changes
  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    setFiles((prevFiles) => ({ ...prevFiles, [fieldName]: file }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataWithFiles = { ...formData, files };
    console.log('Submitted Customer Data:', formDataWithFiles);
    // Reset form (optional)
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
    setFiles({});
  };

  // Handle cancel button click
  const handleCancel = () => {
    navigate('/dashboard'); // Navigate to dashboard
  };

  return (
    <div className="container my-5">
      <div className="card shadow" style={{ border: '2px solid #28a745', backgroundColor: '#fff' }}>
        <div className="card-header text-center" style={{ backgroundColor: '#28a745', color: '#fff' }}>
          <h2>BIOGEX PHARMA LIMITED</h2>
          <h4>Customer Account Form</h4>
        </div>
        <div className="card-body" style={{ backgroundColor: '#f8f9fa', color: '#000' }}>
          <Form onSubmit={handleSubmit}>
            {/* Section 1: Customer Details */}
            <h5 className="mt-4" style={{ color: '#28a745' }}>Section 1: Customer Details</h5>
            <hr style={{ borderColor: '#28a745' }} />
            <h6>1. Contact Information</h6>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Full Legal Name (Contact Person)</label>
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
                <label>Business/Company Name</label>
                <Form.Control
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder="Enter Business Name"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Business Type</label>
                <Form.Control
                  type="text"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  placeholder="e.g., Retail, Wholesale"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Contact Person</label>
                <Form.Control
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  placeholder="Enter Contact Person"
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label>Position/Title</label>
              <Form.Control
                type="text"
                name="positionTitle"
                value={formData.positionTitle}
                onChange={handleInputChange}
                placeholder="Enter Position/Title"
                required
              />
            </div>

            <h6>2. Contact Information (Superintendent/Branch Manager)</h6>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label>Phone Number</label>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Include country code"
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label>Email Address</label>
                <Form.Control
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                  placeholder="Personal or business email"
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label>Alternative Phone Number</label>
                <Form.Control
                  type="text"
                  name="altPhoneNumber"
                  value={formData.altPhoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter Alternative Phone"
                />
              </div>
            </div>

            {/* Section 2: Personal Information (Contact Person) */}
            <h5 className="mt-4" style={{ color: '#28a745' }}>Section 2: Personal Information (Contact Person)</h5>
            <hr style={{ borderColor: '#28a745' }} />
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Date of Birth</label>
                <Form.Control
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>National ID / Passport Number</label>
                <Form.Control
                  type="text"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleInputChange}
                  placeholder="Include issuing country"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label>Tax Identification Number (TIN/KRA PIN)</label>
                <Form.Control
                  type="text"
                  name="taxId"
                  value={formData.taxId}
                  onChange={handleInputChange}
                  placeholder="Enter TIN or KRA PIN"
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
                />
              </div>
              <div className="col-md-4 mb-3">
                <label>Nationality</label>
                <Form.Control
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  placeholder="Include work permit if applicable"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Gender</label>
                <Form.Select name="gender" value={formData.gender} onChange={handleInputChange}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </div>
              <div className="col-md-6 mb-3">
                <label>Marital Status</label>
                <Form.Select name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange}>
                  <option value="">Select Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </Form.Select>
              </div>
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

            {/* Section 3: Premise Details */}
            <h5 className="mt-4" style={{ color: '#28a745' }}>Section 3: Premise Details</h5>
            <hr style={{ borderColor: '#28a745' }} />
            <h6>1. Physical Address</h6>
            <div className="mb-3">
              <label>Street Address</label>
              <Form.Control
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                placeholder="Enter Street Address"
                required
              />
            </div>
            <div className="row">
              <div className="col-md-3 mb-3">
                <label>City/Town</label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter City/Town"
                  required
                />
              </div>
              <div className="col-md-3 mb-3">
                <label>County</label>
                <Form.Control
                  type="text"
                  name="county"
                  value={formData.county}
                  onChange={handleInputChange}
                  placeholder="Enter County"
                />
              </div>
              <div className="col-md-3 mb-3">
                <label>Postal Code</label>
                <Form.Control
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  placeholder="Enter Postal Code"
                />
              </div>
              <div className="col-md-3 mb-3">
                <label>Country</label>
                <Form.Control
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Enter Country"
                  required
                />
              </div>
            </div>

            <h6>2. Business Premise</h6>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label>Nature of Premises</label>
                <Form.Control
                  type="text"
                  name="natureOfPremises"
                  value={formData.natureOfPremises}
                  onChange={handleInputChange}
                  placeholder="e.g., Retail, Wholesale"
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label>Area/Locality</label>
                <Form.Control
                  type="text"
                  name="areaLocality"
                  value={formData.areaLocality}
                  onChange={handleInputChange}
                  placeholder="Enter Area/Locality"
                />
              </div>
              <div className="col-md-4 mb-3">
                <label>Nearest Landmark</label>
                <Form.Control
                  type="text"
                  name="nearestLandmark"
                  value={formData.nearestLandmark}
                  onChange={handleInputChange}
                  placeholder="Enter Nearest Landmark"
                />
              </div>
            </div>
            <div className="mb-3">
              <label>GPS Coordinates (if available)</label>
              <Form.Control
                type="text"
                name="gpsCoordinates"
                value={formData.gpsCoordinates}
                onChange={handleInputChange}
                placeholder="Enter GPS Coordinates"
              />
            </div>

            {/* Section 4: Account Information */}
            <h5 className="mt-4" style={{ color: '#28a745' }}>Section 4: Account Information</h5>
            <hr style={{ borderColor: '#28a745' }} />
            <h6>1. Bank Details</h6>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Bank Name</label>
                <Form.Control
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  placeholder="Enter Bank Name"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Branch Name</label>
                <Form.Control
                  type="text"
                  name="branchName"
                  value={formData.branchName}
                  onChange={handleInputChange}
                  placeholder="Enter Branch Name"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label>Account Name</label>
                <Form.Control
                  type="text"
                  name="accountName"
                  value={formData.accountName}
                  onChange={handleInputChange}
                  placeholder="Enter Account Name"
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label>Account Number</label>
                <Form.Control
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  placeholder="Enter Account Number"
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label>Swift Code</label>
                <Form.Control
                  type="text"
                  name="swiftCode"
                  value={formData.swiftCode}
                  onChange={handleInputChange}
                  placeholder="Enter Swift Code"
                />
              </div>
            </div>

            <h6>2. VAT and Tax Information</h6>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>VAT PIN</label>
                <Form.Control
                  type="text"
                  name="vatPin"
                  value={formData.vatPin}
                  onChange={handleInputChange}
                  placeholder="Enter VAT PIN"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>KRA PIN</label>
                <Form.Control
                  type="text"
                  name="kraPin"
                  value={formData.kraPin}
                  onChange={handleInputChange}
                  placeholder="Enter KRA PIN"
                  required
                />
              </div>
            </div>

            <h6>3. Credit Terms (After 6 months of Cash Transaction)</h6>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Requested Credit Limit</label>
                <Form.Control
                  type="text"
                  name="creditLimit"
                  value={formData.creditLimit}
                  onChange={handleInputChange}
                  placeholder="Enter Credit Limit"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Preferred Payment Terms</label>
                <Form.Control
                  type="text"
                  name="paymentTerms"
                  value={formData.paymentTerms}
                  onChange={handleInputChange}
                  placeholder="e.g., 30 days, 60 days"
                />
              </div>
            </div>

            <h6>4. Trade References (Provide at least two)</h6>
            <div className="mb-3">
              <label>Reference 1</label>
              <Form.Control
                type="text"
                name="tradeRef1Company"
                value={formData.tradeRef1Company}
                onChange={handleInputChange}
                placeholder="Company Name"
                className="mb-2"
              />
              <Form.Control
                type="text"
                name="tradeRef1Contact"
                value={formData.tradeRef1Contact}
                onChange={handleInputChange}
                placeholder="Contact Person"
                className="mb-2"
              />
              <Form.Control
                type="text"
                name="tradeRef1Phone"
                value={formData.tradeRef1Phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="mb-2"
              />
              <Form.Control
                type="email"
                name="tradeRef1Email"
                value={formData.tradeRef1Email}
                onChange={handleInputChange}
                placeholder="Email Address"
                className="mb-2"
              />
              <label>Recommendation Letter</label>
              <Form.Control
                type="file"
                accept=".pdf,.jpg,.png"
                onChange={(e) => handleFileChange(e, 'ref1_letter')}
              />
              {files.ref1_letter && <p className="mt-2">Uploaded: {files.ref1_letter.name}</p>}
            </div>
            <div className="mb-3">
              <label>Reference 2</label>
              <Form.Control
                type="text"
                name="tradeRef2Company"
                value={formData.tradeRef2Company}
                onChange={handleInputChange}
                placeholder="Company Name"
                className="mb-2"
              />
              <Form.Control
                type="text"
                name="tradeRef2Contact"
                value={formData.tradeRef2Contact}
                onChange={handleInputChange}
                placeholder="Contact Person"
                className="mb-2"
              />
              <Form.Control
                type="text"
                name="tradeRef2Phone"
                value={formData.tradeRef2Phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="mb-2"
              />
              <Form.Control
                type="email"
                name="tradeRef2Email"
                value={formData.tradeRef2Email}
                onChange={handleInputChange}
                placeholder="Email Address"
                className="mb-2"
              />
              <label>Recommendation Letter</label>
              <Form.Control
                type="file"
                accept=".pdf,.jpg,.png"
                onChange={(e) => handleFileChange(e, 'ref2_letter')}
              />
              {files.ref2_letter && <p className="mt-2">Uploaded: {files.ref2_letter.name}</p>}
            </div>

            {/* Section 5: Additional Documents */}
            <h5 className="mt-4" style={{ color: '#28a745' }}>Section 5: Additional Documents</h5>
            <hr style={{ borderColor: '#28a745' }} />
            <div className="mb-3">
              <label>CR12</label>
              <Form.Control
                type="file"
                accept=".pdf,.jpg,.png"
                onChange={(e) => handleFileChange(e, 'cr12')}
              />
              {files.cr12 && <p className="mt-2">Uploaded: {files.cr12.name}</p>}
            </div>
            <div className="mb-3">
              <label>KRA of Company</label>
              <Form.Control
                type="file"
                accept=".pdf,.jpg,.png"
                onChange={(e) => handleFileChange(e, 'kra_company')}
              />
              {files.kra_company && <p className="mt-2">Uploaded: {files.kra_company.name}</p>}
            </div>
            <div className="mb-3">
              <label>ID/Passport of Directors</label>
              <Form.Control
                type="file"
                accept=".pdf,.jpg,.png"
                multiple
                onChange={(e) => handleFileChange(e, 'directors_id')}
              />
              {files.directors_id && <p className="mt-2">Uploaded: {files.directors_id.name}</p>}
            </div>
            <div className="mb-3">
              <label>KRA of Directors</label>
              <Form.Control
                type="file"
                accept=".pdf,.jpg,.png"
                multiple
                onChange={(e) => handleFileChange(e, 'kra_directors')}
              />
              {files.kra_directors && <p className="mt-2">Uploaded: {files.kra_directors.name}</p>}
            </div>
            <div className="mb-3">
              <label>Certificate of Incorporation</label>
              <Form.Control
                type="file"
                accept=".pdf,.jpg,.png"
                onChange={(e) => handleFileChange(e, 'certificate_incorporation')}
              />
              {files.certificate_incorporation && (
                <p className="mt-2">Uploaded: {files.certificate_incorporation.name}</p>
              )}
            </div>
            <div className="mb-3">
              <label>2 References IDs</label>
              <Form.Control
                type="file"
                accept=".pdf,.jpg,.png"
                multiple
                onChange={(e) => handleFileChange(e, 'ref_ids_1')}
                className="mb-2"
              />
              {files.ref_ids_1 && <p className="mt-2">Uploaded: {files.ref_ids_1.name}</p>}
              <Form.Control
                type="file"
                accept=".pdf,.jpg,.png"
                multiple
                onChange={(e) => handleFileChange(e, 'ref_ids_2')}
              />
              {files.ref_ids_2 && <p className="mt-2">Uploaded: {files.ref_ids_2.name}</p>}
            </div>

            {/* Section 6: Declaration */}
            <h5 className="mt-4" style={{ color: '#28a745' }}>Section 6: Declaration</h5>
            <hr style={{ borderColor: '#28a745' }} />
            <p>
              I hereby declare that the information provided above is true and accurate to the best of my knowledge. I
              understand that providing false information may result in the termination of services and/or legal action.
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

            <div className="card-footer text-center d-flex justify-content-center gap-3" style={{ backgroundColor: '#28a745', color: '#fff' }}>
              <Button type="submit" variant="light">
                Submit Form
              </Button>
              <Button variant="danger" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CustomerAccountForm;