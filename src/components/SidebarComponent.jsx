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
  FaUserFriends,
  FaBars,
} from 'react-icons/fa';
import { Collapse } from 'react-bootstrap';

// Updated CSS with mobile responsive styles
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

  .sidebar {
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%) !important;
    border: 3px solid #28a745 !important;
    position: sticky !important;
    top: 15px !important;
    margin: 15px 0 15px 5px !important;
    padding: 8px !important; /* Match .p-2 */
    border-radius: 10px !important;
    transition: all 0.3s ease !important;
    width: 220px !important;
    max-height: calc(100vh - 30px) !important;
    overflow-y: auto !important;
    z-index: 100 !important;
    box-sizing: border-box !important;
  }

  .hamburger-menu {
    display: none !important;
    font-size: 1.5rem !important;
    color: #28a745 !important;
    cursor: pointer !important;
    padding: 10px !important;
    position: fixed !important;
    top: 10px !important;
    left: 10px !important;
    z-index: 1100 !important;
    background: #fff !important;
    border-radius: 5px !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
  }

  .sidebar-overlay {
    display: none !important;
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    background: rgba(0, 0, 0, 0.5) !important;
    z-index: 1000 !important;
  }

  .sidebar-overlay.open {
    display: block !important;
  }

  @media (max-width: 768px) {
    .hamburger-menu {
      display: block !important;
    }

    .sidebar {
      position: fixed !important;
      left: -250px !important;
      width: 250px !important;
      height: 100% !important;
      margin: 0 !important;
      z-index: 1001 !important;
      transition: left 0.3s ease !important;
      top: 0 !important;
    }

    .sidebar.open {
      left: 0 !important;
    }

    .sidebar-header {
      padding: 1rem !important;
    }
  }

  .sidebar-header {
    color: #1f2937 !important;
    font-weight: 700 !important;
    font-size: 1.25rem !important;
    letter-spacing: 0.5px !important;
    border-bottom: 1px solid #e5e7eb !important;
    padding: 0.75rem !important;
    display: flex !important;
    align-items: center !important;
    justify-content: flex-start !important;
  }

  .sidebar-nav-item {
    transition: background-color 0.3s ease, transform 0.3s ease !important;
    border-radius: 6px !important;
    margin: 2px 0 !important;
    padding: 0.25rem !important;
  }

  .sidebar-nav-item:hover {
    background-color: #f1f5f9 !important;
    transform: translateX(3px) !important;
  }

  .sidebar-nav-link {
    font-weight: 600 !important;
    font-size: 0.9rem !important;
    padding: 8px 12px !important;
    display: flex !important;
    align-items: center !important;
    text-decoration: none !important;
    color: inherit !important;
  }

  .sidebar-sub-item {
    transition: background-color 0.3s ease, transform 0.3s ease !important;
    border-radius: 4px !important;
    margin: 2px 0 !important;
    padding: 0.25rem !important;
  }

  .sidebar-sub-item:hover {
    background-color: #e6f0fa !important;
    transform: translateX(2px) !important;
  }

  .sidebar-sub-link {
    font-weight: 500 !important;
    font-size: 0.85rem !important;
    padding: 6px 12px !important;
    display: flex !important;
    align-items: center !important;
    text-decoration: none !important;
    color: inherit !important;
  }

  .sidebar-icon {
    transition: transform 0.3s ease !important;
    margin-right: 8px !important;
    font-size: 1rem !important;
  }

  .sidebar-nav-item:hover .sidebar-icon,
  .sidebar-sub-item:hover .sidebar-icon {
    transform: scale(1.1) !important;
  }

  .sidebar::-webkit-scrollbar {
    width: 6px !important;
  }

  .sidebar::-webkit-scrollbar-track {
    background: #f1f5f9 !important;
    border-radius: 3px !important;
  }

  .sidebar::-webkit-scrollbar-thumb {
    background: #28a745 !important;
    border-radius: 3px !important;
  }

  .sidebar::-webkit-scrollbar-thumb:hover {
    background: #047857 !important;
  }
`;

const SidebarComponent = ({ onLogout }) => {
  const [employeeMenuOpen, setEmployeeMenuOpen] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

      {/* Overlay to close sidebar on mobile */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div
        className={`sidebar p-2 ${sidebarOpen ? 'open' : ''}`}
        style={{
          minHeight: 'calc(100vh - 30px)',
          width: '220px',
        }}
      >
        <h4 className="sidebar-header mb-3">HR Portal</h4>
        <ul className="nav flex-column">
          <li className="sidebar-nav-item mb-1">
            <NavLink
              to="/dashboard"
              className="sidebar-nav-link d-flex align-items-center"
              style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
              onClick={() => setSidebarOpen(false)}
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
              to="/admin-login"
              className="sidebar-nav-link d-flex align-items-center"
              style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
              onClick={(e) => {
                e.preventDefault();
                onLogout();
                setSidebarOpen(false);
              }}
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