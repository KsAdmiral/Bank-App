import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import SparkLogo from "../items/sparks.png";

const NavBar = () => {
  return (
    <Navbar bg="light" variant="light" expand="lg" className="sticky-nav">
      <Container>
        <Navbar.Brand href="#home">
          <img src={SparkLogo} className="nav-logo" alt="React Logo" /> The
          Bankpill
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="justify-content-end" style={{ width: "100%" }}>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/create-user">Create-User</Nav.Link>
            <Nav.Link href="/user-list">User-List</Nav.Link>
            {/* <Nav.Link href="/create-transaction">Tranfer money</Nav.Link> */}
            <Nav.Link href="/transaction-history">transaction-history</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
