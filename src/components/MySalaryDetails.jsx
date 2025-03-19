import React, { useState, useEffect } from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import jsPDF from 'jspdf';

// Custom CSS for styling the details view, including the spinner
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

  .mysary-container {
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
    background: linear-gradient(135deg, #f8fafc 0%, #e6f0fa 100%);
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .mysary-card {
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

  .mysary-card:hover {
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.15), -10px -10px 20px rgba(255, 255, 255, 0.7);
  }

  .mysary-header {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    padding: 1rem;
  }

  .mysary-header-title {
    font-size: 1.75rem;
    font-weight: 700;
    letter-spacing: 1px;
  }

  .mysary-body {
    padding: 1rem;
    flex: 1;
    overflow-y: auto;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }

  .mysary-section-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #047857;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    position: relative;
    padding-bottom: 0.25rem;
  }

  .mysary-section-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    border-radius: 2px;
  }

  .mysary-info-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
  }

  .mysary-info-item {
    flex: 1 1 180px;
  }

  .mysary-info-label {
    font-weight: 600;
    color: #1f2937;
    font-size: 0.9rem;
  }

  .mysary-info-value {
    color: #4b5563;
    font-size: 0.9rem;
  }

  .mysary-table {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .mysary-table th {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    font-weight: 600;
  }

  .mysary-table td {
    color: #4b5563;
    vertical-align: middle;
  }

  .mysary-button {
    font-weight: 600;
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(4, 120, 87, 0.3);
  }

  .mysary-button.primary {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    color: #fff;
    border: none;
  }

  .mysary-button.primary:hover {
    background: linear-gradient(90deg, #28a745 0%, #047857 100%);
    box-shadow: 0 6px 16px rgba(4, 120, 87, 0.5);
    transform: translateY(-2px);
  }

  .mysary-button.secondary {
    background: transparent;
    color: #047857;
    border: 2px solid #047857;
  }

  .mysary-button.secondary:hover {
    background: rgba(4, 120, 87, 0.1);
    box-shadow: 0 6px 16px rgba(4, 120, 87, 0.3);
    transform: translateY(-2px);
  }

  .loading-container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #f8fafc 0%, #e6f0fa 100%);
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #047857;
    border-top: 4px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @media (max-width: 768px) {
    .mysary-card {
      max-width: 100%;
      max-height: calc(100vh - 1rem);
    }

    .mysary-body {
      padding: 0.75rem;
    }

    .mysary-section-title {
      font-size: 1.1rem;
    }

    .mysary-info-label, .mysary-info-value {
      font-size: 0.85rem;
    }

    .mysary-table th, .mysary-table td {
      font-size: 0.85rem;
    }

    .spinner {
      width: 30px;
      height: 30px;
      border: 3px solid #047857;
      border-top: 3px solid transparent;
    }
  }
`;

const MySalaryDetails = () => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        setLoading(true);

        // Fetch the specific employee based on employeeId
        const { data: employeeData, error: employeeError } = await supabase
          .from('employees')
          .select('*')
          .eq('id', employeeId)
          .single();
        if (employeeError) throw employeeError;

        if (!employeeData) {
          setError('Employee not found.');
          return;
        }

        setEmployee({
          fullName: employeeData.full_name,
          employeeCode: employeeData.employee_code,
          startDate: employeeData.date_of_joining,
          email: employeeData.email,
          phoneNumber: employeeData.phone_number,
          workLocation: employeeData.work_location,
          position: employeeData.position,
          department: employeeData.department,
          reportingManager: employeeData.reporting_manager,
          healthInsurance: employeeData.health_insurance,
          pensionPlan: employeeData.pension_plan,
          leaveEntitlements: employeeData.leave_entitlements,
          grossSalary: employeeData.gross_salary,
          deductions: employeeData.deductions,
        });

        // Fetch recent salary transactions from the remuneration table
        const { data: remunerationData, error: remunerationError } = await supabase
          .from('remuneration')
          .select('*')
          .eq('employee_id', employeeId)
          .order('created_at', { ascending: false })
          .limit(3);
        if (remunerationError) throw remunerationError;

        const transactions = remunerationData.map((rem) => {
          const salary = parseFloat(rem.gross_salary || 0);
          const deductions = parseFloat(rem.deductions || 0);
          const netSalary = salary - deductions;
          return {
            date: new Date(rem.created_at).toISOString().split('T')[0],
            grossSalary: salary.toFixed(2),
            deductions: deductions.toFixed(2),
            netSalary: netSalary.toFixed(2),
            status: 'Paid',
          };
        });
        setRecentTransactions(transactions);
      } catch (err) {
        setError('Failed to fetch employee data.');
        console.error('Error fetching employee data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [employeeId]);

  if (loading) return (
    <>
      <style>{customStyles}</style>
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    </>
  );
  if (error) return <p>{error}</p>;
  if (!employee) return <p>Employee not found.</p>;

  const salary = parseFloat(employee.grossSalary || 0);
  const deductions = parseFloat(employee.deductions || 0);
  const netSalary = salary - deductions;

  const handleDownloadPayslip = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    let yPosition = margin;

    // Helper function to add text and update yPosition
    const addText = (text, x, y, fontSize = 12, style = 'normal', align = 'left') => {
      doc.setFont('helvetica', style);
      doc.setFontSize(fontSize);
      doc.text(text, x, y, { align });
      return y + fontSize * 0.5; // Adjust yPosition for next line
    };

    // Helper function to draw a horizontal line
    const drawLine = (y, thickness = 0.5, color = [4, 120, 87]) => {
      doc.setLineWidth(thickness);
      doc.setDrawColor(...color); // Green color (#047857)
      doc.line(margin + 2, y, pageWidth - margin - 2, y);
      return y + 2; // Adjust yPosition
    };

    // Header Section
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(4, 120, 87); // Green color
    yPosition = addText('Payslip', margin + 5, yPosition);
    doc.setTextColor(0, 0, 0); // Reset to black
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    yPosition = addText(`PS-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}`, margin + 5, yPosition);
    yPosition = addText(`Pay Date: ${new Date().toLocaleDateString()}`, margin + 5, yPosition);
    yPosition = addText(`Pay Period: ${new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}`, margin + 5, yPosition);

    // Company Details (right side)
    const companyX = pageWidth - margin - 60; // Adjust for right alignment
    yPosition = margin; // Reset yPosition for company details
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    yPosition = addText('BIOGEX PHARMA', companyX, yPosition);
    doc.setFont('helvetica', 'normal');
    yPosition = addText('OFFICE 7, THE CLOSE', companyX, yPosition);
    yPosition = addText('NGARA ROAD, NAIROBI', companyX, yPosition);
    yPosition = addText('KENYA', companyX, yPosition);
    yPosition = addText('info@biogex.co.ke', companyX, yPosition);
    yPosition = addText('www.biogex.co.ke', companyX, yPosition);

    // Logo Placeholder (top right)
    // const logoBase64 = 'data:image/png;base64,...'; // Replace with actual base64 string
    // doc.addImage(logoBase64, 'PNG', pageWidth - margin - 30, margin, 30, 30); // Top right, 30x30 mm
    yPosition += 35; // Space for logo

    // Employee and Company Details
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(4, 120, 87);
    yPosition = addText('Employee', margin + 5, yPosition);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    yPosition = addText(`${employee.fullName}`, margin + 5, yPosition);
    yPosition = addText(`Employee ID: ${employee.employeeCode || 'N/A'}`, margin + 5, yPosition);
    yPosition = addText(`Email: ${employee.email}`, margin + 5, yPosition);
    yPosition = addText(`Position: ${employee.position}`, margin + 5, yPosition);
    yPosition = addText(`Tax Code: N/A`, margin + 5, yPosition); // Placeholder
    yPosition = addText(`National Insurance Number: N/A`, margin + 5, yPosition); // Placeholder

    // Company Details (already added in the header on the right)
    yPosition += 5;

    // Payment Details
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(4, 120, 87);
    yPosition = addText('Payment Details', margin + 5, yPosition);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    yPosition = addText('Bank Transfer', margin + 5, yPosition);
    yPosition = drawLine(yPosition);

    // Earnings and Deductions Table
    const headers = ['Earnings', 'Quantity', 'Rate', 'Amount'];
    const columnWidths = [60, 30, 40, 40];
    let currentX = margin + 5;

    // Draw table headers (Earnings)
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    headers.forEach((header, index) => {
      doc.setFillColor(4, 120, 87); // Green background
      doc.rect(currentX, yPosition - 5, columnWidths[index], 10, 'F');
      doc.setTextColor(255, 255, 255); // White text
      doc.text(header, currentX + 2, yPosition);
      currentX += columnWidths[index];
    });
    doc.setTextColor(0, 0, 0); // Reset to black
    yPosition += 10;

    // Earnings Row (Basic Salary)
    currentX = margin + 5;
    const earningsData = [
      ['Basic Salary', '1', salary.toFixed(2), salary.toFixed(2)],
    ];
    earningsData.forEach((row) => {
      row.forEach((data, colIndex) => {
        doc.setFillColor(245, 245, 245); // Light gray background
        doc.rect(currentX, yPosition - 5, columnWidths[colIndex], 10, 'F');
        doc.setLineWidth(0.2);
        doc.setDrawColor(200, 200, 200);
        doc.rect(currentX, yPosition - 5, columnWidths[colIndex], 10);
        doc.text(data, currentX + 2, yPosition);
        currentX += columnWidths[colIndex];
      });
      yPosition += 10;
    });

    yPosition += 2; // Space before Deductions

    // Deductions Table
    currentX = margin + 5;
    doc.setFont('helvetica', 'bold');
    headers[0] = 'Deductions';
    headers.forEach((header, index) => {
      doc.setFillColor(4, 120, 87); // Green background
      doc.rect(currentX, yPosition - 5, columnWidths[index], 10, 'F');
      doc.setTextColor(255, 255, 255); // White text
      doc.text(header, currentX + 2, yPosition);
      currentX += columnWidths[index];
    });
    doc.setTextColor(0, 0, 0); // Reset to black
    yPosition += 10;

    // Deductions Row (Overall Deductions)
    const deductionsData = [
      ['Deductions', '1', deductions.toFixed(2), deductions.toFixed(2)],
    ];
    deductionsData.forEach((row) => {
      currentX = margin + 5;
      row.forEach((data, colIndex) => {
        doc.setFillColor(245, 245, 245); // Light gray background
        doc.rect(currentX, yPosition - 5, columnWidths[colIndex], 10, 'F');
        doc.setLineWidth(0.2);
        doc.setDrawColor(200, 200, 200);
        doc.rect(currentX, yPosition - 5, columnWidths[colIndex], 10);
        doc.text(data, currentX + 2, yPosition);
        currentX += columnWidths[colIndex];
      });
      yPosition += 10;
    });

    // Total Pay
    yPosition += 5;
    doc.setFont('helvetica', 'bold');
    currentX = margin + 5 + columnWidths[0] + columnWidths[1] + columnWidths[2];
    doc.text('Total Pay', currentX, yPosition);
    doc.text(netSalary.toFixed(2), currentX + columnWidths[3] - 10, yPosition, { align: 'right' });
    yPosition += 15;

    // Note
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('Note: This document is automatically generated and does not require a signature.', margin + 5, pageHeight - margin - 5);

    // Download the PDF
    doc.save(`Payslip_${employee.fullName}_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <>
      <style>{customStyles}</style>
      <div className="mysary-container">
        <Card className="mysary-card">
          <Card.Header className="mysary-header text-center">
            <h2 className="mysary-header-title">Salary Details - {employee.fullName}</h2>
          </Card.Header>
          <Card.Body className="mysary-body">
            <h5 className="mysary-section-title">Personal Information</h5>
            <div className="mysary-info-row">
              <div className="mysary-info-item">
                <p className="mysary-info-label">Full Name:</p>
                <p className="mysary-info-value">{employee.fullName}</p>
              </div>
              <div className="mysary-info-item">
                <p className="mysary-info-label">Employee Code:</p>
                <p className="mysary-info-value">{employee.employeeCode || 'N/A'}</p>
              </div>
              <div className="mysary-info-item">
                <p className="mysary-info-label">Start Date:</p>
                <p className="mysary-info-value">{employee.startDate || 'N/A'}</p>
              </div>
            </div>
            <div className="mysary-info-row">
              <div className="mysary-info-item">
                <p className="mysary-info-label">Email:</p>
                <p className="mysary-info-value">{employee.email}</p>
              </div>
              <div className="mysary-info-item">
                <p className="mysary-info-label">Phone Number:</p>
                <p className="mysary-info-value">{employee.phoneNumber}</p>
              </div>
              <div className="mysary-info-item">
                <p className="mysary-info-label">Work Location:</p>
                <p className="mysary-info-value">{employee.workLocation || 'N/A'}</p>
              </div>
            </div>
            <div className="mysary-info-row">
              <div className="mysary-info-item">
                <p className="mysary-info-label">Position:</p>
                <p className="mysary-info-value">{employee.position}</p>
              </div>
              <div className="mysary-info-item">
                <p className="mysary-info-label">Department:</p>
                <p className="mysary-info-value">{employee.department}</p>
              </div>
              <div className="mysary-info-item">
                <p className="mysary-info-label">Reporting Manager:</p>
                <p className="mysary-info-value">{employee.reportingManager || 'N/A'}</p>
              </div>
            </div>

            <h5 className="mysary-section-title">Salary Details</h5>
            <Table striped bordered hover className="mysary-table">
              <thead>
                <tr>
                  <th>Gross Salary</th>
                  <th>Deductions</th>
                  <th>Net Salary</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{salary.toFixed(2)}</td>
                  <td>{deductions.toFixed(2)}</td>
                  <td>{netSalary.toFixed(2)}</td>
                </tr>
              </tbody>
            </Table>

            <h5 className="mysary-section-title">Benefits & Entitlements</h5>
            <div className="mysary-info-row">
              <div className="mysary-info-item">
                <p className="mysary-info-label">Health Insurance:</p>
                <p className="mysary-info-value">{employee.healthInsurance || 'Not Enrolled'}</p>
              </div>
              <div className="mysary-info-item">
                <p className="mysary-info-label">Pension Plan:</p>
                <p className="mysary-info-value">{employee.pensionPlan || 'Not Enrolled'}</p>
              </div>
              <div className="mysary-info-item">
                <p className="mysary-info-label">Leave Entitlements:</p>
                <p className="mysary-info-value">{employee.leaveEntitlements || 'N/A'}</p>
              </div>
            </div>

            <h5 className="mysary-section-title">Recent Salary Transactions</h5>
            {recentTransactions.length === 0 ? (
              <p className="text-center text-muted">No recent transactions found.</p>
            ) : (
              <Table striped bordered hover className="mysary-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Gross Salary</th>
                    <th>Deductions</th>
                    <th>Net Salary</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((transaction, index) => (
                    <tr key={index}>
                      <td>{transaction.date}</td>
                      <td>{transaction.grossSalary}</td>
                      <td>{transaction.deductions}</td>
                      <td>{transaction.netSalary}</td>
                      <td>{transaction.status}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            <div className="text-center mt-4 d-flex justify-content-center gap-3">
              <Button onClick={handleDownloadPayslip} className="mysary-button primary">
                Download Payslip
              </Button>
              <Link to="/hr-management/remuneration" className="mysary-button primary btn">
                Back to Employee List
              </Link>
              <Link to="/hr-management/messenger" className="mysary-button secondary btn">
                Contact HR
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default MySalaryDetails;