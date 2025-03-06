import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaUsers,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaChartBar,
  FaMoneyCheckAlt,
  FaGraduationCap,
  FaUserCog,
  FaSignOutAlt,
  FaFileAlt,
  FaComments,
  FaArrowLeft,
  FaUserFriends,
} from 'react-icons/fa';
import { Collapse } from 'react-bootstrap';

// Custom CSS for compact styling
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

  .sidebar {
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
    border: 3px solid #28a745; /* Slightly thinner border */
    box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.1), -6px -6px 12px rgba(255, 255, 255, 0.5); /* Reduced shadow */
    position: sticky;
    top: 15px; /* Reduced offset */
    margin: 15px 5px; /* Reduced margin */
    border-radius: 10px; /* Slightly smaller corners */
    transition: all 0.3s ease;
    width: 0px; /* Slightly narrower width */
    max-height: calc(100vh - 30px); /* Adjusted for reduced margins */
    overflow-y: auto; /* Enable vertical scrolling */
  }

  .sidebar:hover {
    box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.15), -8px -8px 16px rgba(255, 255, 255, 0.7);
  }

  .sidebar-header {
    color: #1f2937;
    font-weight: 700;
    font-size: 1.25rem; /* Smaller font size */
    letter-spacing: 0.5px; /* Reduced spacing */
    border-bottom: 1px solid #e5e7eb;
    padding: 0.75rem; /* Reduced padding */
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .sidebar-nav-item {
    transition: background-color 0.3s ease, transform 0.3s ease;
    border-radius: 6px; /* Smaller radius */
    margin: 2px 0; /* Reduced margin */
    padding: 0.25rem; /* Reduced padding */
  }

  .sidebar-nav-item:hover {
    background-color: #f1f5f9;
    transform: translateX(3px); /* Reduced transform */
  }

  .sidebar-nav-link {
    font-weight: 600;
    font-size: 0.9rem; /* Smaller font size */
    padding: 8px 12px; /* Reduced padding */
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
  }

  .sidebar-sub-item {
    transition: background-color 0.3s ease, transform 0.3s ease;
    border-radius: 4px; /* Smaller radius */
    margin: 2px 0; /* Reduced margin */
    padding: 0.25rem; /* Reduced padding */
  }

  .sidebar-sub-item:hover {
    background-color: #e6f0fa;
    transform: translateX(2px); /* Reduced transform */
  }

  .sidebar-sub-link {
    font-weight: 500;
    font-size: 0.85rem; /* Smaller font size */
    padding: 6px 12px; /* Reduced padding */
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
  }

  .sidebar-icon {
    transition: transform 0.3s ease;
    margin-right: 8px; /* Reduced spacing */
    font-size: 1rem; /* Smaller icon */
  }

  .sidebar-nav-item:hover .sidebar-icon,
  .sidebar-sub-item:hover .sidebar-icon {
    transform: scale(1.1); /* Reduced scale */
  }

  .back-arrow {
    color: #28a745;
    cursor: pointer;
    transition: transform 0.3s ease;
    margin-left: 8px; /* Reduced margin */
    margin-right: 8px;
    font-size: 1rem; /* Smaller icon */
  }

  .back-arrow:hover {
    transform: scale(1.1); /* Reduced scale */
  }

  /* Scrollbar styling */
  .sidebar::-webkit-scrollbar {
    width: 6px; /* Thinner scrollbar */
  }

  .sidebar::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
  }

  .sidebar::-webkit-scrollbar-thumb {
    background: #28a745;
    border-radius: 3px;
  }

  .sidebar::-webkit-scrollbar-thumb:hover {
    background: #047857;
  }
`;

const SidebarComponent = () => {
  const [employeeMenuOpen, setEmployeeMenuOpen] = useState(true);
  const location = useLocation();

  // Style for active NavLink (parent menu)
  const activeParentStyle = {
    backgroundColor: '#28a745',
    color: '#fff',
    borderRadius: '6px', // Match reduced radius
  };

  // Style for inactive NavLink (parent menu)
  const inactiveParentStyle = {
    color: '#4b5563',
  };

  // Style for active sub-item (with dotted underline)
  const activeSubItemStyle = {
    color: '#28a745',
    borderBottom: '1px dotted #28a745', // Thinner dotted line
    paddingBottom: '1px',
  };

  // Style for inactive sub-item
  const inactiveSubItemStyle = {
    color: '#6c757d',
  };

  // Green color for icons
  const iconStyle = {
    color: '#28a745',
  };

  return (
    <>
      {/* Inject custom CSS */}
      <style>{customStyles}</style>

      <div
        className="sidebar p-2" // Reduced padding
        style={{
          minHeight: 'calc(100vh - 30px)', // Adjusted for reduced margins
          width: '220px', // Match reduced width
        }}
      >
        <h4 className="sidebar-header mb-3">
          <NavLink to="/dashboard" className="back-arrow">
            <FaArrowLeft />
          </NavLink>
          HR Portal
        </h4>
        <ul className="nav flex-column">
          <li className="sidebar-nav-item mb-1">
            <NavLink
              to="/dashboard"
              className="sidebar-nav-link d-flex align-items-center"
              style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
            >
              <FaHome className="sidebar-icon" style={iconStyle} />
              Dashboard
            </NavLink>
          </li>
          {/* Employee Menu with Submenu */}
          <li className="sidebar-nav-item mb-1">
            <div
              className="sidebar-nav-link d-flex align-items-center"
              style={
                location.pathname.includes('/hr-management/employee')
                  ? activeParentStyle
                  : inactiveParentStyle
              }
              onClick={() => setEmployeeMenuOpen(!employeeMenuOpen)}
              aria-expanded={employeeMenuOpen}
            >
              <FaUsers className="sidebar-icon" style={iconStyle} />
              Employee
            </div>
            <Collapse in={employeeMenuOpen}>
              <ul className="nav flex-column ms-2">
                <li className="sidebar-sub-item mb-1">
                  <NavLink
                    to="/hr-management/employee-list"
                    className="sidebar-sub-link d-flex align-items-center"
                    style={({ isActive }) =>
                      isActive ? activeSubItemStyle : inactiveSubItemStyle
                    }
                  >
                    Staff
                  </NavLink>
                </li>
                <li className="sidebar-sub-item mb-1">
                  <NavLink
                    to="/hr-management/create-employee"
                    className="sidebar-sub-link d-flex align-items-center"
                    style={({ isActive }) =>
                      isActive ? activeSubItemStyle : inactiveSubItemStyle
                    }
                  >
                    Create Employee
                  </NavLink>
                </li>
              </ul>
            </Collapse>
          </li>
          {/* Added Customer List */}
          <li className="sidebar-nav-item mb-1">
            <NavLink
              to="/hr-management/customer-list"
              className="sidebar-nav-link d-flex align-items-center"
              style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
            >
              <FaUserFriends className="sidebar-icon" style={iconStyle} />
              Customer List
            </NavLink>
          </li>
          <li className="sidebar-nav-item mb-1">
            <NavLink
              to="/hr-management/remuneration"
              className="sidebar-nav-link d-flex align-items-center"
              style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
            >
              <FaMoneyBillWave className="sidebar-icon" style={iconStyle} />
              Salary & Remuneration
            </NavLink>
          </li>
          <li className="sidebar-nav-item mb-1">
            <NavLink
              to="/hr-management/leave-attendance"
              className="sidebar-nav-link d-flex align-items-center"
              style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
            >
              <FaCalendarAlt className="sidebar-icon" style={iconStyle} />
              Leave & Attendance
            </NavLink>
          </li>
          <li className="sidebar-nav-item mb-1">
            <NavLink
              to="/hr-management/performance"
              className="sidebar-nav-link d-flex align-items-center"
              style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
            >
              <FaChartBar className="sidebar-icon" style={iconStyle} />
              Performance
            </NavLink>
          </li>
          <li className="sidebar-nav-item mb-1">
            <NavLink
              to="/hr-management/finance"
              className="sidebar-nav-link d-flex align-items-center"
              style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
            >
              <FaMoneyCheckAlt className="sidebar-icon" style={iconStyle} />
              Finance
            </NavLink>
          </li>
          <li className="sidebar-nav-item mb-1">
            <NavLink
              to="/hr-management/trainings"
              className="sidebar-nav-link d-flex align-items-center"
              style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
            >
              <FaGraduationCap className="sidebar-icon" style={iconStyle} />
              Trainings
            </NavLink>
          </li>
          <li className="sidebar-nav-item mb-1">
            <NavLink
              to="/hr-management/hr-actions"
              className="sidebar-nav-link d-flex align-items-center"
              style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
            >
              <FaUserCog className="sidebar-icon" style={iconStyle} />
              HR Actions
            </NavLink>
          </li>
          <li className="sidebar-nav-item mb-1">
            <NavLink
              to="/hr-management/separation"
              className="sidebar-nav-link d-flex align-items-center"
              style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
            >
              <FaSignOutAlt className="sidebar-icon" style={iconStyle} />
              Separation
            </NavLink>
          </li>
          <li className="sidebar-nav-item mb-1">
            <NavLink
              to="/hr-management/documents"
              className="sidebar-nav-link d-flex align-items-center"
              style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
            >
              <FaFileAlt className="sidebar-icon" style={iconStyle} />
              Documents
            </NavLink>
          </li>
          <li className="sidebar-nav-item mb-1">
            <NavLink
              to="/hr-management/messenger"
              className="sidebar-nav-link d-flex align-items-center"
              style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
            >
              <FaComments className="sidebar-icon" style={iconStyle} />
              Messenger
            </NavLink>
          </li>
          <li className="sidebar-nav-item mb-1">
            <NavLink
              to="/customer-registration"
              className="sidebar-nav-link d-flex align-items-center"
              style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
            >
              <FaUsers className="sidebar-icon" style={iconStyle} />
              Customer Registration
            </NavLink>
          </li>
          <li className="sidebar-nav-item mb-1">
            <NavLink
              to="/"
              className="sidebar-nav-link d-flex align-items-center"
              style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
            >
              <FaSignOutAlt className="sidebar-icon" style={iconStyle} />
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SidebarComponent;