import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import HRManagement from './pages/HRManagement';
import CustomerRegistration from './pages/CustomerRegistration';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import EmployeeDetails from './components/EmployeeDetails';

function App() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const addEmployee = (employee) => {
    setEmployees((prev) => [...prev, employee]);
  };

  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleBackToList = () => {
    setSelectedEmployee(null);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="container-fluid">
        <div className="row">
          <div className={isAuthenticated ? 'col-md-12 p-0' : 'col-md-12 p-3'}>
            <Routes>
              {/* Login Route */}
              <Route
                path="/"
                element={
                  isAuthenticated ? (
                    <Navigate to="/dashboard" />
                  ) : (
                    <Login onLogin={handleLogin} />
                  )
                }
              />
              {/* Dashboard Route */}
              <Route
                path="/dashboard"
                element={
                  isAuthenticated ? <Dashboard /> : <Navigate to="/" />
                }
              />
              {/* HR Management Routes */}
              <Route
                path="/hr-management"
                element={
                  isAuthenticated ? <HRManagement /> : <Navigate to="/" />
                }
              >
                <Route
                  path="create-employee"
                  element={<EmployeeForm onSubmit={addEmployee} />}
                />
                <Route
                  path="employee-list"
                  element={
                    selectedEmployee ? (
                      <EmployeeDetails employee={selectedEmployee} onBack={handleBackToList} />
                    ) : (
                      <EmployeeList employees={employees} onSelectEmployee={handleSelectEmployee} />
                    )
                  }
                />
                <Route
                  index
                  element={<EmployeeList employees={employees} onSelectEmployee={handleSelectEmployee} />}
                />
              </Route>
              {/* Customer Registration Route */}
              <Route
                path="/customer-registration"
                element={
                  isAuthenticated ? <CustomerRegistration /> : <Navigate to="/" />
                }
              />
              {/* Placeholder Routes for Sidebar Links */}
              <Route path="/staff" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/" />} />
              <Route path="/remuneration" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/" />} />
              <Route path="/mysary" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/" />} />
              <Route path="/leave-attendance" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/" />} />
              <Route path="/performance" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/" />} />
              <Route path="/finance" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/" />} />
              <Route path="/trainings" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/" />} />
              <Route path="/hr-actions" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/" />} />
              <Route path="/separation" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/" />} />
              <Route path="/documents" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/" />} />
              <Route path="/messenger" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/" />} />
              {/* Redirect unknown routes */}
              <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;