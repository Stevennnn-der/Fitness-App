import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const [id, setId] = useState("");
  const [canEdit, setCanEdit] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        // console.log("HOMEPAGE TOKEN: ", token);
        if (token) {
          const response = await axios.get("http://localhost:5001/homepage", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // console.log("Response Username ", response);
          setId(response.data._id);
          setAvatar(response.data.avatar);
          setUsername(response.data.username);
          setEmail(response.data.email);
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setPhoneNumber(response.data.phoneNumber);
          setGender(response.data.gender);
          setAddress(response.data.address);
        }
      } catch (error) {
        console.error("Can NOT fetch the User", error);
      }
    };
    fetchUser();
  }, []);

  const updateGender = (event) => {
    setGender(event.target.value);
  };

  const canEditProfile = () => {
    setCanEdit(true);
  };

  const updateUserInfo = async () => {
    try {
      const response = await fetch("http://localhost:5001/homepage/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          firstName,
          lastName,
          phoneNumber,
          gender,
          address,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedUser = await response.json();
      console.log("User updated successfully:", updatedUser);
    } catch (error) {
      console.error("Can not update user information!", error);
    }
  };

  console.log("firstName: " + firstName)
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
          <ImageUpload user_id={id} user_avatar={avatar}/>
          <p className="username">{username}</p>
          <p className="email">{email}</p>
          <button onClick={canEditProfile}>Edit Profile</button>
        </div>
        <div className="right-section">
          <p id="user-profile">{username}'s Profile </p>

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
              defaultValue=''
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={{ width: "15rem" }}
            />
            <TextField
              required={canEdit}
              disabled={!canEdit}
              id={`outlined-${canEdit ? "required" : "disabled"}`}
              label="Last Name"
              defaultValue=''
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={{ width: "15rem" }}
            />
            <TextField
              required={canEdit}
              disabled={!canEdit}
              id={`outlined-${canEdit ? "required" : "disabled"}`}
              label="Phone Number"
              defaultValue=''
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              style={{ width: "15rem" }}
            />
            <TextField
              required={canEdit}
              disabled={!canEdit}
              id={`outlined-${canEdit ? "required" : "disabled"}`}
              label="Address"
              defaultValue=''
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
            <button
              className={`save-btn${canEdit ? "" : " disabled"}`}
              onClick={updateUserInfo}
            >
              <SaveAltIcon />
              <p>Save</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
