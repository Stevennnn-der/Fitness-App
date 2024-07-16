import React from "react";
import "./HealthCard.css";

const Health = () => {
  return (
    <div className="health">
      <div className="container">
        <div className="icon">
          <i
            className="fa-solid fa-heart"
            style={{ color: "#E4EAF3", fontSize: "1.5rem" }}
          />
        </div>
        <p>Health</p>
      </div>
    </div>
  );
};

export default Health;
