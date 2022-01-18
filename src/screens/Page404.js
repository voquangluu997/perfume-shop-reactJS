import React from "react";
import { Container } from "react-bootstrap";

const Page404 = () => {
  return (
    <Container fluid>
      <div className="page404 col-12 text-center">
        <p> 404 ERROR !</p>
        <p>PAGE NOT FOUND</p>
        <small>
          The page you are requesting does not exist, please check your url and
          try it later
        </small>
      </div>
    </Container>
  );
};

export default Page404;
