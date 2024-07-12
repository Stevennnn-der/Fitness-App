import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Homepage.css";
import { Link, useNavigate } from "react-router-dom";
import Overview from "../components/Overview";
import Goals from "../components/Goals/Goals";
import Diet from "../components/Diet";
import User from "../pages/User";
import Workout from "./Workout";
import Steps from "../components/Steps/Steps";
import Calories from "../components/Calories/Calories";
import Suggestion from "../components/Suggestion/Suggestion";



const components = [
  { name: "Overview", icon: "fa-vector-square" },
  { name: "Goals", icon: "fa-bullseye" },
  { name: "Diet Plan", icon: "fa-cookie-bite" },
  { name: "Workout", icon: "fa-dumbbell"},
];

const navbar_icon = [
  { name: "fa-bell", link: "/homepage/notification" },
  { name: "fa-user", link: "/homepage/user" },
];

const Homepage = () => {
  const [id, setId] = useState("");
  const [onOverview, setOnOverview] = useState(true);
  const [left_menu, setLeftMenu] = useState("Overview");
  const [selectedPage, setSelectPage] = useState();
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  const updateMenu = (menu) => {
    setLeftMenu(menu);
    navigateMenu();
  };

  function navigateMenu() {
    if (left_menu === "Overview") {
      setOnOverview(true);
      setSelectPage(<Overview setSelectPage={setLeftMenu} />);
    } else if (left_menu === "Goals") {
      setOnOverview(false)
      setSelectPage(<Goals />);
    } else if (left_menu === "Diet Plan") {
      setOnOverview(false)
      setSelectPage(<Diet />);
    } else if (left_menu === "Suggestion") {
      setOnOverview(true)
      setSelectPage(<Suggestion />);
    } else if (left_menu === "Workout") {
      navigate('/homepage/workout');
    } else if (left_menu === "Calories") {
      setOnOverview(true)
      setSelectPage(<Calories />);
    } else if (left_menu === "Steps") {
      setOnOverview(true)
      setSelectPage(<Steps />);
    } 
  }

  const leftMenuComponent = components.map((item) => (
    <li onClick={() => updateMenu(item.name)}>
      <button className={`${left_menu === item.name || (item.name === 'Overview' && onOverview) ? "active" : ""}`}>
        <i className={`fa-solid ${item.icon}`}></i>
        {item.name}
      </button>
    </li>
  ));

  const navbarComponent = navbar_icon.map((item) => (
    <li>
      <Link to={`${item.link}`} style={{ color: "black" }}>
        <i className={`fa-solid ${item.name}`} style={{ fontSize: "24px" }} />
      </Link>
    </li>
  ));

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
          setId(response.data._id);
          setUsername(response.data.username);
        } else {
          console.error("No token found");
        }
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    fetchUser();
    navigateMenu();
  }, [left_menu]);

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
