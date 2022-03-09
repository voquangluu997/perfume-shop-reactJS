import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { StarAvg } from "../components";

const PerfumeItem = ({ perfume, reviews }) => {
  return (
    <Card style={{ width: "18rem", border: "none", marginBottom:"2rem" }}>
      <Link to={`/perfumes/${perfume.id}`}>
        <Card.Img
          variant="top"
          src={
            perfume?.cover == "default"
              ? "/uploads/perfume-default.jpg"
              : perfume.image
          }
          className="perfume-cover get-shadow"
        />
      </Link>
      <Card.Body className="d-flex justify-content-center">
        <div style={{  width: "100%", height: "5rem" }}>
          <Card.Title className="d-flex justify-content-center align-items-center">
            <p style= {{fontSize:"1.2rem"}}>
              {" "}
              {perfume?.name.length > 30
                ? `${perfume.name.slice(0, 30)}...`
                : perfume.name}
              <small>{` (${perfume.brand ? perfume.brand.name : ""})`}</small>
            </p>
          </Card.Title>
          <Card.Text style={{ marginTop: "-1rem" }}>
            <div className="display-around">
              <b>
                {`${perfume?.price.toLocaleString()}`} <sup>đ</sup>
              </b>

              <b style={{ color: "#11bba3" }}>
                <del>{`${(perfume?.price * 1.05).toLocaleString()}`}</del>{" "}
                <sup>đ</sup>
              </b>
            </div>
            <div className="display-center">
              <StarAvg avg={reviews?.ratingAvg} />
              <span>({reviews?.total})</span>
            </div>
          </Card.Text>
        </div>
      </Card.Body>


    </Card>
  );
};

export default PerfumeItem;
