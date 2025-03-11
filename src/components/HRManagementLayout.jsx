import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarComponent from './SidebarComponent';

// Parent layout CSS to manage the overall layout
const layoutStyles = `
  .layout-container {
    display: flex;
    min-height: 100vh;
    position: relative;
    width: 100%;
    overflow: hidden;
    margin: 0 !important; /* Override any external margins */
    padding: 0 !important; /* Override any external padding */
  }

  .sidebar {
    margin: 15px 0 15px 5px !important; /* Ensure no unexpected margins */
    padding: 8px !important; /* Match .p-2 */
    width: 220px !important;
    border: 3px solid #28a745 !important;
    box-sizing: border-box !important; /* Ensure border-box */
  }

  .main-content {
    flex: 1;
    width: 100%;
    margin-left: 226px; /* Set to sidebar's computed width (adjust based on DevTools) */
    padding: 0 !important; /* Override any external padding */
    margin: 0 !important; /* Override any external margins */
    transition: margin-left 0.3s ease;
  }

  @media (max-width: 768px) {
    .layout-container {
      display: block;
    }

    .main-content {
      margin-left: 0 !important;
      width: 100% !important;
      padding: 3.5rem 0.5rem 1rem 0.5rem !important;
    }
  }

  body, html {
    margin: 0 !important;
    padding: 0 !important;
    overflow-x: hidden !important;
  }

  /* Debug: Add temporary background colors to identify elements */
  .sidebar {
    background-color: rgba(255, 0, 0, 0.1) !important;
  }

  .main-content {
    background-color: rgba(0, 0, 255, 0.1) !important;
  }
`;

const HRManagementLayout = ({ onLogout }) => {
  return (
    <>
      <style>{layoutStyles}</style>
      <div className="layout-container">
        <SidebarComponent onLogout={onLogout} />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default HRManagementLayout;