import { Navbar, Container } from "react-bootstrap";

// Custom CSS for additional styling
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

  .navbar-custom {
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(90deg, #047857 0%, #03603f 100%); /* Gradient from #047857 to a darker shade */
    border: 4px solid #047857; /* Thick border matching the sidebar */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1), 0 -8px 16px rgba(255, 255, 255, 0.1); /* Floating effect */
    margin: 10px 20px; /* Offset to create floating effect */
    border-radius: 12px; /* Rounded corners */
    transition: all 0.3s ease;
  }

  .navbar-custom:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15), 0 -10px 20px rgba(255, 255, 255, 0.15);
  }

  .navbar-brand-custom {
    color: #ffffff !important; /* Ensure white text */
    font-weight: 700;
    font-size: 1.5rem;
    letter-spacing: 1px;
    transition: transform 0.3s ease, color 0.3s ease;
    position: relative;
  }

  .navbar-brand-custom:hover {
    color: #FBBF24 !important; /* Gold on hover */
    transform: scale(1.05);
  }

  .navbar-brand-custom::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #FBBF24; /* Gold underline */
    transition: width 0.3s ease;
  }

  .navbar-brand-custom:hover::after {
    width: 100%;
  }
`;

const NavbarComponent = ({ title }) => {
  return (
    <>
      {/* Inject custom CSS */}
      <style>{customStyles}</style>

      <Navbar className="navbar-custom" variant="dark">
        <Container>
          <Navbar.Brand className="navbar-brand-custom">{title}</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;