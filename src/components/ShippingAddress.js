import React, { useState, useEffect } from "react";
import {
  Form,
  Container,
  Row,
  Col,
  Card,
  Modal,
  Button,
} from "react-bootstrap";
import { Heading } from "../components";
import { userApi, bookingApi } from "../api";
import { BOOKING_ERRORS } from "../constant/error";
import { BUTTONS } from "../constant";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const ShippingAddress = ({ cart, finalPrice, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [method, setMethod] = useState("CASH");
  const [shippingFee, setShippingFee] = useState(11000);
  const [show, setShow] = useState(false);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const user = await userApi.getUser();
      try {
        setLoading(false);
        setUser(user);
      } catch (error) {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  const handleClose = () => {
    setShow(false);
    onSubmit({ val: false });
  };

  const handleOpen = () => {
    setShow(true);
  };

  const handleAddress = async () => {
    try {
      setLoading(true);
      await userApi.updateProfile({
        fullname,
        phone,
        address,
      });
      setLoading(false);
      alert(" Address updated");
      setErr("");
    } catch (error) {
      setLoading(false);
      setErr("The information provided is not correct");
    }
  };

  const handleBooking = async () => {
    setLoading(true);
    try {
      let rs = await bookingApi.add({
        method,
        amount: finalPrice,
        status: "ORDERING",
        address: address || user.address,
        phone: phone || user.phone,
        receiver: fullname || user.fullname,
      });
      setBooking(rs);
      setLoading(false);
      setShow(true);
    } catch (error) {
      //   // alert(BOOKING_ERRORS(error.response.data.message));
      setLoading(false);
    }
  };

  return (
    <Container fluid>
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col sm={8}>
            <Heading title="shipping address" />
            <Form>
              <div className="display-between">
                <Form.Group className="mb-3" controlId="fullName">
                  <Form.Label className="input-title">
                    {" "}
                    <span style={{ color: "red" }}> * </span>Full Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={user?.fullname || "Full name"}
                    className="btn btn-outline-light"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label className="input-title">
                    {" "}
                    <span style={{ color: "red" }}> * </span>Phone
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder={user?.phone || "Enter phone"}
                    className="btn btn-outline-light"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>
              </div>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label className="input-title"> Email address</Form.Label>
                <Form.Control
                  className="btn btn-outline-light"
                  type="email"
                  placeholder={user?.email || "Enter email"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="address">
                <Form.Label className="input-title">
                  {" "}
                  <span style={{ color: "red" }}> * </span>Address
                </Form.Label>
                <Form.Control
                  className="btn btn-outline-light"
                  as="textarea"
                  placeholder={user?.address || "Enter Address"}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>

              {err && <p className="mb-3 alert alert-danger noti">{err}</p>}
              <div className="d-flex justify-content-center">
                <div
                  className=" btn btn-md btn-light btn-outlight p-2 btn-auth"
                  disabled={loading}
                  onClick={handleAddress}
                >
                  {loading ? "Loading..." : "use this address"}
                </div>
              </div>
            </Form>
            <Card border="light" style={{ width: "100%", marginTop: "2rem" }}>
              <Card.Header>Select Delivery Method</Card.Header>
              <Card.Body>
                <Card.Title>
                  <Form>
                    <div key="radio" className="mb-3">
                      <Form.Check
                        label="Standard delivery"
                        checked
                        name="group1"
                        type="radio"
                        id="1"
                      />
                    </div>
                  </Form>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={4}>
            <Heading title="order summary" />

            <Card border="light" style={{ width: "100%" }}>
              <Card.Header>Select Payment Method</Card.Header>
              <Card.Body>
                <Card.Title>
                  <Form>
                    <div key="block-radio" className="mb-3">
                      <Form.Check
                        label="Cash On Delivery"
                        name="group1"
                        type="radio"
                        id="block-radio-1"
                        onChange={() => {
                          setMethod("cash");
                          setShippingFee(11000);
                        }}
                      />

                      <Form.Check
                        className="mt-4"
                        label="Credit/Debit Card"
                        name="group1"
                        type="radio"
                        id="block-radio-2"
                        onChange={() => {
                          setMethod("debit");
                          setShippingFee(0);
                        }}
                      />
                    </div>
                  </Form>
                </Card.Title>
              </Card.Body>
            </Card>
            <br />
            <Card border="light" style={{ width: "100%" }}>
              <Card.Header>Order Summary</Card.Header>
              <Card.Body>
                <Card.Title>
                  <div className="display-between">
                    <p>{`Subtotal (${cart.length} items)`}</p>{" "}
                    <b>
                      {`${finalPrice.toLocaleString()}`}
                      <sup>đ</sup>
                    </b>
                  </div>

                  <div className="display-between">
                    <p>Shipping Fee</p>
                    <b>
                      {`${shippingFee.toLocaleString()}`}
                      <sup>đ</sup>
                    </b>
                  </div>

                  <div className="display-between">
                    <p>Discount</p>
                    <b>
                      {`-0`}
                      <sup>đ</sup>
                    </b>
                  </div>

                  <div className="display-between">
                    <p>{`Total : `} </p>
                    <b>
                      {`${(shippingFee + finalPrice).toLocaleString()}`}
                      <sup>đ</sup>
                    </b>
                  </div>

                  <div
                    className=" display-center btn btn-md btn-warning btn-outlight p-2 "
                    disabled={loading}
                    onClick={handleBooking}
                    style={{ width: "100%" }}
                  >
                    {loading ? "Loading..." : "process to payment"}
                  </div>
                </Card.Title>
              </Card.Body>
            </Card>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header>
                <Modal.Title>
                  <FaCheckCircle
                    style={{ color: "green", marginRight: "10px" }}
                  />
                  Payment successfully!
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>
                  Order successfully with code{" "}
                  <a href={`/booking/${booking?.id}`}>${booking?.id}</a>{" "}
                </p>
                <p> See your order detail now </p>
              </Modal.Body>
              <Modal.Footer>
                <Link
                  to={`/booking/${booking?.id}`}
                  className="btn btn-outline btn-outlight btn-outline-success"
                  onClick={handleClose}
                >
                  {BUTTONS("confirm")}
                </Link>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default ShippingAddress;
