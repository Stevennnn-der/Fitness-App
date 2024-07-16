import React, { useState, useEffect, useRef } from "react";
import "./UpdateComp.css";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";

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

const types = ["Weight", "Sleep", "Calories", "Steps", "Height"];

const UpdateComp = ({ formVisibility, setFormVisibility, type, setType }) => {
  const [clickForm, setClickForm] = useState(false);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setType(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleFormClick = () => {
    setClickForm(true);
  };

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setClickForm(false);
    }
  };

  const updateFavoriteComponent = () => {
    console.log(type);
    setFormVisibility(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formRef = useRef(null);

  return (
    <div
      className="update-comp"
      style={{ visibility: !formVisibility ? "hidden" : "visible" }}
    >
      <div className={`slideBox ${!formVisibility ? "" : "active"}`}>
        <FormControl
          ref={formRef}
          sx={{
            m: 1,
            width: 300,
            transition: "background-color 0.3s", // Smooth transition for background color change
            "&:hover": {
              color: "white", // Changes text color to black for better visibility on white background
              ".MuiInputLabel-root": { color: "white" }, // Specific components like label
              ".MuiOutlinedInput-root": {
                color: "white",
                "& fieldset": { borderColor: "white" }, // Changes the border color to black
              },
            },
            color: "white",
            ".MuiInputLabel-root": { color: "white" },
            ".MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": { borderColor: "white" },
            },
          }}
          onClick={handleFormClick}
        >
          <InputLabel id="demo-multiple-checkbox-label">
            Choose Your Favorites
          </InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={type}
            onChange={handleChange}
            input={<OutlinedInput label="Choose Your Favorites" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {types.map((t) => (
              <MenuItem key={t} value={t}>
                <Checkbox checked={type.indexOf(t) > -1} />
                <ListItemText primary={t} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className={`update-btn-container ${clickForm ? 'active' : ''}`}>
          <button className="update-btn" onClick={updateFavoriteComponent}>
            <TipsAndUpdatesOutlinedIcon />
            <p>Update</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateComp;
