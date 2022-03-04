import React from "react";
import {
  DropdownButton,
  Dropdown,
  NavDropdown,
  Container,
  Navbar,
  Nav,
} from "react-bootstrap";
import { removeUserSession } from "../Utils/Common";
import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { cartApi } from "../api";

const MyNavbar = ({ user, onSubmit, cart }) => {
  const [currUser, setCurrUser] = useState(user);
  // const [cart, setCart] = useState([]);

  // useEffect(() => {
  //   const getCart = async () => {
  //     try {
  //       const currCart = await cartApi.getAll();
  //       setCart(currCart);
  //       console.log({ currCart });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getCart();
  // }, []);

  const handleSubmit = () => {
    setCurrUser(null);
    removeUserSession();
    onSubmit({ currUser });
  };

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
            {user ? (
              <NavDropdown
                id="dropdown-avatar"
                title={
                  <div
                    className="avatar-image avatar-small"
                    style={{
                      backgroundImage: `url("/uploads/default-male.jpeg")`,
                    }}
                  />
                }
              >
                <NavDropdown.Item href="#action/3.2">
                  My Account
                </NavDropdown.Item>
                <NavDropdown.Item href="/booking">My Orders</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/login" onClick={handleSubmit}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}

            <Nav.Link href="/brand">Help</Nav.Link>
            <Nav.Link href="/cart">
              {" "}
              <div className="display-center" style={{ fontSize: "1.3rem" }}>
                <FaShoppingCart className="display-center" />
                <sup style={{ color: "#11bba3" }}>{`(${cart})`}</sup>
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
