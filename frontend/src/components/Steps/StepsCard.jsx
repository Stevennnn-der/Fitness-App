import React from "react";
import "./StepsCard.css";

const Steps = () => {
  return (
    <div className="steps">
      <div className="container">
        <div className="icon">
          <i
            className="fa-solid fa-stairs"
            style={{ color: "#E4EAF3", fontSize: "1.5rem" }}
          />
        </div>
        <p>Steps</p>
      </div>
    </div>
  );
};

export default Steps;
