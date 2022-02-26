import React from "react";
import { Container } from "react-bootstrap";

import { FaFacebook, FaGithub, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  return (
    <Container fluid style={{ marginLeft: "-12px" }}>
      <div className="social-icons ">
        <ul>
          <a target="_blank" href="https://www.facebook.com/quangluu997">
            <li>
              <FaFacebook />
            </li>
          </a>
          <a
            target="_blank"
            href="https://github.com/voquangluu997?tab=repositories"
          >
            <li>
              <FaGithub />
            </li>
          </a>
          <a target="_blank" href="mailto:voquangluu997@gmail.com">
            <li>
              <FaEnvelope />
            </li>
          </a>
        </ul>
      </div>
    </Container>
  );
};

export default Contact;
