import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

// Import pages and components
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import Dashboard from './pages/Dashboard';
import HRManagementDashboard from './pages/HRManagementDashboard';
import HRManagementLayout from './components/HRManagementLayout';
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
    padding: 0 !important; /* Ensure no padding affects layout */
    margin: 0 !important; /* Ensure no margin affects layout */
  }

  body {
    margin: 0 !important;
    padding: 0 !important;
    overflow-x: hidden;
  }
`;

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdminAuthenticated(false);
    supabase.auth.signOut().then(() => {
      window.location.href = '/admin-login';
    }).catch((error) => {
      console.error('Logout error:', error);
      window.location.href = '/admin-login';
    });
  };
  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
    navigate(`/hr-management/employee-details/${employee.id}`);
  };

  return (
    <>
      <style>{globalStyles}</style>
      <div className="app-container">
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
          
          {/* HR Management Routes (Admin Only) with Layout */}
          <Route
            path="/hr-management/*"
            element={isAdminAuthenticated ? <HRManagementLayout onLogout={handleLogout} /> : <Navigate to="/admin-login" />}
          >
            <Route index element={<HRManagementDashboard />} />
            <Route path="create-employee" element={<EmployeeForm />} />
            <Route path="employee-list" element={<EmployeeList onSelectEmployee={handleSelectEmployee} />} />
            <Route path="employee-details/:id" element={<EmployeeDetails />} />
            <Route path="customer-list" element={<CustomerList />} />
            <Route path="customer-details/:id" element={<CustomerDetails />} />
            <Route path="remuneration" element={<Remuneration />} />
            <Route path="remuneration/:employeeId" element={<MySalaryDetails />} />
            <Route path="performance" element={<Performance />} />
            <Route path="finance" element={<Finance />} />
            <Route path="trainings" element={<Trainings />} />
            <Route path="hr-actions" element={<HRActions />} />
            <Route path="leave-attendance" element={<LeaveAttendance />} />
            <Route path="separation" element={<Separation />} />
            <Route path="documents" element={<Documents />} />
            <Route path="messenger" element={<Messenger />} />
          </Route>
        </Routes>
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