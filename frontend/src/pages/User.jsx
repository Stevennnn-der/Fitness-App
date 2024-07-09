import React, { useState } from "react";
import "./User.css";
import ImageUpload from "../components/ImageUpload";

const user_info = [
  { type: "First Name", value: "firstName", method: "setFirstName" },
  { type: "Last Name", value: "lastName", method: "setLastName" },
  { type: "Gender", value: "gender", method: "setGender" },
  { type: "Phone Number", value: "phoneNumber", method: "setPhoneNumber" },
  { type: "Address", value: "address", method: "setAddress" },
];

const user_components = user_info.map((item) => (
  <>
    <label className="user-text">{item.type}</label>
    <input
      type="text"
      value={item.value}
      onChange={(e) => {
        `${item.method}`(e.target.value);
      }}
    />
  </>
));

const User = () => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [gender, setGender] = useState(null);
  const [address, setAddress] = useState(null);

  return (
    <div className="userpage">
      <div className="user-navbar">
        <i className="fa-solid fa-arrow-left-long" />
        <p>User Profile</p>
      </div>
      <div className="middle-section">
        <div className="left-section">
          <ImageUpload />
          <p className="username">Derrrr Zhu</p>
          <p classname="email">der@gmail.com</p>
          <button>Edit Profile</button>
        </div>
        <div className="right-section">
          <form action="/update-user" method="PUT">
            {user_components}

            <button className="update-user-submit-btn">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default User;
