import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DataTable from "./DataTable";
import "./WorkoutPlan.css";
import { useNavigate } from "react-router-dom";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import DoneAllTwoToneIcon from "@mui/icons-material/DoneAllTwoTone";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const actions = [
  "Chest",
  "Shoulder",
  "Back",
  "Leg",
  "Arm",
  "Cardio",
  "Abs",
  "Other",
];

const WorkoutPlan = () => {
  const { date } = useParams();
  const [bodyPart, setBodyPart] = useState([]);
  const [userId, setUserId] = useState("");
  const [numRow, setNumRow] = useState(4);
  const [numCol, setNumCol] = useState(4);
  const [data, setData] = useState([[]]);
  const [submitMessage, setSubmitMessage] = useState('');

  const navigate = useNavigate();

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
          setUserId(response.data._id);
        } else {
          console.error("No token found");
        }
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    fetchUser();
  }, []);

  const updateBodyPart = (event) => {
    const {
      target: { value },
    } = event;
    setBodyPart(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const returnToWorkout = () => {
    navigate("/homepage/workout");
  };

  const writeWorkoutTable = async () => {
    if (
      !userId ||
      !date ||
      numRow === undefined ||
      numCol === undefined ||
      !bodyPart
    ) {
      setSubmitMessage("Missing required fields");
      return; // Early return if data is incomplete
    }
  
    try {
      const response = await fetch(
        `http://localhost:5001/homepage/workout/${date}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            date,
            numRow,
            numCol,
            bodyPart,
            data,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const datas = await response.json(); // Assuming the server responds with JSON data
      setSubmitMessage("Saved Successfully!");
      console.log("Workout data saved successfully:", datas);
    } catch (error) {
      console.error("Failed to write workout data:", error);
    }
  };
  return (
    <div className="workout-plan">
      <KeyboardDoubleArrowLeftOutlinedIcon
        id="go-to-info"
        onClick={() => returnToWorkout()}
        style={{ cursor: "pointer", fontSize: "2.5em", color: "#004352" }}
      />
      <div className="workout-plan-header">
        <h2 id="title">Workout Plan for {date}</h2>
      </div>
      <div className="select-workout-type">
        <FormControl sx={{ m: 1, width: 300, minWidth: 80 }}>
          <InputLabel id="demo-multiple-checkbox-label">
            Choose Training Part
          </InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={bodyPart}
            onChange={updateBodyPart}
            input={<OutlinedInput label="Choose Training Parts" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {actions.map((action) => (
              <MenuItem key={action} value={action}>
                <Checkbox checked={bodyPart.indexOf(action) > -1} />
                <ListItemText primary={action} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="input-table">
        <DataTable
          date={date}
          numRow={numRow}
          setNumRow={setNumRow}
          numCol={numCol}
          setNumCol={setNumCol}
          data={data}
          setData={setData}
          setSubmitMessage={setSubmitMessage}
        />
      </div>
      <div className="finish-btn-container">
        <button className="finish-btn" onClick={writeWorkoutTable}>
          <DoneAllTwoToneIcon />
          <p>Save</p>
        </button>
        {<p id='submit-message'>{submitMessage}</p>}
      </div>
    </div>
  );
};

export default WorkoutPlan;
