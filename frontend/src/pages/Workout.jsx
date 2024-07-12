import React, { useState, useEffect } from "react";
import "./Workout.css";
import { Calendar, Whisper, Popover, Badge } from "rsuite";
import "rsuite/Calendar/styles/index.css";
import { useNavigate } from "react-router-dom";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";

const Workout = () => {
  const navigate = useNavigate();

  const handleSelectDate = (date) => {
    const formattedDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    console.log(formattedDate);
    navigate(`/homepage/workout/${formattedDate}`);
  }

  const returnToHome = () => {
    navigate("/homepage");
  };


  return (
    <div className="workout">
      <div className="header">
        <KeyboardDoubleArrowLeftOutlinedIcon
          id="go-to-info"
          onClick={() => returnToHome()}
          style={{ cursor: "pointer", fontSize: "2.5em", color: "#004352" }}
        />
        <div className="header-title">
          <h2 id="header-h2">Make Your WORKOUT PLAN! </h2>
        </div>
      </div>
      <div className="middle-section">
        <Calendar
          bordered
          renderCell={renderCell}
          onSelect={handleSelectDate}
        />
      </div>
    </div>
  );
};

export default Workout;

function getTodoList(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  // console.log("DATE: ", year, month, day);
  // switch (day) {
  //   case 10:
  //     return [
  //       { time: "10:30 am", title: "Meeting" },
  //       { time: "12:00 pm", title: "Lunch" },
  //       { time: "12:00 pm", title: "Lunch" },
  //       { time: "12:00 pm", title: "Lunch" },

  //     ];
  //   case 15:
  //     return [{ time: "09:30 pm", title: "Products Introduction Meeting" }];
  //   default:
  //     return [];
  // }
  return [];
}

function renderCell(date) {
  const list = getTodoList(date);
  const displayList = list.filter((item, index) => index < 2);

  if (list.length) {
    const moreCount = list.length - displayList.length;
    const moreItem = (
      <li>
        <Whisper
          placement="top"
          trigger="click"
          speaker={
            <Popover>
              {list.map((item, index) => (
                <p key={index}>
                  <b>{item.time}</b> - {item.title}
                </p>
              ))}
            </Popover>
          }
        >
          <a>{moreCount} more</a>
        </Whisper>
      </li>
    );

    return (
      <div className="calendar-day-cell">
        <ul className="calendar-todo-list">
          {displayList.map((item, index) => (
            <li key={index}>
              <Badge /> <b>{item.time}</b> - {item.title}
            </li>
          ))}
          {moreCount ? moreItem : null}
        </ul>
      </div>
    );
  }

  return null;
}