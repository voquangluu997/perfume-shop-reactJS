import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

const MyNavbar = () => {
  return (
    <Navbar
      className="navbar navbar-expand-lg navbar-dark fixed-top"
      collapseOnSelect
      expand="lg"
      variant="dark"
    >
      <Container>
        <Navbar.Brand>
          <a href="https://facebook.com/quangluu997">
            <img
              src="/fb_logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top mr-4"
              style={{ marginRight: "5px", background: "transparent" }}
            />
          </a>
          <a
            href="/"
            className="ml-4 white"
            style={{ textDecoration: "none", color: "white" }}
          >
            LV PERFUME SHOP
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/brand">WOMEN'S PERFUME</Nav.Link>
            <Nav.Link href="/promotions">MEN'S COLOGNE</Nav.Link>
            <Nav.Link href="/account">BEST SELLERS</Nav.Link>
            <Nav.Link href="/carts">BRANDS</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/login">Log in</Nav.Link>
            <Nav.Link href="/brand">Help</Nav.Link>
            <Nav.Link href="/promotions">Cart</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
