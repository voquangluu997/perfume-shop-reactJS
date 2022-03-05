import React from "react";
import { FaStar } from "react-icons/fa";

const Star = ({ avg }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="display-center" style={{ fontSize: "1rem" }}>
      {stars.map((star, i) => {
        return (
          <FaStar
            key={i}
            className=""
            color={i + 1 <= Math.round(avg) ? "yellow" : "white"}
          />
        );
      })}
    </div>
  );
};

export default Star;
