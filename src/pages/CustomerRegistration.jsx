import NavbarComponent from "../components/NavbarComponent";
import CustomerForm from "../components/CustomerForm";
import { Container } from "react-bootstrap";

const CustomerRegistration = () => {
  return (
    <Container className="py-4">
      <NavbarComponent title="Customer Registration" />
      <CustomerForm />
    </Container>
  );
};

export default CustomerRegistration;
