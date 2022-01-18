import React from "react";
import { Container} from "react-bootstrap";

const Heading = ({ title }) => {
  return (
    <Container fluid>
      <div>
        <h3 className="heading">{title}</h3>
        <div className="heading-underline"></div>
      </div>
    </Container>
  );
};

export default Heading;
