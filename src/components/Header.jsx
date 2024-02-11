import React, { useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { updateEmail } from "../redux";
import { connect } from "react-redux";

function Header(props) {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const handleLogout = async () => {
    if (!token) return;
    await signOut(auth);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    props.updateEmail('')
    navigate("/login");
  };

  useEffect(() => {
    props.updateEmail(localStorage.getItem('email'))
  }, [])

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Navbar.Brand href="/">Biogas</Navbar.Brand>
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
      {props.email && (
        <Form inline>
          <Navbar.Collapse id="basic-navbar-nav" inline>
            <Col xs="auto" style={{ marginRight: "15px" }}>
              <Nav.Link href="/">{props.email}</Nav.Link>
            </Col>
            <Col xs="auto">
              <Button type="submit" onClick={handleLogout}>
                Log Out
              </Button>
            </Col>
          </Navbar.Collapse>
        </Form>
      )}
    </Navbar>
  );
}

const mapStateToProps = state => {
  return {
    ...state,
    email : state.user.email
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateEmail : email => dispatch(updateEmail(email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header); 
