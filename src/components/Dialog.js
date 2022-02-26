import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { CART_MESSAGES, BUTTONS } from "../constant";
import { CartItem } from "../components";

const Dialog = ({ item, isShow, onSubmit }) => {
  const [show, setShow] = useState(isShow);
  const handleSubmit = () => {
    onSubmit({ show });
  };
  const handleClose = () => {
    setShow(false);
  };

  return (
    <Modal show={isShow} onHide={(handleClose, handleSubmit)}>
      <Modal.Header>
        <Modal.Title>{CART_MESSAGES("added")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CartItem item={item} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={(handleClose, handleSubmit)}>
          {BUTTONS("keepShopping")}
        </Button>
        <Button variant="outline-success" onClick={(handleClose, handleSubmit)}>
          {BUTTONS("viewCart")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Dialog;
