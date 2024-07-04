import React from "react";
import "./CaloriesCard.css";

const Calories = () => {
  return (
    <div className="calories">
      <div className="container">
        <div className="icon">
          <i
            className="fa-solid fa-fire"
            style={{ color: "#E4EAF3", fontSize: "1.5rem" }}
          />
        </div>
        <p>Calories</p>
      </div>
    </div>
  );
};

export default Calories;
