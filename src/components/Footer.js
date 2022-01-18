import React from "react";
import { Row, Container, Col } from "react-bootstrap";
import { Heading } from ".";
import { FaPhoneAlt, FaEnvelope, FaInternetExplorer } from "react-icons/fa";

const Footer = () => {
  return (
    <Container fluid className="contact" id="contact">
      <div className="heading-underline-long"></div>
      <Container fluid className="text-center contact-child">
        <Heading title="contact me" />
        <p>
          <b>60 Ngo Sy Lien,Hoa Khanh Bac, Lien Chieu district, Da Nang city</b>{" "}
        </p>
        <Row className="row container-fluid">
          <Col className="custom-contact">
            <FaPhoneAlt /> <p>033 5963 824</p>
          </Col>

          <Col className="custom-contact">
            <FaEnvelope />
            <p>
              <a href="mailto:voquangluu997@gmail.com" className="text-white">
                voquangluu997@gmail.com
              </a>
            </p>
          </Col>

          <Col>
            <FaInternetExplorer />
            <p>
              <a
                target="_blank"
                href="https://voquangluu997.github.io/my_resume/"
                className="text-white"
              >
                voquangluu997.github.io/my_resume
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Footer;
