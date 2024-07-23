import React, { useState } from "react";
import "./WeightCalendar.css";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const WeightCalendar = ({
  date,
  setDate,
  setHasChooseDate,
  hasSaved,
  setHasSaved,
}) => {
  const initDate = (inputDate) => {
    const parsedDate = dayjs(inputDate);
    return parsedDate.isValid() ? parsedDate : dayjs();
  };

  const [value, setValue] = useState(initDate(date));
  const updateDate = (newValue) => {
    setValue(newValue);
    setDate(newValue.format("YYYY-MM-DD"));
    setHasChooseDate(true);
    setHasSaved(false);
    console.log("date", newValue.format("YYYY-MM-DD"));
  };

  return (
    <div className="weight-calendar-container">
      <div className="weight-calendar-header">
        <p>Record Weight:</p>
      </div>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          className="custom-demo-container"
          components={["DateCalendar"]}
        >
          <DemoItem label="">
            <DateCalendar
              className="large-calendar"
              value={value}
              onChange={updateDate}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default WeightCalendar;
