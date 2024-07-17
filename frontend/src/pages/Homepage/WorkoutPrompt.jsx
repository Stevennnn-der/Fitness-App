import React, { useEffect, useState } from "react";
import "./WorkoutPrompt.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import FlashOnIcon from '@mui/icons-material/FlashOn';

export const WorkoutPrompt = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const response = await axios.get("http://localhost:5001/homepage", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // console.log("Response Username ", response);
          setUsername(response.data.username);
        } else {
          console.error("No token found");
        }
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="workout-prompt">
      <div className="workout-prompt-header">
        <h1>Let's GET MOVING, {username}!</h1>
        <p>Build Your Workout Plan</p>
      </div>
      <div className="workout-prompt-middle">
        <button
          className='workout-prompt-button'
          onClick={() => navigate('/workout')}
        >
          <FlashOnIcon style={{ fontSize: '2.5em', color: '#004352'}} />
          <p>Get Started</p>
        </button>
      </div>
    </div>
  );
};
