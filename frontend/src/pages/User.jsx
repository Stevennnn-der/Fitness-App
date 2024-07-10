import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./User.css";
import ImageUpload from "../components/ImageUpload";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

const User = () => {
  const [canEdit, setCanEdit] = useState(false);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [gender, setGender] = useState(null);
  const [address, setAddress] = useState(null);

  const updateGender = (event) => {
    setGender(event.target.value);
  };

  const canEditProfile = () => {
    setCanEdit(true);
  };

  return (
    <div className="userpage">
      <div className="user-navbar">
        <Link to="/homepage">
          <i className="fa-solid fa-arrow-left-long" />
        </Link>
        <p>User Profile</p>
      </div>
      <div className="middle-section">
        <div className="left-section">
          <ImageUpload />
          <p className="username">Derrrr Zhu</p>
          <p classname="email">der@gmail.com</p>
          <button onClick={canEditProfile}>Edit Profile</button>
        </div>
        <div className="right-section">
          <p id="user-profile">Derrr's Profile </p>
          <form action="/homepage/user" method="PUT">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              id="user-box"
              noValidate
              autoComplete="off"
              style={{ padding: "1em 1.5em" }}
            >
              <TextField
                required={canEdit}
                disabled={!canEdit}
                id={`outlined-${canEdit ? "required" : "disabled"}`}
                label="First Name"
                defaultValue=""
                style={{ width: "15rem" }}
              />
              <TextField
                required={canEdit}
                disabled={!canEdit}
                id={`outlined-${canEdit ? "required" : "disabled"}`}
                label="Last Name"
                defaultValue=""
                style={{ width: "15rem" }}
              />
              <TextField
                required={canEdit}
                disabled={!canEdit}
                id={`outlined-${canEdit ? "required" : "disabled"}`}
                label="Phone Number"
                defaultValue=""
                style={{ width: "15rem" }}
              />
              <TextField
                required={canEdit}
                disabled={!canEdit}
                id={`outlined-${canEdit ? "required" : "disabled"}`}
                label="Address"
                defaultValue=""
                style={{ width: "15rem" }}
              />
            </Box>

            <FormControl
              required={canEdit}
              disabled={!canEdit}
              sx={{ m: 1, minWidth: 80 }}
            >
              <InputLabel
                id={`demo-simple-select${
                  canEdit ? "-required" : "-disabled"
                }-label`}
                style={{ marginLeft: "1.5em" }}
              >
                Gender
              </InputLabel>
              <Select
                labelId={`demo-simple-select${
                  canEdit ? "-required" : "-disabled"
                }-label`}
                id={`demo-simple-select${canEdit ? "-required" : "-disabled"}`}
                value={gender}
                onChange={updateGender}
                label="Gender"
                style={{ width: "15rem", marginLeft: "1.5em" }}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
            </FormControl>
            <div className="save-btn-container">
              <button className={`save-btn${ canEdit ? '' : ' disabled'}`}>
                <SaveAltIcon />
                <p>Save</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default User;
