import { Container } from "react-bootstrap";
import DashboardCards from "../components/DashboardCards";

const Dashboard = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h2 className="mb-4 fw-bold">Welcome to Biogex Pharma</h2>
        <DashboardCards />
      </div>
    </Container>
  );
};

export default Dashboard;
