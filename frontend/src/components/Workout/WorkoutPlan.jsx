import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DataTable from "./DataTable";
import "./WorkoutPlan.css";
import { useNavigate } from "react-router-dom";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
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
  const navigate = useNavigate();

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
        <DataTable />
      </div>
    </div>
  );
};

export default WorkoutPlan;
