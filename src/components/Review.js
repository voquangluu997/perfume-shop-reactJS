import { Container, Row, Col } from "react-bootstrap";
import { FaStar, FaCaretRight } from "react-icons/fa";
import React, { useState } from "react";
import { Comment, Dialog } from ".";
import { BUTTONS, REVIEW_ERRORS } from "../constant";
import { reviewApi } from "../api";

const Review = ({ listReview, searchKey }) => {
  var stars = [1, 2, 3, 4, 5];
  const [numStar, setNumStar] = useState(5);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState(listReview);
  console.log({ listReview });
  const [err, setErr] = useState(null);
  // const [show, setShow] = useState(false);

  const handleReview = async () => {
    try {
      const addReview = await reviewApi.add({
        comment,
        rating: numStar,
        perfumeId: reviews.data.perfumeId,
      });
      listReview = await reviewApi.getAll(reviews.data.perfumeId, searchKey);
      setReviews(listReview);
    } catch (error) {
      alert(REVIEW_ERRORS(error.response.data.message));
    }
  };

  return (
    <Container fluid className="border-white-box mt-4">
      <h3> {`Rating & Reviews`} </h3>
      <div className="heading-small"></div>

      <Row className="rating-avg display-center">
        <Col sm={4}>
          <div></div>
          <div className="review-left">
            <h2>{reviews.data.ratingAvg}/5</h2>
          </div>

          <div className="review-left">
            {stars.map((star, i) => {
              return (
                <FaStar
                  key={i}
                  className="review-star-left"
                  color={
                    i + 1 <= Math.round(reviews.data.ratingAvg)
                      ? "yellow"
                      : "white"
                  }
                />
              );
            })}
          </div>
        </Col>
        <Col sm={8} className="review-right">
          <div className="review-row mt-2">
            <div className="display-start">
              {stars.map((star, i) => {
                return (
                  <FaStar
                    key={i}
                    className="review-star-right"
                    color={"yellow"}
                  />
                );
              })}
              <label className="review-text"> ({reviews.data.five}) </label>
              <div className="heading-review"></div>
            </div>
          </div>

          <div className="review-row">
            <div className="display-start">
              {stars.map((star, i) => {
                return (
                  <FaStar
                    key={i}
                    className="review-star-right"
                    color={star < 5 ? "yellow" : "white"}
                  />
                );
              })}
              <label className="review-text"> ({reviews.data.four}) </label>
              <div className="heading-review"></div>
            </div>
          </div>

          <div className="review-row">
            <div className="display-start">
              {stars.map((star, i) => {
                return (
                  <FaStar
                    key={i}
                    className="review-star-right"
                    color={star < 4 ? "yellow" : "white"}
                  />
                );
              })}
              <label className="review-text"> ({reviews.data.three}) </label>
              <div className="heading-review"></div>
            </div>
          </div>

          <div className="review-row">
            <div className="display-start">
              {stars.map((star, i) => {
                return (
                  <FaStar
                    key={i}
                    className="review-star-right"
                    color={star < 3 ? "yellow" : "white"}
                  />
                );
              })}
              <label className="review-text"> ({reviews.data.two}) </label>
              <div className="heading-review"></div>
            </div>
          </div>

          <div className="review-row">
            <div className="display-start">
              {stars.map((star, i) => {
                return (
                  <FaStar
                    key={i}
                    className="review-star-right"
                    color={star < 2 ? "yellow" : "white"}
                  />
                );
              })}
              <label className="review-text"> ({reviews.data.one}) </label>
              <div className="heading-review"></div>
            </div>
          </div>
        </Col>
      </Row>
      <div className="write-review">
        <div className="display-start mt-3 container fluid">
          <span className="p-2"> {`1. Rating this product: `}</span>
          <div className="review-left">
            {stars.map((star, i) => {
              return (
                <FaStar
                  key={i}
                  onClick={() => {
                    setNumStar(i + 1);
                  }}
                  className="review-star-left"
                  color={i < numStar ? "yellow" : "white"}
                />
              );
            })}
          </div>
        </div>
        <textarea
          className="m-2 review-comment-box btn-light btn container-fluid"
          type="textarea"
          placeholder="Thinking about this product..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="btn btn-auth btn-lg btn-light btn-outlight pl-4 pr-4 pt-2 pb-2"
          type="submit"
          onClick={handleReview}
        >
          <div className="display-center">
            <span>{BUTTONS("send")}</span>
            <FaCaretRight className="send-icon" />
          </div>
        </button>
      </div>

      <div className="p-3">
        {reviews.data.items.map((item, i) => {
          return <Comment key={i} review={item}></Comment>;
        })}
      </div>
      {/* <Dialog title="title" content="content" isShow={show} /> */}
    </Container>
  );
};

export default Review;
