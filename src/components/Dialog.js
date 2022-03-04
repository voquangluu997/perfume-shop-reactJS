import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { CART_MESSAGES, BUTTONS } from "../constant";
import { CartItem } from "../components";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const Dialog = ({ item, isShow, onSubmit }) => {
  const [show, setShow] = useState(isShow);
  const handleSubmit = () => {
    onSubmit({ show });
  };
  const handleClose = () => {
    setShow(false);
    window.location.reload();
  };

  return (
    <Modal show={isShow} onHide={(handleClose, handleSubmit)}>
      <Modal.Header>
        <Modal.Title>
          {" "}
          <FaCheckCircle style={{ color: "green", marginRight: ".5rem" }} />
          {CART_MESSAGES("added")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CartItem item={item} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-dark"
          onClick={() => {
            setShow(false);
            window.location.reload();
            onSubmit({ show });
          }}
        >
          {BUTTONS("keepShopping")}
        </Button>
        <Link
          to="/cart"
          className="btn btn-outline btn-outlight btn-outline-success"
          onClick={() => {
            setShow(false);
            onSubmit({ show });
          }}
        >
          {BUTTONS("viewCart")}
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

export default Dialog;
