import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./WeightSetUp.css";
import FlagIcon from "@mui/icons-material/Flag";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import DoneAllIcon from "@mui/icons-material/DoneAll";

const WeightSetUp = ({ setNeedSetUp }) => {
  const LbToKg = 0.4535;
  const navigate = useNavigate();
  const [userId, setUserId] = useState();
  const [currentDate, setCurrentDate] = useState("");
  const [weight, setWeight] = useState(null); // Default weight
  const [weightFilled, setWeightFilled] = useState(true);
  const [goalWeight, setGoalWeight] = useState(null);
  const [goalWeightFilled, setGoalWeightFilled] = useState(true);

  const [unit, setUnit] = useState("LB"); // Default unit
  const [hasClickSetGoal, setHasClickSetGoal] = useState(false);

  const sliderStyle = {
    left: unit === "LB" ? "39%" : "50%", // Moves the slider based on unit
    transition: "left 0.3s ease-in-out", // Smooth transition for left property
  };

  useEffect(() => {
    const date = new Date();
    const year = String(date.getFullYear()); // Get the last two digits of the year
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    setCurrentDate(formattedDate);
  }, []);

  const handleWeightSubmit = () => {
    if (!weight || isNaN(weight) || parseInt(weight) < 0) {
      setWeightFilled(false);
      return;
    }
    setHasClickSetGoal(true);
    setGoalWeight(weight);
    updateUserWeightDB();
  };

  const handleGoalWeightSubmit = () => {
    if (!goalWeight || isNaN(goalWeight)) {
      setGoalWeightFilled(false);
      return;
    }
    setNeedSetUp(false);
    updateUserGoalWeightDB();
  };

  const returnToHealth = () => {
    navigate("/health");
  };

  const updateUserWeightDB = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await fetch("http://localhost:5001/health/weight", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, weight, currentDate, unit }),
        });
        

        // console.log("Response Username ", response);
      } else {
        console.error("No token found");
      }
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  const updateUserGoalWeightDB = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await fetch(
          "https://us-central1-fitness-app-abbcb.cloudfunctions.net/api/health/weight/goal",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, goalWeight, unit }),
          }
        );
      } else {
        console.error("No token found");
      }
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const response = await axios.get("https://us-central1-fitness-app-abbcb.cloudfunctions.net/api/homepage", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = response.data;
          setUserId(data._id);
          // console.log("Response Username ", response);
        } else {
          console.error("No token found");
        }
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };
    fetchUser();
  }, []);

  return !hasClickSetGoal ? (
    <div className="weight-setup">
      <div id="back-to-health">
        <KeyboardDoubleArrowLeftOutlinedIcon
          onClick={() => returnToHealth()}
          style={{ cursor: "pointer", fontSize: "2.5em", color: "#004352" }}
        />
      </div>

      <div className="weight-setup-header">
        <h1 id="workout-header-title">What Is Your Current Weight?</h1>
      </div>
      <div className="weight-setup-middle">
        <input
          type="text"
          value={weight}
          onChange={(e) => {
            setWeight(e.target.value);
            setWeightFilled(true);
          }}
          className="weight-setup-weight-input"
        />
        <div
          className={`weight-setup-unit-toggle ${
            unit === "LB" ? "active-lb" : "active-kg"
          }`}
        >
          <div className="slider" style={sliderStyle}></div>
          <div
            className={`weight-setup-unit-button-lb ${
              unit === "LB" ? "active" : ""
            }`}
            onClick={() => {
              setUnit("LB");
              if (weight && unit !== "LB")
                setWeight((weight / LbToKg).toFixed(1));
            }}
          >
            <p className="unit" style={{ position: "relative", zIndex: "3" }}>
              LB
            </p>
          </div>
          <div
            className={`weight-setup-unit-button-kg ${
              unit === "KG" ? "active" : ""
            }`}
            onClick={() => {
              setUnit("KG");
              if (weight && unit !== "KG")
                setWeight((weight * LbToKg).toFixed(1));
            }}
          >
            <p className="unit" style={{ position: "relative", zIndex: "3" }}>
              KG
            </p>
          </div>
        </div>
        <button
          className="weight-setup-set-goal-btn"
          onClick={handleWeightSubmit}
        >
          <DoneAllIcon style={{ fontSize: "2.5em", color: "#f1f4f5" }} />
          <p>Done</p>
        </button>
        {!weightFilled && (
          <span style={{ color: "red" }}>Please Input A Valid Weight</span>
        )}
      </div>
    </div>
  ) : (
    <div className="weight-setup">
      <div id="back-to-health">
        <KeyboardDoubleArrowLeftOutlinedIcon
          onClick={() => setHasClickSetGoal(false)}
          style={{ cursor: "pointer", fontSize: "2.5em", color: "#004352" }}
        />
      </div>

      <div className="weight-setup-header">
        <h1 id="workout-header-title">Wanna Set A Goal</h1>
      </div>
      <div className="weight-setup-middle">
        <input
          type="text"
          value={goalWeight}
          onChange={(e) => {
            setGoalWeight(e.target.value);
            setGoalWeightFilled(true);
          }}
          className="weight-setup-weight-input"
        />
        <div
          className={`weight-setup-unit-toggle ${
            unit === "LB" ? "active-lb" : "active-kg"
          }`}
        >
          <div className="slider" style={sliderStyle}></div>
          <div
            className={`weight-setup-unit-button-lb ${
              unit === "LB" ? "active" : ""
            }`}
            onClick={() => {
              setUnit("LB");
              console.log(goalWeight);

              if (goalWeight && unit !== "LB")
                setGoalWeight((goalWeight / LbToKg).toFixed(1));
            }}
          >
            <p className="unit" style={{ position: "relative", zIndex: "3" }}>
              LB
            </p>
          </div>
          <div
            className={`weight-setup-unit-button-kg ${
              unit === "KG" ? "active" : ""
            }`}
            onClick={() => {
              setUnit("KG");
              console.log(goalWeight);
              if (goalWeight && unit !== "KG")
                setGoalWeight((goalWeight * LbToKg).toFixed(1));
            }}
          >
            <p className="unit" style={{ position: "relative", zIndex: "3" }}>
              KG
            </p>
          </div>
        </div>
        <button className="weight-setup-set-goal-btn" onClick={handleGoalWeightSubmit}>
          <FlagIcon style={{ fontSize: "2.5em", color: "#f1f4f5" }} />
          <p>Set Your Goal</p>
        </button>
        {!goalWeightFilled && (
          <span style={{ color: "red" }}>Please Input A Valid Weight</span>
        )}
        <p
          onClick={() => setNeedSetUp(false)}
          style={{ color: "grey", cursor: "pointer" }}
        >
          Set Up Later in Goals
        </p>
      </div>
    </div>
  );
};

export default WeightSetUp;
