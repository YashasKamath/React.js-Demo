import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Header() {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const handleLogout = async () => {
    if (!token) return;
    await signOut(auth);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary justify-content-between">
      <Container>
        <Navbar.Brand href="#home">Biogas</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <NavDropdown title="Products" id="basic-nav-dropdown">
              <NavDropdown.Item href="/">Biogas</NavDropdown.Item>
              <NavDropdown.Item href="/">CNG</NavDropdown.Item>
              <NavDropdown.Item href="/">Kerosene</NavDropdown.Item>
              <NavDropdown.Item href="/">LPG</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Form inline>
        <Col xs="auto">
          <Button type="submit" onClick={handleLogout}>
            Log Out
          </Button>
        </Col>
      </Form>
    </Navbar>
  );
}

export default Header;
