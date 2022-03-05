import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div className="display-center">
      <Spinner animation="border" className="loading" />
    </div>
  );
};

export default Loading;
