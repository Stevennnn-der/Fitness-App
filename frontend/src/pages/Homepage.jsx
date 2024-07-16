import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Homepage.css";
import { Link, useNavigate } from "react-router-dom";
import Overview from "../components/Overview";
import Goals from "../components/Goals/Goals";
import Diet from "../components/Diet";
import Health from "../components/Health/Health";
import Calories from "../components/Calories/Calories";
import Suggestion from "../components/Suggestion/Suggestion";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

const components = [
  { name: "Overview", icon: "fa-vector-square" },
  { name: "Goals", icon: "fa-bullseye" },
  { name: "Diet Plan", icon: "fa-cookie-bite" },
  { name: "Workout", icon: "fa-dumbbell" },
  { name: 'Health', icon: "fa-heart" },
];

const navbar_icon = [
  { name: "fa-bell", link: "/homepage/notification" },
  { name: "fa-user", link: "/homepage/user" },
];

const Homepage = ({ menu }) => {
  const [id, setId] = useState("");
  const [onOverview, setOnOverview] = useState(true);
  const [left_menu, setLeftMenu] = useState(menu);
  const [selectedPage, setSelectPage] = useState();
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  const [hour, setHour] = useState(new Date().getHours());

  const updateMenu = (menu) => {
    setLeftMenu(menu);
    navigateMenu();
  };

  function navigateMenu() {
    if (left_menu === "Overview") {
      setOnOverview(true);
      setSelectPage(<Overview setSelectPage={setLeftMenu} />);
    } else if (left_menu === "Goals") {
      setOnOverview(false);
      setSelectPage(<Goals />);
    } else if (left_menu === "Diet Plan") {
      setOnOverview(false);
      setSelectPage(<Diet />);
    } else if (left_menu === "Suggestion") {
      setOnOverview(true);
      setSelectPage(<Suggestion />);
    } else if (left_menu === "Workout") {
      navigate("/homepage/workout");
    } else if (left_menu === "Calories") {
      setOnOverview(true);
      setSelectPage(<Calories />);
    } else if (left_menu === "Health") {
      setOnOverview(false);
      setSelectPage(<Health />);
      navigate("/homepage/health");
    }
  }

  const leftMenuComponent = components.map((item) => (
    <li onClick={() => updateMenu(item.name)}>
      <button
        className={`${
          left_menu === item.name || (item.name === "Overview" && onOverview)
            ? "active"
            : ""
        }`}
      >
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

  const loggoutUser = () => {
    navigate("/logout");
  };

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

    const timer = setInterval(() => {
      setHour(new Date().getHours());
    }, 1000 * 60 * 60); // Update the hour every hour
    // Cleanup the interval on component unmount
    fetchUser();
    navigateMenu();
    return () => clearInterval(timer);
  }, [left_menu]);

  return (
    <div className="homepage">
      <div className="left-menu-bar">
        <div className="fitness-home-icon">
          <h2>Fitness</h2>
          <FitnessCenterIcon
            style={{ color: "#fb7316", fontSize: "1.9em" }}
          />
        </div>
        <hr />
        <div className="menu-options">
          <ul>{leftMenuComponent}</ul>
        </div>
        <hr />
        <div className="loggout">
          {/* <i
              className="fa-solid fa-angles-left"
              style={{ textDecoration: "none" }}
            /> */}
          <ExitToAppIcon onClick={loggoutUser} style={{ cursor: "pointer" }} />
          <button onClick={loggoutUser}>Logout</button>
        </div>
      </div>
      <div className="right-menu">
        <div className="navbar">
          <div className="greeting">
            <p>
              Good{" "}
              {hour >= 5 && hour < 12
                ? "Morning"
                : hour >= 12 && hour < 20
                ? "Afternoon"
                : "Evening"}
            </p>
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
