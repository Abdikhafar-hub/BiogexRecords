import React, { useState } from 'react';

const CustomerAccountForm = () => {
  const [files, setFiles] = useState({});

  // Handle file input changes
  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    setFiles((prevFiles) => ({ ...prevFiles, [fieldName]: file }));
  };

  return (
    <div className="container my-5">
      <div className="card shadow" style={{ border: '2px solid #28a745', backgroundColor: '#fff' }}>
        <div className="card-header text-center" style={{ backgroundColor: '#28a745', color: '#fff' }}>
          <h2>BIOGEX PHARMA LIMITED</h2>
          <h4>Customer Account Form</h4>
        </div>
        <div className="card-body" style={{ backgroundColor: '#f8f9fa', color: '#000' }}>
          {/* Section 1: Customer Details */}
          <h5 className="mt-4" style={{ color: '#28a745' }}>Section 1: Customer Details</h5>
          <hr style={{ borderColor: '#28a745' }} />
          <h6>1. Contact Information</h6>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Full Name</label>
              <input type="text" className="form-control" placeholder="Enter Full Name" />
            </div>
            <div className="col-md-6 mb-3">
              <label>Business/Company Name</label>
              <input type="text" className="form-control" placeholder="Enter Business Name" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Business Type</label>
              <input type="text" className="form-control" placeholder="e.g., Retail, Wholesale" />
            </div>
            <div className="col-md-6 mb-3">
              <label>Contact Person</label>
              <input type="text" className="form-control" placeholder="Enter Contact Person" />
            </div>
          </div>
          <div className="mb-3">
            <label>Position/Title</label>
            <input type="text" className="form-control" placeholder="Enter Position/Title" />
          </div>

          <h6>2. Contact Information/Superintendent’s/Branch Manager</h6>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label>Phone Number</label>
              <input type="text" className="form-control" placeholder="Enter Phone Number" />
            </div>
            <div className="col-md-4 mb-3">
              <label>Email Address</label>
              <input type="email" className="form-control" placeholder="Enter Email" />
            </div>
            <div className="col-md-4 mb-3">
              <label>Alternative Phone Number</label>
              <input type="text" className="form-control" placeholder="Enter Alternative Phone" />
            </div>
          </div>

          {/* Section 2: Premise Details */}
          <h5 className="mt-4" style={{ color: '#28a745' }}>Section 2: Premise Details</h5>
          <hr style={{ borderColor: '#28a745' }} />
          <h6>1. Physical Address</h6>
          <div className="mb-3">
            <label>Street Address</label>
            <input type="text" className="form-control" placeholder="Enter Street Address" />
          </div>
          <div className="row">
            <div className="col-md-3 mb-3">
              <label>City/Town</label>
              <input type="text" className="form-control" placeholder="Enter City/Town" />
            </div>
            <div className="col-md-3 mb-3">
              <label>County</label>
              <input type="text" className="form-control" placeholder="Enter County" />
            </div>
            <div className="col-md-3 mb-3">
              <label>Postal Code</label>
              <input type="text" className="form-control" placeholder="Enter Postal Code" />
            </div>
            <div className="col-md-3 mb-3">
              <label>Country</label>
              <input type="text" className="form-control" placeholder="Enter Country" />
            </div>
          </div>

          <h6>2. Business Premise</h6>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label>Nature of Premises</label>
              <input type="text" className="form-control" placeholder="e.g., Retail, Wholesale" />
            </div>
            <div className="col-md-4 mb-3">
              <label>Area/Locality</label>
              <input type="text" className="form-control" placeholder="Enter Area/Locality" />
            </div>
            <div className="col-md-4 mb-3">
              <label>Nearest Landmark</label>
              <input type="text" className="form-control" placeholder="Enter Nearest Landmark" />
            </div>
          </div>
          <div className="mb-3">
            <label>GPS Coordinates (if available)</label>
            <input type="text" className="form-control" placeholder="Enter GPS Coordinates" />
          </div>

          {/* Section 3: Account Information */}
          <h5 className="mt-4" style={{ color: '#28a745' }}>Section 3: Account Information</h5>
          <hr style={{ borderColor: '#28a745' }} />
          <h6>1. Bank Details</h6>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Bank Name</label>
              <input type="text" className="form-control" placeholder="Enter Bank Name" />
            </div>
            <div className="col-md-6 mb-3">
              <label>Branch Name</label>
              <input type="text" className="form-control" placeholder="Enter Branch Name" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label>Account Name</label>
              <input type="text" className="form-control" placeholder="Enter Account Name" />
            </div>
            <div className="col-md-4 mb-3">
              <label>Account Number</label>
              <input type="text" className="form-control" placeholder="Enter Account Number" />
            </div>
            <div className="col-md-4 mb-3">
              <label>Swift Code</label>
              <input type="text" className="form-control" placeholder="Enter Swift Code" />
            </div>
          </div>

          <h6>2. VAT and Tax Information</h6>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>VAT PIN</label>
              <input type="text" className="form-control" placeholder="Enter VAT PIN" />
            </div>
            <div className="col-md-6 mb-3">
              <label>KRA PIN</label>
              <input type="text" className="form-control" placeholder="Enter KRA PIN" />
            </div>
          </div>

          <h6>3. Credit Terms (After 6 months of Cash Transaction)</h6>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Requested Credit Limit</label>
              <input type="text" className="form-control" placeholder="Enter Credit Limit" />
            </div>
            <div className="col-md-6 mb-3">
              <label>Preferred Payment Terms</label>
              <input type="text" className="form-control" placeholder="e.g., 30 days, 60 days" />
            </div>
          </div>

          <h6>4. Trade References (Provide at least two)</h6>
          <div className="mb-3">
            <label>Reference 1</label>
            <input type="text" className="form-control mb-2" placeholder="Company Name" />
            <input type="text" className="form-control mb-2" placeholder="Contact Person" />
            <input type="text" className="form-control mb-2" placeholder="Phone Number" />
            <input type="email" className="form-control mb-2" placeholder="Email Address" />
            <label>Recommendation Letter</label>
            <input
              type="file"
              className="form-control"
              accept=".pdf,.jpg,.png"
              onChange={(e) => handleFileChange(e, 'ref1_letter')}
            />
            {files.ref1_letter && <p className="mt-2">Uploaded: {files.ref1_letter.name}</p>}
          </div>
          <div className="mb-3">
            <label>Reference 2</label>
            <input type="text" className="form-control mb-2" placeholder="Company Name" />
            <input type="text" className="form-control mb-2" placeholder="Contact Person" />
            <input type="text" className="form-control mb-2" placeholder="Phone Number" />
            <input type="email" className="form-control mb-2" placeholder="Email Address" />
            <label>Recommendation Letter</label>
            <input
              type="file"
              className="form-control"
              accept=".pdf,.jpg,.png"
              onChange={(e) => handleFileChange(e, 'ref2_letter')}
            />
            {files.ref2_letter && <p className="mt-2">Uploaded: {files.ref2_letter.name}</p>}
          </div>

          {/* Section 4: Additional Documents */}
          <h5 className="mt-4" style={{ color: '#28a745' }}>Section 4: Additional Documents</h5>
          <hr style={{ borderColor: '#28a745' }} />
          <div className="mb-3">
            <label>CR12</label>
            <input
              type="file"
              className="form-control"
              accept=".pdf,.jpg,.png"
              onChange={(e) => handleFileChange(e, 'cr12')}
            />
            {files.cr12 && <p className="mt-2">Uploaded: {files.cr12.name}</p>}
          </div>
          <div className="mb-3">
            <label>KRA of Company</label>
            <input
              type="file"
              className="form-control"
              accept=".pdf,.jpg,.png"
              onChange={(e) => handleFileChange(e, 'kra_company')}
            />
            {files.kra_company && <p className="mt-2">Uploaded: {files.kra_company.name}</p>}
          </div>
          <div className="mb-3">
            <label>ID/Passport of Directors</label>
            <input
              type="file"
              className="form-control"
              accept=".pdf,.jpg,.png"
              multiple
              onChange={(e) => handleFileChange(e, 'directors_id')}
            />
            {files.directors_id && <p className="mt-2">Uploaded: {files.directors_id.name}</p>}
          </div>
          <div className="mb-3">
            <label>KRA of Directors</label>
            <input
              type="file"
              className="form-control"
              accept=".pdf,.jpg,.png"
              multiple
              onChange={(e) => handleFileChange(e, 'kra_directors')}
            />
            {files.kra_directors && <p className="mt-2">Uploaded: {files.kra_directors.name}</p>}
          </div>
          <div className="mb-3">
            <label>Certificate of Incorporation</label>
            <input
              type="file"
              className="form-control"
              accept=".pdf,.jpg,.png"
              onChange={(e) => handleFileChange(e, 'certificate_incorporation')}
            />
            {files.certificate_incorporation && (
              <p className="mt-2">Uploaded: {files.certificate_incorporation.name}</p>
            )}
          </div>
          <div className="mb-3">
            <label>2 References IDs</label>
            <input
              type="file"
              className="form-control mb-2"
              accept=".pdf,.jpg,.png"
              multiple
              onChange={(e) => handleFileChange(e, 'ref_ids_1')}
            />
            {files.ref_ids_1 && <p className="mt-2">Uploaded: {files.ref_ids_1.name}</p>}
            <input
              type="file"
              className="form-control"
              accept=".pdf,.jpg,.png"
              multiple
              onChange={(e) => handleFileChange(e, 'ref_ids_2')}
            />
            {files.ref_ids_2 && <p className="mt-2">Uploaded: {files.ref_ids_2.name}</p>}
          </div>

          {/* Section 5: Declaration */}
          <h5 className="mt-4" style={{ color: '#28a745' }}>Section 5: Declaration</h5>
          <hr style={{ borderColor: '#28a745' }} />
          <p>
            I hereby declare that the information provided above is true and accurate to the best of my knowledge. I
            understand that providing false information may result in the termination of services and/or legal action.
          </p>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label>Name</label>
              <input type="text" className="form-control" placeholder="Enter Name" />
            </div>
            <div className="col-md-4 mb-3">
              <label>Signature</label>
              <input type="text" className="form-control" placeholder="Enter Signature" />
            </div>
            <div className="col-md-4 mb-3">
              <label>Date</label>
              <input type="date" className="form-control" />
            </div>
          </div>
        </div>
        <div className="card-footer text-center" style={{ backgroundColor: '#28a745', color: '#fff' }}>
          <button className="btn btn-light">Submit Form</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerAccountForm;