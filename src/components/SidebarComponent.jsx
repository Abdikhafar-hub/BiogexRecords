import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaUsers,
  FaMoneyBillWave,
  FaWallet,
  FaCalendarAlt,
  FaChartBar,
  FaMoneyCheckAlt,
  FaGraduationCap,
  FaUserCog,
  FaSignOutAlt,
  FaFileAlt,
  FaComments,
} from 'react-icons/fa';
import { Collapse } from 'react-bootstrap';

const SidebarComponent = () => {
  const [employeeMenuOpen, setEmployeeMenuOpen] = useState(true);
  const location = useLocation();

  // Style for active NavLink (parent menu)
  const activeParentStyle = {
    backgroundColor: '#28a745',
    color: '#fff',
    borderRadius: '0px',
  };

  // Style for inactive NavLink (parent menu)
  const inactiveParentStyle = {
    color: '#6c757d',
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
    <div
      className="bg-white p-3"
      style={{
        minHeight: '100vh',
        width: '250px',
        border: '1px solid #28a745', // Green border
      }}
    >
      <h4 className="text-dark mb-4">HR Portal</h4>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <NavLink
            to="/dashboard"
            className="nav-link d-flex align-items-center"
            style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
          >
            <FaHome className="me-2" style={iconStyle} />
            Dashboard
          </NavLink>
        </li>
        {/* Employee Menu with Submenu */}
        <li className="nav-item mb-2">
          <div
            className="nav-link d-flex align-items-center"
            style={
              location.pathname.includes('/hr-management/employee')
                ? activeParentStyle
                : inactiveParentStyle
            }
            onClick={() => setEmployeeMenuOpen(!employeeMenuOpen)}
            aria-expanded={employeeMenuOpen}
          >
            <FaUsers className="me-2" style={iconStyle} />
            Employee
          </div>
          <Collapse in={employeeMenuOpen}>
            <ul className="nav flex-column ms-3">
              <li className="nav-item mb-2">
                <NavLink
                  to="/hr-management/employee-list"
                  className="nav-link d-flex align-items-center"
                  style={({ isActive }) =>
                    isActive ? activeSubItemStyle : inactiveSubItemStyle
                  }
                >
                  Staff
                </NavLink>
              </li>
              <li className="nav-item mb-2">
                <NavLink
                  to="/hr-management/create-employee"
                  className="nav-link d-flex align-items-center"
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
        <li className="nav-item mb-2">
          <NavLink
            to="/hr-management/remuneration"
            className="nav-link d-flex align-items-center"
            style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
          >
            <FaMoneyBillWave className="me-2" style={iconStyle} />
            Salary & Remuneration
          </NavLink>
        </li>
        
        <li className="nav-item mb-2">
          <NavLink
            to="/hr-management/leave-attendance"
            className="nav-link d-flex align-items-center"
            style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
          >
            <FaCalendarAlt className="me-2" style={iconStyle} />
            Leave & Attendance
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            to="/hr-management/performance"
            className="nav-link d-flex align-items-center"
            style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
          >
            <FaChartBar className="me-2" style={iconStyle} />
            Performance
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            to="/hr-management/finance"
            className="nav-link d-flex align-items-center"
            style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
          >
            <FaMoneyCheckAlt className="me-2" style={iconStyle} />
            Finance
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            to="/hr-management/trainings"
            className="nav-link d-flex align-items-center"
            style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
          >
            <FaGraduationCap className="me-2" style={iconStyle} />
            Trainings
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            to="/hr-management/hr-actions"
            className="nav-link d-flex align-items-center"
            style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
          >
            <FaUserCog className="me-2" style={iconStyle} />
            HR Actions
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            to="/hr-management/separation"
            className="nav-link d-flex align-items-center"
            style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
          >
            <FaSignOutAlt className="me-2" style={iconStyle} />
            Separation
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            to="/hr-management/documents"
            className="nav-link d-flex align-items-center"
            style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
          >
            <FaFileAlt className="me-2" style={iconStyle} />
            Documents
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            to="/hr-management/messenger"
            className="nav-link d-flex align-items-center"
            style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
          >
            <FaComments className="me-2" style={iconStyle} />
            Messenger
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            to="/customer-registration"
            className="nav-link d-flex align-items-center"
            style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
          >
            <FaUsers className="me-2" style={iconStyle} />
            Customer Registration
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            to="/"
            className="nav-link d-flex align-items-center"
            style={({ isActive }) => (isActive ? activeParentStyle : inactiveParentStyle)}
          >
            <FaSignOutAlt className="me-2" style={iconStyle} />
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SidebarComponent;