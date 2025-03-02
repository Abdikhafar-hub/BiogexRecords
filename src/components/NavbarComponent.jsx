import { Navbar, Container } from "react-bootstrap";

const NavbarComponent = ({ title }) => {
  return (
    <Navbar style={{ backgroundColor: "#047857" }} variant="dark">
      <Container>
        <Navbar.Brand className="text-white">{title}</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
