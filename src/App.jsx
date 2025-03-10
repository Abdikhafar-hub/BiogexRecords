import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { supabase } from './supabaseClient';

// Import pages and components
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import Dashboard from './pages/Dashboard';
import HRManagementDashboard from './pages/HRManagementDashboard';
import SidebarComponent from './components/SidebarComponent';
import CustomerAccountForm from './components/CustomerAccountForm';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import EmployeeDetails from './components/EmployeeDetails';
import HRActions from './components/HRActions';
import LeaveAttendance from './components/LeaveAttendance';
import Separation from './components/Separation';
import Documents from './components/Documents';
import CustomerList from './components/CustomerList';
import CustomerDetails from './components/CustomerDetails';
import Remuneration from './components/Remuneration';
import MySalaryDetails from './components/MySalaryDetails';
import Performance from './components/Performance';
import Finance from './components/Finance';
import Trainings from './components/Trainings';
import Messenger from './components/Messenger';

// Global CSS
const globalStyles = `
  .app-container {
    min-height: 100vh;
    width: 100vw;
    overflow-x: hidden;
  }

  .sidebar-container {
    width: 300px;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
  }

  .main-content {
    margin-left: 0;
    width: 100%;
    min-height: 100vh;
  }

  .main-content.with-sidebar {
    margin-left: 300px;
    width: calc(100% - 300px);
  }
`;

const AppContent = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
      }
    };

    checkSession();
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setIsAuthenticated(true);
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setIsAdminAuthenticated(false);
      }
    });
  }, []);

  const handleLogin = () => setIsAuthenticated(true);
  const handleAdminLogin = () => setIsAdminAuthenticated(true);
  const handleSelectEmployee = (employee) => setSelectedEmployee(employee);

  const showSidebar = isAdminAuthenticated && location.pathname.startsWith('/hr-management');

  return (
    <>
      <style>{globalStyles}</style>
      <div className="app-container">
        {showSidebar && <div className="sidebar-container"><SidebarComponent /></div>}
        <div className={`main-content ${showSidebar ? 'with-sidebar' : ''}`}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin-login" element={<AdminLogin onAdminLogin={handleAdminLogin} />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
            <Route path="/customer-registration-form" element={isAuthenticated ? <CustomerAccountForm /> : <Navigate to="/" />} />
            
            {/* HR Management Routes (Admin Only) */}
            <Route path="/hr-management" element={isAdminAuthenticated ? <HRManagementDashboard /> : <Navigate to="/admin-login" />} />
            <Route path="/hr-management/create-employee" element={isAdminAuthenticated ? <EmployeeForm /> : <Navigate to="/admin-login" />} />
            <Route path="/hr-management/employee-list" element={isAdminAuthenticated ? <EmployeeList onSelectEmployee={handleSelectEmployee} /> : <Navigate to="/admin-login" />} />
            <Route path="/hr-management/employee-details/:id" element={isAdminAuthenticated ? <EmployeeDetails /> : <Navigate to="/admin-login" />} />
            <Route path="/hr-management/customer-list" element={isAdminAuthenticated ? <CustomerList /> : <Navigate to="/admin-login" />} />
            <Route path="/hr-management/customer-details/:id" element={isAdminAuthenticated ? <CustomerDetails /> : <Navigate to="/admin-login" />} />
            <Route path="/hr-management/remuneration" element={isAdminAuthenticated ? <Remuneration /> : <Navigate to="/admin-login" />} />
            <Route path="/hr-management/remuneration/:employeeId" element={isAdminAuthenticated ? <MySalaryDetails /> : <Navigate to="/admin-login" />} />
            <Route path="/hr-management/performance" element={isAdminAuthenticated ? <Performance /> : <Navigate to="/admin-login" />} />
            <Route path="/hr-management/finance" element={isAdminAuthenticated ? <Finance /> : <Navigate to="/admin-login" />} />
            <Route path="/hr-management/trainings" element={isAdminAuthenticated ? <Trainings /> : <Navigate to="/admin-login" />} />
            <Route path="/hr-management/hr-actions" element={isAdminAuthenticated ? <HRActions /> : <Navigate to="/admin-login" />} />
            <Route path="/hr-management/leave-attendance" element={isAdminAuthenticated ? <LeaveAttendance /> : <Navigate to="/admin-login" />} />
            <Route path="/hr-management/separation" element={isAdminAuthenticated ? <Separation /> : <Navigate to="/admin-login" />} />
            <Route path="/hr-management/documents" element={isAdminAuthenticated ? <Documents /> : <Navigate to="/admin-login" />} />
            <Route path="/hr-management/messenger" element={isAdminAuthenticated ? <Messenger /> : <Navigate to="/admin-login" />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;