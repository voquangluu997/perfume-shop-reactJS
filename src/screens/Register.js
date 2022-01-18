import React, { useState } from "react";
import axios from "axios";
import { Form, Container, Row } from "react-bootstrap";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/profiles`,
    };
    setErr(null);
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        email,
        password,
        fullname,
        phone,
        address
      })
      .then(async (response) => {
        setLoading(false);
        props.history.push("/login");
      })
      .catch((error) => {
        setLoading(false);
        if (
          error.response &&
          (error.response.status === 401 ||
            (error.response.status === 400) | (error.response.status === 409))
        ) {
          typeof error.response.data.message == "object"
            ? setErr(`Register failed : ${error.response.data.message[0]}`)
            : setErr(`Register failed : ${error.response.data.message}`);
        } else {
          setErr("Something went wrong, Please try again later");
        }
      });
  };
  return (
    <Container fluid>
      <div>
        <h3 className="heading">Đăng ký</h3>
        <div className="heading-underline"></div>
      </div>

      <Container>
        <Row sm={1} md={2} className="justify-content-md-center">
          <Form>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label className="input-title">Email address</Form.Label>
              <Form.Control
                className="btn btn-outline-light"
                type="email"
                className="btn btn-outline-light"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="input-title">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                className="btn btn-outline-light"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="fullName">
              <Form.Label className="input-title">Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Full name"
                className="btn btn-outline-light"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="phone">
              <Form.Label className="input-title">Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone"
                className="btn btn-outline-light"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="Address">
              <Form.Label className="input-title">Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                className="btn btn-outline-light"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group> */}


            {err && <p className="mb-3 alert alert-danger noti">{err}</p>}
            <div className="d-flex justify-content-center">
              <button
                className=" btn btn-md btn-light btn-outlight p-2 btn-auth"
                type="submit"
                disabled={loading}
                onClick={handleRegister}
              >
                {loading ? "Loading..." : "Register"}
              </button>
            </div>
            <a href="/login" className="d-flex mt-3 alert-link text-light link">
              {" "}
              Tôi đã đăng ký tài khoản trước đó{" "}
            </a>
          </Form>
        </Row>
      </Container>
    </Container>
  );
};

export default Register;
