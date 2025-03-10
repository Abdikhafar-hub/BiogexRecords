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
  FaBars, // Added hamburger icon
} from 'react-icons/fa';
import { Collapse } from 'react-bootstrap';

// Updated CSS with mobile responsive styles
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

  .sidebar {
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
    border: 3px solid #28a745;
    box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.1), -6px -6px 12px rgba(255, 255, 255, 0.5);
    position: sticky;
    top: 15px;
    margin: 15px 5px;
    border-radius: 10px;
    transition: all 0.3s ease;
    width: 220px;
    max-height: calc(100vh - 30px);
    overflow-y: auto;
  }

  .sidebar:hover {
    box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.15), -8px -8px 16px rgba(255, 255, 255, 0.7);
  }

  .hamburger-menu {
    display: none;
    font-size: 1.5rem;
    color: #28a745;
    cursor: pointer;
    padding: 10px;
  }

  @media (max-width: 768px) {
    .hamburger-menu {
      display: block;
    }

    .sidebar {
      position: fixed;
      left: -260px;
      width: 250px;
      height: 100%;
      margin: 0;
      z-index: 1000;
      transition: left 0.3s ease;
    }

    .sidebar.open {
      left: 0;
    }

    .sidebar-header {
      padding: 1rem;
    }
  }

  /* Rest of your existing styles remain unchanged */
  .sidebar-header {
    color: #1f2937;
    font-weight: 700;
    font-size: 1.25rem;
    letter-spacing: 0.5px;
    border-bottom: 1px solid #e5e7eb;
    padding: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .sidebar-nav-item {
    transition: background-color 0.3s ease, transform 0.3s ease;
    border-radius: 6px;
    margin: 2px 0;
    padding: 0.25rem;
  }

  .sidebar-nav-item:hover {
    background-color: #f1f5f9;
    transform: translateX(3px);
  }

  .sidebar-nav-link {
    font-weight: 600;
    font-size: 0.9rem;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
  }

  .sidebar-sub-item {
    transition: background-color 0.3s ease, transform 0.3s ease;
    border-radius: 4px;
    margin: 2px 0;
    padding: 0.25rem;
  }

  .sidebar-sub-item:hover {
    background-color: #e6f0fa;
    transform: translateX(2px);
  }

  .sidebar-sub-link {
    font-weight: 500;
    font-size: 0.85rem;
    padding: 6px 12px;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
  }

  .sidebar-icon {
    transition: transform 0.3s ease;
    margin-right: 8px;
    font-size: 1rem;
  }

  .sidebar-nav-item:hover .sidebar-icon,
  .sidebar-sub-item:hover .sidebar-icon {
    transform: scale(1.1);
  }

  .back-arrow {
    color: #28a745;
    cursor: pointer;
    transition: transform 0.3s ease;
    margin-left: 8px;
    margin-right: 8px;
    font-size: 1rem;
  }

  .back-arrow:hover {
    transform: scale(1.1);
  }

  .sidebar::-webkit-scrollbar {
    width: 6px;
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
  const [sidebarOpen, setSidebarOpen] = useState(false); // Added state for mobile sidebar
  const location = useLocation();

  const activeParentStyle = {
    backgroundColor: '#28a745',
    color: '#fff',
    borderRadius: '6px',
  };

  const inactiveParentStyle = {
    color: '#4b5563',
  };

  const activeSubItemStyle = {
    color: '#28a745',
    borderBottom: '1px dotted #28a745',
    paddingBottom: '1px',
  };

  const inactiveSubItemStyle = {
    color: '#6c757d',
  };

  const iconStyle = {
    color: '#28a745',
  };

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <style>{customStyles}</style>

      {/* Hamburger menu for mobile */}
      <div className="hamburger-menu" onClick={toggleSidebar}>
        <FaBars />
      </div>

      <div
        className={`sidebar p-2 ${sidebarOpen ? 'open' : ''}`}
        style={{
          minHeight: 'calc(100vh - 30px)',
          width: '220px',
        }}
      >
        <h4 className="sidebar-header mb-3">
          
          HR Portal
        </h4>
        <ul className="nav flex-column">
          <li className="sidebar-nav-item mb-1">
            <NavLink
              to="/dashboard"
              className="sidebar-nav-link d-flex align-items-center"
              style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
              onClick={() => setSidebarOpen(false)} // Close sidebar on click in mobile
            >
              <FaHome className="sidebar-icon" style={iconStyle} />
              Dashboard
            </NavLink>
          </li>
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
                    onClick={() => setSidebarOpen(false)}
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
                    onClick={() => setSidebarOpen(false)}
                  >
                    Create Employee
                  </NavLink>
                </li>
              </ul>
            </Collapse>
          </li>
          <li className="sidebar-nav-item mb-1">
            <NavLink
              to="/hr-management/customer-list"
              className="sidebar-nav-link d-flex align-items-center"
              style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
              onClick={() => setSidebarOpen(false)}
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
              onClick={() => setSidebarOpen(false)}
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
              onClick={() => setSidebarOpen(false)}
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
              onClick={() => setSidebarOpen(false)}
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
              onClick={() => setSidebarOpen(false)}
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
              onClick={() => setSidebarOpen(false)}
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
              onClick={() => setSidebarOpen(false)}
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
              onClick={() => setSidebarOpen(false)}
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
              onClick={() => setSidebarOpen(false)}
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
              onClick={() => setSidebarOpen(false)}
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
              onClick={() => setSidebarOpen(false)}
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
              onClick={() => setSidebarOpen(false)}
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