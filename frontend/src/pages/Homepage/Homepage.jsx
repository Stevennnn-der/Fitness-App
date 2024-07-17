import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Homepage.css";
import { Link, useNavigate } from "react-router-dom";
import Overview from "./Overview";
import Goals from "../../components/Goals/Goals";
import Diet from "../../components/Diet";
import Health from "./Health/Health";
import Award from "./Award";
import Journal from "./Journal";
import Suggestion from "../../components/Suggestion/Suggestion";
import Weight from './Health/Weight';
import Sleep from './Health/Sleep';
import Steps from './Health/Steps';
import Calories from './Health/Calories';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { WorkoutPrompt } from "./WorkoutPrompt";

const components = [
  { name: "Overview", icon: "fa-vector-square" },
  { name: "Goals", icon: "fa-bullseye" },
  { name: "Diet Plan", icon: "fa-cookie-bite" },
  { name: "Workout", icon: "fa-dumbbell" },
  { name: "Health", icon: "fa-heart" },
];

const navbar_icon = [
  { name: "fa-bell", link: "/homepage/notification" },
  { name: "fa-user", link: "/homepage/user" },
];



const Homepage = ({ menu }) => {
  const [id, setId] = useState("");
  const [choiceAtLeftMenu, setChoiceAtLeftMenu] = useState('');
  const [left_menu, setLeftMenu] = useState(menu);
  const [selectedPage, setSelectPage] = useState();
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  const [hour, setHour] = useState(new Date().getHours());

  const updateMenu = (menus) => {
    setLeftMenu(menus);
    navigateMenu();
  };

  const homepage_component = [
    {
      menu: "Overview",
      canNavigate: true,
      navigate: "/homepage",
      atLeftMenu: 'Overview',
      page: <Overview setSelectPage={setLeftMenu} />,
    },
    {
      menu: "Suggestion",
      canNavigate: false,
      navigate: "/homepage",
      atLeftMenu: 'Overview',
      page: <Suggestion />,
    },
    {
      menu: "Award",
      canNavigate: false,
      navigate: "/homepage",
      atLeftMenu: 'Overview',
      page: <Award />,
    },
    {
      menu: "Journal",
      canNavigate: false,
      navigate: "/homepage",
      atLeftMenu: 'Overview',
      page: <Journal />,
    },
    {
      menu: "Goals",
      canNavigate: false,
      navigate: "/homepage/goals",
      atLeftMenu: 'Goals',
      page: <Goals />,
    },
    {
      menu: "Diet Plan",
      canNavigate: false,
      navigate: "/homepage/diet",
      atLeftMenu: 'Diet Plan',
      page: <Diet />,
    },
    {
      menu: "Workout",
      canNavigate: false,
      navigate: "/homepage",
      atLeftMenu: 'Workout',
      page: <WorkoutPrompt />,
    },
    {
      menu: "Health",
      canNavigate: true,
      navigate: "/health",
      atLeftMenu: 'Health',
      page: <Health />,
    },
    {
      menu: "Weight",
      canNavigate: false,
      navigate: "/homepage/weight",
      atLeftMenu: 'Health',
      page: <Weight />,
    },
    {
      menu: "Sleep",
      canNavigate: false,
      navigate: "/homepage/sleep",
      atLeftMenu: 'Health',
      page: <Sleep />,
    },
    {
      menu: "Calories",
      canNavigate: false,
      navigate: "/homepage/calories",
      atLeftMenu: 'Health',
      page: <Calories />,
    },
    {
      menu: "Steps",
      canNavigate: false,
      navigate: "/homepage/steps",
      atLeftMenu: 'Health',
      page: <Steps />,
    },
  ];

  const navigateMenu = () => {
    homepage_component.forEach((item) => {
      if (left_menu === item.menu) {
        if (item.canNavigate) navigate(item.navigate);
        setChoiceAtLeftMenu(item.atLeftMenu);
        setSelectPage(item.page);
      }
    });
  };

  const leftMenuComponent = components.map((item) => (
    <li onClick={() => updateMenu(item.name)}>
      <button
        className={`${
          left_menu === item.name || (item.name === choiceAtLeftMenu)
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
    setLeftMenu(menu);
    console.log(left_menu);
  }, [menu]);

  useEffect(() => {
    navigateMenu();
  }, [left_menu]);

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
    return () => clearInterval(timer);
  }, []);



  return (
    <div className="homepage">
      <div className="left-menu-bar">
        <div className="fitness-home-icon">
          <h2>Fitness</h2>
          <FitnessCenterIcon style={{ color: "#fb7316", fontSize: "1.9em" }} />
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
