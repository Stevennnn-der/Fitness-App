import React, { useEffect } from "react";
import "./Logout.css";
import { useNavigate } from "react-router-dom";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('accessToken');
  }, [])

  return (
    <div className="logout">
      <div className="logout-header">
        <div id="fitness-title">
          <FitnessCenterIcon style={{ fontSize: "3.5em", color: '#F0F3F8' }} />
          <h2>Fitness App</h2>
        </div>
        <p id='logout-p'>You are Logged Out!</p>
      </div>
      <div className="logout-middle">
        <p id="logout-middle-p">Your Session Has Expired. Thank You for Using The Fitness App!</p>
        <p id="logout-middle-p">Feel Free to Return to The Main Page!</p>
        <button className="logout-btn" onClick={() => navigate('/')}>
          <FlightTakeoffIcon style={{ color: '#f5f6f6'}}/>
          <p id="logout-btn-p">Return Main Page</p>
        </button>
      </div>
    </div>
  );
};

export default Logout;
