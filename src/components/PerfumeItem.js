import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const PerfumeItem = ({ perfume }) => {
  return (
    <Card style={{ width: "18rem", border: "none" }}>
      <Link to={`/perfumes/${perfume.id}`}>
        <Card.Img
          variant="top"
          src={
            perfume?.cover == "default" ? "/uploads/perfume-default.jpg" : perfume.image
          }
          className="perfume-cover get-shadow"
        />
      </Link>
      <Card.Body className="d-flex justify-content-center">
        <div style={{ position: "relative", width: "100%", height: "5rem" }}>
          <Card.Title className="d-flex justify-content-center align-items-center">
            {perfume?.name.length > 25
              ? `${perfume.name.slice(0, 22)}...`
              : perfume.name}
          </Card.Title>
          <small className="d-flex justify-content-center align-items-center">
            ({perfume.brand ? perfume.brand.name : ""})
          </small>
          <button
            style={{
              width: "60%",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
            className=" btn btn-light d-flex justify-content-center align-items-center"
          >
            Price :{perfume?.price}$
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PerfumeItem;
