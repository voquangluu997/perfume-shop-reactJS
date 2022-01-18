import React from "react";
import { Card } from "react-bootstrap";

const CardPerfumeDetail = ({ perfume }) => {
  return (
    <Card style={{ width: "20rem", border: "none" }}>
      <Card.Img
        variant="top"
        src={
          perfume?.image == "default"
            ? "/uploads/perfume-default.jpg"
            : perfume.image
        }
        className="perfume-cover get-shadow"
      />
      <Card.Body className="d-flex justify-content-center"></Card.Body>
    </Card>
  );
};

export default CardPerfumeDetail;
