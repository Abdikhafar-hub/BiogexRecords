import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarComponent from '../components/NavbarComponent';
import SidebarComponent from '../components/SidebarComponent';
import { Container, Row, Col } from 'react-bootstrap';

const HRManagement = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={2} className="p-0">
          <SidebarComponent />
        </Col>
        <Col md={10}>
          <NavbarComponent title="HR Management" />
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default HRManagement;