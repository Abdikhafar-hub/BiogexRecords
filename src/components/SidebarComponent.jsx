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
} from 'react-icons/fa';
import { Collapse } from 'react-bootstrap';

// Custom CSS for additional styling
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

  .sidebar {
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
    border: 4px solid #28a745; /* Thick green border */
    box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.5); /* Floating effect */
    position: sticky;
    top: 20px; /* Slight offset from top */
    margin: 20px 10px; /* Margin to create floating effect */
    border-radius: 12px; /* Rounded corners */
    transition: all 0.3s ease;
  }

  .sidebar:hover {
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.15), -10px -10px 20px rgba(255, 255, 255, 0.7);
  }

  .sidebar-header {
    color: #1f2937;
    font-weight: 700;
    font-size: 1.5rem;
    letter-spacing: 1px;
    border-bottom: 2px solid #e5e7eb;
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start; /* Changed to flex-start to reduce space */
  }

  .sidebar-nav-item {
    transition: background-color 0.3s ease, transform 0.3s ease;
    border-radius: 8px;
    margin: 5px 0;
  }

  .sidebar-nav-item:hover {
    background-color: #f1f5f9;
    transform: translateX(5px);
  }

  .sidebar-nav-link {
    font-weight: 600;
    font-size: 1rem;
    padding: 12px 16px;
  }

  .sidebar-sub-item {
    transition: background-color 0.3s ease, transform 0.3s ease;
    border-radius: 6px;
    margin: 5px 0;
  }

  .sidebar-sub-item:hover {
    background-color: #e6f0fa;
    transform: translateX(3px);
  }

  .sidebar-sub-link {
    font-weight: 500;
    font-size: 0.95rem;
    padding: 8px 16px;
  }

  .sidebar-icon {
    transition: transform 0.3s ease;
  }

  .sidebar-nav-item:hover .sidebar-icon,
  .sidebar-sub-item:hover .sidebar-icon {
    transform: scale(1.2);
  }

  .back-arrow {
    color: #28a745;
    cursor: pointer;
    transition: transform 0.3s ease;
    margin-left: 10px; /* Small margin to space it from the text */
  }

  .back-arrow:hover {
    transform: scale(1.2);
  }
`;

const SidebarComponent = () => {
  const [employeeMenuOpen, setEmployeeMenuOpen] = useState(true);
  const location = useLocation();

  // Style for active NavLink (parent menu)
  const activeParentStyle = {
    backgroundColor: '#28a745',
    color: '#fff',
    borderRadius: '8px',
  };

  // Style for inactive NavLink (parent menu)
  const inactiveParentStyle = {
    color: '#4b5563',
  };

  // Style for active sub-item (with dotted underline)
  const activeSubItemStyle = {
    color: '#28a745',
    borderBottom: '2px dotted #28a745',
    paddingBottom: '2px',
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
        className="sidebar p-3"
        style={{
          minHeight: 'calc(100vh - 40px)', // Adjust height to account for margin
          width: '250px',
        }}
      >
        <h4 className="sidebar-header mb-4">
          
          <NavLink to="/dashboard" className="back-arrow">
            <FaArrowLeft />
          </NavLink>
          HR Portal
        </h4>
        <ul className="nav flex-column">
          <li className="sidebar-nav-item mb-2">
            <NavLink
              to="/dashboard"
              className="sidebar-nav-link d-flex align-items-center"
              style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
            >
              <FaHome className="sidebar-icon me-2" style={iconStyle} />
              Dashboard
            </NavLink>
          </li>
          {/* Employee Menu with Submenu */}
          <li className="sidebar-nav-item mb-2">
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
              <FaUsers className="sidebar-icon me-2" style={iconStyle} />
              Employee
            </div>
            <Collapse in={employeeMenuOpen}>
              <ul className="nav flex-column ms-3">
                <li className="sidebar-sub-item mb-2">
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
                <li className="sidebar-sub-item mb-2">
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
          <li className="sidebar-nav-item mb-2">
            <NavLink
              to="/hr-management/remuneration"
              className="sidebar-nav-link d-flex align-items-center"
              style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
            >
              <FaMoneyBillWave className="sidebar-icon me-2" style={iconStyle} />
              Salary & Remuneration
            </NavLink>
          </li>
          <li className="sidebar-nav-item mb-2">
            <NavLink
              to="/hr-management/leave-attendance"
              className="sidebar-nav-link d-flex align-items-center"
              style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
            >
              <FaCalendarAlt className="sidebar-icon me-2" style={iconStyle} />
              Leave & Attendance
            </NavLink>
          </li>
          <li className="sidebar-nav-item mb-2">
            <NavLink
              to="/hr-management/performance"
              className="sidebar-nav-link d-flex align-items-center"
              style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
            >
              <FaChartBar className="sidebar-icon me-2" style={iconStyle} />
              Performance
            </NavLink>
          </li>
          <li className="sidebar-nav-item mb-2">
            <NavLink
              to="/hr-management/finance"
              className="sidebar-nav-link d-flex align-items-center"
              style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
            >
              <FaMoneyCheckAlt className="sidebar-icon me-2" style={iconStyle} />
              Finance
            </NavLink>
          </li>
          <li className="sidebar-nav-item mb-2">
            <NavLink
              to="/hr-management/trainings"
              className="sidebar-nav-link d-flex align-items-center"
              style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
            >
              <FaGraduationCap className="sidebar-icon me-2" style={iconStyle} />
              Trainings
            </NavLink>
          </li>
          <li className="sidebar-nav-item mb-2">
            <NavLink
              to="/hr-management/hr-actions"
              className="sidebar-nav-link d-flex align-items-center"
              style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
            >
              <FaUserCog className="sidebar-icon me-2" style={iconStyle} />
              HR Actions
            </NavLink>
          </li>
          <li className="sidebar-nav-item mb-2">
            <NavLink
              to="/hr-management/separation"
              className="sidebar-nav-link d-flex align-items-center"
              style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
            >
              <FaSignOutAlt className="sidebar-icon me-2" style={iconStyle} />
              Separation
            </NavLink>
          </li>
          <li className="sidebar-nav-item mb-2">
            <NavLink
              to="/hr-management/documents"
              className="sidebar-nav-link d-flex align-items-center"
              style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
            >
              <FaFileAlt className="sidebar-icon me-2" style={iconStyle} />
              Documents
            </NavLink>
          </li>
          <li className="sidebar-nav-item mb-2">
            <NavLink
              to="/hr-management/messenger"
              className="sidebar-nav-link d-flex align-items-center"
              style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
            >
              <FaComments className="sidebar-icon me-2" style={iconStyle} />
              Messenger
            </NavLink>
          </li>
          <li className="sidebar-nav-item mb-2">
            <NavLink
              to="/customer-registration"
              className="sidebar-nav-link d-flex align-items-center"
              style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
            >
              <FaUsers className="sidebar-icon me-2" style={iconStyle} />
              Customer Registration
            </NavLink>
          </li>
          <li className="sidebar-nav-item mb-2">
            <NavLink
              to="/"
              className="sidebar-nav-link d-flex align-items-center"
              style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
            >
              <FaSignOutAlt className="sidebar-icon me-2" style={iconStyle} />
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SidebarComponent;