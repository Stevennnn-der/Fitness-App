import React from "react";
import "./Intropage.css";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { useNavigate } from "react-router-dom";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LoginIcon from "@mui/icons-material/Login";

const Intropage = () => {
  const navigate = useNavigate();

  return (
    <div className="intropage">
      <div className="left-section">
        <div id="intro-fitness-title">
          <FitnessCenterIcon style={{ fontSize: "5.5em", color: '#013642' }} />
          <h2 id="intro-h2">Fitness App</h2>
        </div>
      </div>
      <div className="right-section">
        <h1 style={{ color: "white" }}>Hello!</h1>
        <div className="slogan">
          <h2>Welcome to Your Best Self.</h2>
          <h2>Let's GET MOVING!</h2>
        </div>

        {/* <div className="intro-text">
          <p>Already have an account? Login!</p>
          <p>Don't have an account? Sign Up!</p>
        </div> */}

        <div className="intro-click-btn">
          <button className="login-btn" onClick={() => navigate("/login")}>
            <LoginIcon style={{ color: '#f5f6f6' }} />
            <p id="login-btn-p">Login</p>
          </button>

          <button className="signup-btn" onClick={() => navigate("/signup")}>
            <AssignmentIcon style={{ color: '#f5f6f6' }}/>
            <p id="signup-btn-p">Sign Up</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Intropage;
