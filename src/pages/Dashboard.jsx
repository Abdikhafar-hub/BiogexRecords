import { Container } from "react-bootstrap";
import DashboardCards from "../components/DashboardCards";

// Custom CSS for the title and subtitle
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

  .dashboard-title {
    font-family: 'Poppins', sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(90deg, #047857 0%, #28a745 100%); /* Gradient from Biogex green to lighter green */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.1);
    letter-spacing: 1px;
    transition: transform 0.3s ease;
    display: inline-block;
  }

  .dashboard-title:hover {
    transform: scale(1.05);
  }

  .dashboard-subtitle {
    font-family: 'Poppins', sans-serif;
    font-size: 1.25rem;
    font-weight: 400;
    color: #4b5563; /* Medium gray for contrast */
    letter-spacing: 0.5px;
    margin-top: 0.5rem;
    margin-bottom: 2rem;
    opacity: 0;
    animation: fadeIn 1s ease-in-out forwards;
    animation-delay: 0.3s;
  }

  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;

const Dashboard = () => {
  return (
    <>
      {/* Inject custom CSS */}
      <style>{customStyles}</style>

      <Container className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <h2 className="mb-1 fw-bold dashboard-title">Welcome to Biogex Pharma</h2>
          <h4 className="dashboard-subtitle">Empowering Healthcare for a Better Tomorrow</h4>
          <DashboardCards />
        </div>
      </Container>
    </>
  );
};

export default Dashboard;