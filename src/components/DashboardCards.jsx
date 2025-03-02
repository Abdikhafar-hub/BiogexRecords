import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUsersCog, FaUserPlus } from "react-icons/fa";

const DashboardCards = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={5} className="mb-3">
          <Card className="shadow border-0 p-3 text-center">
            <Card.Body>
              <h4 className="text-dark">
                <FaUsersCog className="me-2 text-success" />
                HR Management Portal
              </h4>
              <p>
                Access the complete HR management system including dashboard, employee management, 
                staff directory, leave & attendance, and more.
              </p>
              <Link to="/hr-management">
                <Button style={{ backgroundColor: "#047857", border: "none" }} className="w-100">
                  Enter HR Portal
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={5} className="mb-3">
          <Card className="shadow border-0 p-3 text-center">
            <Card.Body>
              <h4 className="text-dark">
                <FaUserPlus className="me-2 text-success" />
                Customer Registration
              </h4>
              <p>
                New customers can register here. Complete the registration form and 
                submit required documentation to join Biogex Pharma.
              </p>
              <Link to="/customer-registration">
                <Button style={{ backgroundColor: "#047857", border: "none" }} className="w-100">
                  Start Registration
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardCards;
