import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Health.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import UpdateComp from "../../../components/Health/UpdateComp";

const colors = [
  "#4AC3DE",
  "#15449F",
  "#0792B1",
  "#EA580B",
  "#B64A00",
  "#FB7316",
];

const features = [
  {
    type: "Weight",
    value: "75",
    unit: "kg",
    time: "2025/13/32",
    icon: "fa-weight-scale",
    navigate: "/health/weight",
  },
  {
    type: "Sleep",
    value: ["7", "30"],
    unit: ["h", "min"],
    time: "2026/14/33",
    icon: "fa-moon",
    navigate: "/health/sleep",
  },
  {
    type: "Steps",
    value: "123,456",
    unit: "steps",
    time: "2027/15/33",
    icon: "fa-shoe-prints",
    navigate: "/health/steps",
  },
  {
    type: "Calories",
    value: "20,000",
    unit: "cals",
    time: "2028/16/35",
    icon: "fa-fire",
    navigate: "/health/calories",
  },
];

const Health = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [type, setType] = useState(["Weight", "Sleep"]);
  const [displayOption, setDisplayOption] = useState("Week");
  const [numComponent, setNumComponent] = useState(4);
  const [clickUpdateBtn, setClickUpdateBtn] = useState(false);

  const updateDisplay = (e) => {
    setDisplayOption(e.target.value);
  };

  const updateComponent = () => {
    setClickUpdateBtn(true);
  };

  const featuresComponent = features.map((item, index) => {
    if (type.includes(item.type)) {
      return (
        <div
          className="health-summary-component"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(item.navigate)}
        >
          <div className="health-summary-header">
            <div
              className="health-component-type"
              style={{ color: `${colors[index]}` }}
            >
              <i className={`fa-solid ${item.icon}`} />
              <p>{item.type}</p>
            </div>
            <div className="health-top-right">
              <p>{item.time}</p>
              <i className="fa-solid fa-angle-right" />
            </div>
          </div>

          <div className="health-value-container">
            {item.type === "Sleep" ? (
              <div className="health-value">
                <p id="number">{item.value[0]}</p>
                <p id="unit">{item.unit[0]}</p>
                <p id="number">{item.value[1]}</p>
                <p id="unit">{item.unit[1]}</p>
              </div>
            ) : (
              <div className="health-value">
                <p id="number">{item.value}</p>
                <p id="unit">{item.unit}</p>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  });

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

          const data = response.data;
          // console.log(data);
          setUserId(data._id);
          setUserName(data.username);
        } else {
          console.error("No token found");
        }
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="health-container">
      <UpdateComp
        formVisibility={clickUpdateBtn}
        setFormVisibility={setClickUpdateBtn}
        type={type}
        setType={setType}
      />
      <div className="health-overview">
        <div className="health-header">
          <h2>{userName}'s Health Summary</h2>
          <hr />
        </div>
        <div className="health-middle-section">
          <div id="add-features">
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel
                id="demo-simple-select-autowidth-label"
                style={{ color: "#47119C" }}
              >
                View Options
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={displayOption}
                onChange={updateDisplay}
                autoWidth
                label="View Options"
                style={{ width: "12rem", color: "#47119C" }}
              >
                <MenuItem value={"Day"}>Day</MenuItem>
                <MenuItem value={"Week"}>Week</MenuItem>
                <MenuItem value={"Month"}>Month</MenuItem>
                <MenuItem value={"Year"}>Year</MenuItem>
              </Select>
            </FormControl>
            <div className="health-updateComponent">
              <i
                id="addComponent"
                className="fa-solid fa-square-plus"
                onClick={updateComponent}
                style={{ fontSize: "2em", cursor: "pointer" }}
              />
              {/* <p>|</p>
            <i id='deleteComponent'
              className="fa-solid fa-square-minus"
              onClick={addComponent}
              style={{ fontSize: "2em", cursor: "pointer" }}/> */}
            </div>
          </div>
          <div className="health-summary-container">
            <div className="health-summary">{featuresComponent}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Health;
