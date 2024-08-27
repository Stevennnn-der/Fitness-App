import React, { useState } from "react";
import "./DailyCheckInCard.css";
import CheckIcon from "@mui/icons-material/Check";

const DailyCheckInCard = () => {
  const [checkedDays, setCheckedDay] = useState(3);

  const checkedIn = () => {
    setCheckedDay((prev) => prev = prev + 1)
  }

  return (
    <div className="DailyCheckInCard">
      {/* <div className="DailyCheckInCardHead">
        
      </div> */}
      <div className="DailyCheckInCardBody">
        <h2>Check In:</h2>
        <div>
          <p id='first-msg'>CONGRATULATION!</p>
          <p id='second-msg'>You have checked in for {checkedDays} days!</p>
        </div>
      </div>
      <div className="DailyCheckInCardBtn-Container">
        <button className="DailyCheckInCardBtn" onClick={checkedIn}>
          <CheckIcon />
          Checked
        </button>
      </div>
    </div>
  );
};

export default DailyCheckInCard;
