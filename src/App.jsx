import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import HRManagement from './pages/HRManagement';
import CustomerRegistration from './pages/CustomerRegistration';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import EmployeeDetails from './components/EmployeeDetails';
import Remuneration from './components/Remuneration';
import Salaries from './components/Salaries';
import LeaveAttendance from './components/LeaveAttendance';
import Performance from './components/Performance';
import Finance from './components/Finance';
import Trainings from './components/Trainings';
import HRActions from './components/HRActions';
import Separation from './components/Separation';
import Documents from './components/Documents';
import Messenger from './components/Messenger';

function App() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [hrActions, setHRActions] = useState([]);
  const [messages, setMessages] = useState([]);

  const addEmployee = (employee) => {
    setEmployees((prev) => [...prev, employee]);
  };

  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleBackToList = () => {
    setSelectedEmployee(null);
  };

  const addLeaveRequest = (request) => {
    setLeaveRequests((prev) => [...prev, request]);
  };

  const addTraining = (training) => {
    setTrainings((prev) => [...prev, training]);
  };

  const addHRAction = (action) => {
    setHRActions((prev) => [...prev, action]);
  };

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
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
              {/* Signup Route */}
              <Route
                path="/signup"
                element={
                  isAuthenticated ? (
                    <Navigate to="/dashboard" />
                  ) : (
                    <Signup />
                  )
                }
              />
              {/* Dashboard Route */}
              <Route
                path="/dashboard"
                element={
                  isAuthenticated ? (
                    <Dashboard
                      employees={employees}
                      leaveRequests={leaveRequests}
                      trainings={trainings}
                      hrActions={hrActions}
                    />
                  ) : (
                    <Navigate to="/" />
                  )
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
                <Route
                  path="remuneration"
                  element={<Remuneration employees={employees} />}
                />
                <Route
                  path="salaries"
                  element={<Salaries employees={employees} />}
                />
                <Route
                  path="leave-attendance"
                  element={
                    <LeaveAttendance
                      employees={employees}
                      leaveRequests={leaveRequests}
                      addLeaveRequest={addLeaveRequest}
                    />
                  }
                />
                <Route
                  path="performance"
                  element={<Performance employees={employees} />}
                />
                <Route
                  path="finance"
                  element={<Finance employees={employees} />}
                />
                <Route
                  path="trainings"
                  element={
                    <Trainings
                      employees={employees}
                      trainings={trainings}
                      addTraining={addTraining}
                    />
                  }
                />
                <Route
                  path="hr-actions"
                  element={
                    <HRActions
                      employees={employees}
                      hrActions={hrActions}
                      addHRAction={addHRAction}
                    />
                  }
                />
                <Route
                  path="separation"
                  element={<Separation employees={employees} hrActions={hrActions} />}
                />
                <Route
                  path="documents"
                  element={<Documents employees={employees} />}
                />
                <Route
                  path="messenger"
                  element={
                    <Messenger
                      employees={employees}
                      messages={messages}
                      addMessage={addMessage}
                    />
                  }
                />
              </Route>
              {/* Customer Registration Route */}
              <Route
                path="/customer-registration"
                element={
                  isAuthenticated ? <CustomerRegistration /> : <Navigate to="/" />
                }
              />
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