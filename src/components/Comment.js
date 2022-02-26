import React from "react";
import { Row, Col } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

const Comment = ({ review }) => {
  var stars = [1, 2, 3, 4, 5];
  return (
    <Row className="mb-4">
      <Col sm={1}>
        <div
          style={{
            backgroundImage: `url("/uploads/default-male.jpeg")`,
          }}
          className="user-avatar"
        ></div>
      </Col>
      <Col sm={11}>
        <div>
          {stars.map((star, i) => {
            return (
              <FaStar
                key={i}
                className="review-star-right"
                color={i + 1 <= review.rating ? "yellow" : "white"}
              />
            );
          })}
        </div>
        <div className="user-name">
          <b>{review.user.fullname}</b>
        </div>
        <div>{review.comment}</div>
      </Col>
    </Row>
  );
};

export default Comment;
