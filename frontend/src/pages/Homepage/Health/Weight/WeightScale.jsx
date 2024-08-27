import React, { useState, useEffect } from "react";
import "./WeightScale.css";

const WeightScale = ({
  userId,
  currentDate,
  weight,
  handleWeightChange,
  handleScroll,
  scaleRef,
  setWeight,
  setWeightScale,
  weightFilled,
  setWeightFilled,
  hasSaved,
  setHasSaved,
  updateDataChart,
}) => {

  const LbToKg = 0.4535;
  const [unit, setUnit] = useState("LB"); // Default unit


  const sliderStyle = {
    left: unit === "LB" ? "39%" : "50%", // Moves the slider based on unit
    transition: "left 0.3s ease-in-out", // Smooth transition for left property
  };

  const hitEnter = (event) => {
    if (event.key === "Enter") {
      setWeightScale(event.target.value);
    }
  };

  const handleSaveWeight = async () => {
    if (!weight || isNaN(weight) || parseInt(weight) < 0) {
      setWeightFilled(false);
      return;
    }
    setHasSaved(true);
    
    try {
      const response = await fetch("https://us-central1-fitness-app-abbcb.cloudfunctions.net/api/health/weight", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentDate, userId, weight, unit }),
      });
      
      updateDataChart();
    } catch (error) {
      console.error("Failed to Save the Weight! ", error);
    }
  };

  useEffect(() => {
    setWeightScale(weight);
  }, []);
  return (
    <div className="weight-left-bottom">
      <div className="weight-date">
        <p>{currentDate}:</p>
      </div>

      <input
        type="text"
        value={weight}
        onChange={(e) => {
          setWeight(e.target.value);
          setWeightFilled(true);
          setHasSaved(false);
        }}
        onKeyDown={hitEnter}
        className="weight-scale-weight-input"
      />
      <div
        className={`weight-setup-unit-toggle ${
          unit === "LB" ? "active-lb" : "active-kg"
        }`}
      >
        <div className="weight-scale-slider" style={sliderStyle}></div>
        <div
          className={`weight-scale-unit-button-lb ${
            unit === "LB" ? "active" : ""
          }`}
          onClick={() => {
            setUnit("LB");
            if (weight && unit !== "LB") {
              setWeight((weight / LbToKg).toFixed(1));
              setWeightScale(weight / LbToKg);
            }
          }}
        >
          <p className="unit" style={{ position: "relative", zIndex: "3" }}>
            LB
          </p>
        </div>
        <div
          className={`weight-scale-unit-button-kg ${
            unit === "KG" ? "active" : ""
          }`}
          onClick={() => {
            setUnit("KG");
            if (weight && unit !== "KG") {
              setWeight((weight * LbToKg).toFixed(1));
              setWeightScale(weight * LbToKg);
            }
          }}
        >
          <p className="unit" style={{ position: "relative", zIndex: "3" }}>
            KG
          </p>
        </div>
      </div>

      <div
        className="weight-scale-container"
        onScroll={handleScroll}
        ref={scaleRef}
      >
        <input
          type="range"
          min="0"
          max="300"
          step="0.1"
          value={weight}
          onChange={handleWeightChange}
          className="weight-slider"
        />
        <div className="weight-scale">
          {[...Array(301)].map((_, i) => (
            <div key={i} className="weight-scale-mark">
              {i % 10 === 0 ? (
                <div className="weight-scale-label">
                  <div
                    className="weight-number"
                    style={{
                      top: i === parseInt(weight) ? "-2.2em" : "-1.9em",
                    }}
                  >
                    {i}
                  </div>
                  <p
                    id="dark-scale"
                    style={{
                      color: i === parseInt(weight) ? "red" : "black",
                      fontSize: i === parseInt(weight) ? "5em" : "3.5em",
                    }}
                  >
                    |
                  </p>
                </div>
              ) : (
                <p
                  id="grey-scale"
                  style={{
                    color: i === parseInt(weight) ? "red" : "grey",
                    fontSize: i === parseInt(weight) ? "3em" : "1.5em",
                  }}
                >
                  |
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      <button className="weight-save-button" onClick={handleSaveWeight}>
        <p>Save</p>
      </button>

      {!weightFilled && (
        <span style={{ color: "red" }}>Please Input a Valid Weight </span>
      )}
      {hasSaved && (
        <span style={{ color: "green" }}>Saved Successfully! </span>
      )}
    </div>
  );
};

export default WeightScale;
