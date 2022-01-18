import React, { useState, useEffect } from "react";
import { setUserSession } from "../Utils/Common";
import axios from "axios";
import { Form, Container, Row } from "react-bootstrap";
import { Heading } from "../components";
import { FaFacebookF, FaGoogle } from "react-icons/fa";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [authMess, setAuthMess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   setAuthMess(null);
  //   props.history.location.state
  //     ? setAuthMess(props.history.location.state.authMess)
  //     : setAuthMess(null);
  // }, [loading]);

  const handleGoogleLogin = async () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/google`,
      "mywindow",
      "location=1,status=1,scrollbars=1, width=800,height=800"
    );
    window.addEventListener("message", (message) => {
      if (message) {
        console.log(message);
        setUserSession(
          message.data.userInfo.accessToken,
          message.data.userInfo.user
        );

        props.history.push("/");
      } else {
      }
      return message;
    });
  };

  const handleFBLogin = async () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/facebook`,
      "mywindow",
      "location=1,status=1,scrollbars=1, width=800,height=800"
    );
    window.addEventListener("message", (message) => {
      if (message) {
        setUserSession(
          message.data.userInfo.accessToken,
          message.data.userInfo.user
        );
        props.history.push("/");
      } else {
      }
      return message;
    });
  };

  const handleLogin = () => {
    props.history.push("/");

    setErr(null);
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        email,
        password,
      })
      .then(async (response) => {
        console.log({ response });
        setLoading(false);
        let user = await axios.get(`${process.env.REACT_APP_API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${response.data.accessToken}`,
          },
        });
        console.log(user);
        setUserSession(response.data.accessToken, user.data);
        setUserSession('x','y');
        props.history.push("/");
      })
      .catch((error) => {
        setLoading(false);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 400)
        ) {
          typeof error.response.data.message == "object"
            ? setErr(`Login failed : Email or password is incorrect`)
            : setErr(`Login failed : Email or password is incorrect`);
        } else {
          setErr("Something went wrong, Please try again later");
        }
      });
  };

  return (
    <Container fluid>
      {" "}
      <Heading title="Đăng nhập"></Heading>
      <Container>
        <Row sm={1} md={2} className="justify-content-md-center">
          <Form>
            {authMess && (
              <p className="mb-3 alert alert-warning new-noti">{authMess}</p>
            )}
            <Form.Group className="mb-3" controlId="email">
              <Form.Label className="input-title">Email address</Form.Label>
              <Form.Control
                className="btn btn-outline-light"
                type="email"
                placeholder=" Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // className="input"
              />
              <small>We'll never share your email with anyone else.</small>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="input-title">Password</Form.Label>
              <Form.Control
                className="btn btn-outline-light"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            {err && <p className="mb-3 alert alert-danger noti">{err}</p>}
            <div className="d-flex justify-content-between">
              <button
                className=" btn btn-md btn-light btn-outlight p-2 btn-auth"
                type="submit"
                disabled={loading}
                onClick={handleLogin}
              >
                {loading ? "Loading..." : "LOGIN"}
              </button>
              <a
                href="/forgot_password"
                className="d-flex mt-3 alert-link text-light link"
                role="alert"
                disabled=""
              >
                Forgotten password?
              </a>
            </div>
            <div></div>
          </Form>
        </Row>
        <Row sm={1} md={2} className="justify-content-center">
          <div>
            <div className="d-flex justify-content-around">
              <button
                className="btn btn-social btn-facebook"
                onClick={handleFBLogin}
              >
                <FaFacebookF />
                Login With Facebook
              </button>
              <button
                onClick={handleGoogleLogin}
                className="btn btn-social btn-google"
              >
                <FaGoogle className="mr-4" />
                Login With Google
              </button>
            </div>
            <a
              href="/register"
              className="d-flex mt-3 alert-link text-light link"
              role="alert"
              disabled=""
            >
              Đăng ký nếu chưa có tài khoản
            </a>
          </div>
        </Row>
      </Container>
    </Container>
  );
};

export default Login;
