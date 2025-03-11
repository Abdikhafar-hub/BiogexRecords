import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUsersCog, FaUserPlus } from "react-icons/fa";
import { supabase } from "../supabaseClient";

// Custom CSS for the dashboard cards
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
  
  .dashboard-card {
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    border: 2px solid transparent;
    border-image: linear-gradient(90deg, #047857 0%, #28a745 100%) 1;
    border-radius: 16px;
    box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.5);
    transition: all 0.3s ease;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .dashboard-card:hover {
    transform: translateY(-5px);
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.15), -10px -10px 20px rgba(255, 255, 255, 0.7);
  }
  
  .dashboard-card-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }
  
  .dashboard-card-icon {
    font-size: 1.75rem;
    color: #047857;
    transition: transform 0.3s ease, color 0.3s ease;
  }
  
  .dashboard-card:hover .dashboard-card-icon {
    transform: scale(1.2);
    color: #28a745;
  }
  
  .dashboard-card-text {
    color: #4b5563;
    font-size: 1rem;
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
  
  .dashboard-card-button {
    background: linear-gradient(90deg, #047857 0%, #28a745 100%);
    border: none;
    font-weight: 600;
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(4, 120, 87, 0.3);
  }
  
  .dashboard-card-button:hover {
    background: linear-gradient(90deg, #28a745 0%, #047857 100%);
    box-shadow: 0 6px 16px rgba(4, 120, 87, 0.5);
    transform: translateY(-2px);
  }
  
  .logout-button {
    background: linear-gradient(90deg, #dc3545 0%, #c82333 100%);
    border: none;
    font-weight: 600;
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
  }
  
  .logout-button:hover {
    background: linear-gradient(90deg, #c82333 0%, #dc3545 100%);
    box-shadow: 0 6px 16px rgba(220, 53, 69, 0.5);
    transform: translateY(-2px);
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .dashboard-card {
      padding: 1rem; /* Reduce padding on smaller screens */
      margin-bottom: 1rem;
    }
    
    .dashboard-card-title {
      font-size: 1.25rem; /* Slightly smaller title */
      flex-direction: column; /* Stack icon and text vertically */
      text-align: center;
    }
    
    .dashboard-card-icon {
      font-size: 1.5rem; /* Slightly smaller icon */
      margin-bottom: 0.5rem; /* Space between icon and text */
    }
    
    .dashboard-card-text {
      font-size: 0.9rem; /* Slightly smaller text */
      margin-bottom: 1rem;
    }
    
    .dashboard-card-button {
      font-size: 0.9rem; /* Slightly smaller button text */
      padding: 0.6rem 1.2rem; /* Adjust button padding */
    }
    
    .logout-button {
      font-size: 0.9rem;
      padding: 0.6rem 1.2rem;
      width: 100%; /* Full width on mobile */
    }
    
    .row {
      flex-direction: column; /* Stack cards vertically */
      align-items: center;
    }
    
    .col-md-5 {
      width: 100%; /* Full width for columns */
      max-width: 90%; /* Slight margin on sides */
    }
  }

  @media (max-width: 576px) {
    .dashboard-card-title {
      font-size: 1.1rem; /* Even smaller title for very small screens */
    }
    
    .dashboard-card-icon {
      font-size: 1.25rem;
    }
    
    .dashboard-card-text {
      font-size: 0.85rem;
    }
    
    .dashboard-card-button {
      font-size: 0.85rem;
      padding: 0.5rem 1rem;
    }
    
    .logout-button {
      font-size: 0.85rem;
      padding: 0.5rem 1rem;
    }
  }
`;

const DashboardCards = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      {/* Inject custom CSS */}
      <style>{customStyles}</style>

      <Container>
        <Row className="justify-content-center">
          <Col md={5} className="mb-3">
            <Card className="dashboard-card text-center">
              <Card.Body>
                <h4 className="dashboard-card-title">
                  <FaUsersCog className="dashboard-card-icon me-2" />
                  HR Management Portal
                </h4>
                <p className="dashboard-card-text">
                  Access the complete HR management system including dashboard, employee management, 
                  staff directory, leave & attendance, and more.
                </p>
                <Link to="/hr-management">
                  <Button className="dashboard-card-button w-100">
                    Enter HR Portal
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col md={5} className="mb-3">
            <Card className="dashboard-card text-center">
              <Card.Body>
                <h4 className="dashboard-card-title">
                  <FaUserPlus className="dashboard-card-icon me-2" />
                  Customer Registration
                </h4>
                <p className="dashboard-card-text">
                  New customers can register here. Complete the registration form and 
                  submit required documentation to join Biogex Pharma.
                </p>
                <Link to="/customer-registration-form">
                  <Button className="dashboard-card-button w-100">
                    Start Registration
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={5} className="text-center">
            <Button className="logout-button" onClick={handleLogout}>
              Logout
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DashboardCards;