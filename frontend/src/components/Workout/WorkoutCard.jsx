import React from "react";
import "./WorkoutCard.css";

const Workout = () => {
  return (
    <div className="workout">
      <div className="container">
        <div className="icon">
          <i
            className="fa-solid fa-dumbbell"
            style={{ color: "#E4EAF3", fontSize: "1.5rem" }}
          />
        </div>
        <p>Workout</p>
      </div>
    </div>
  );
};

export default Workout;
