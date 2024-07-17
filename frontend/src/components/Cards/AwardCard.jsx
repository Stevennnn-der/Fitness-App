import React from "react";
import "./AwardCard.css";

const AwardCard = () => {
  return (
    <div className="awardcard">
      <div className="awardcard-container">
        <div className="awardcard-icon">
          <i
            className="fa-solid fa-medal"
            style={{ color: "#E4EAF3", fontSize: "1.5rem" }}
          />
        </div>
        <p>Award</p>
      </div>
    </div>
  );
};

export default AwardCard;
