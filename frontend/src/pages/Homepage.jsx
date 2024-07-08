import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Homepage.css";
import { Link } from "react-router-dom";
import Overview from "../components/Overview";
import Goals from "../components/Goals/Goals";
import Diet from "../components/Diet";

const components = [
  { name: "Overview", icon: "fa-vector-square" },
  { name: "Goals", icon: "fa-bullseye" },
  { name: "Diet Plan", icon: "fa-cookie-bite" },
];

const navbar_icon = [
  { name: "fa-bell" },
  { name: "fa-gear" },
  { name: "fa-user" },
];

const Homepage = () => {
  const [left_menu, setLeftMenu] = useState("Overview");
  const [selectedPage, setSelectPage] = useState(<Overview />);
  const [username, setUsername] = useState(null);

  const updateMenu = (menu) => {
    setLeftMenu(menu);
    if (menu === "Overview") setSelectPage(<Overview />);
    else if (menu === "Goals") setSelectPage(<Goals />);
    else if (menu === "Diet Plan") setSelectPage(<Diet />);
  };

  const leftMenuComponent = components.map((item) => (
    <li onClick={() => updateMenu(item.name)}>
      <button className={`${left_menu === item.name ? "active" : ""}`}>
        <i className={`fa-solid ${item.icon}`}></i>
        {item.name}
      </button>
    </li>
  ));

  const navbarComponent = navbar_icon.map((item) => (
    <li>
      <i className={`fa-solid ${item.name}`} style={{ fontSize: "24px" }}></i>
    </li>
  ));

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        console.log("HOMEPAGE TOKEN: ", token);
        if (token) {
          const response = await axios.get("http://localhost:5001/homepage", {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          // console.log("Response Username ", response);
          setUsername(response.data.username);
        } else {
          console.error('No token found')
        }
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    fetchUser();

    return () => {
      console.log('Cleanup runs');
    };
  }, []);

  return (
    <div className="homepage">
      <div className="left-menu-bar">
        <div className="fitness-home-icon">
          <h2>Fitness</h2>
          <i
            className="fa-solid fa-dumbbell"
            style={{ color: "#fb7316", fontSize: "1.5rem" }}
          />
        </div>
        <hr />
        <div className="menu-options">
          <ul>{leftMenuComponent}</ul>
        </div>
        <hr />
        <div className="loggout">
          <Link style={{ textDecoration: "none" }} to="/loggout">
            <i
              className="fa-solid fa-angles-left"
              style={{ textDecoration: "none" }}
            />
            <button>Loggout</button>{" "}
          </Link>
        </div>
      </div>
      <div className="right-menu">
        <div className="navbar">
          <div className="greeting">
            <p>Good Morning</p>
            <h2>Welcome, {username}!</h2>
          </div>
          <div className="search-bar">
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
            <input type="text" placeholder="Search..." />
          </div>
          <div className="info-btns">
            <ul>{navbarComponent}</ul>
          </div>
          <hr />
        </div>
        <div className="menu">{selectedPage}</div>
      </div>
    </div>
  );
};

export default Homepage;
