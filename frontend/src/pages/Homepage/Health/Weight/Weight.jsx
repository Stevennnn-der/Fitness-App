import React, { useState, useEffect, useRef } from "react";
import "./Weight.css";
import axios from "axios";
import WeightSetUp from "./WeightSetUp";
import WeightScale from "./WeightScale";
import WeightCalendar from "./WeightCalendar";
import WeightChart from "./WeightChart";

const Weight = () => {
  const maxWeight = 300;
  const [needSetUp, setNeedSetUp] = useState(false);
  const scaleRef = useRef(null);
  const [userId, setUserId] = useState();
  const [hasChooseDate, setHasChooseDate] = useState(false);
  const [weight, setWeight] = useState();
  const [currentDate, setCurrentDate] = useState("");
  const [weightFilled, setWeightFilled] = useState(true);
  const [hasSaved, setHasSaved] = useState(false);
  const [userWeightData, setUserWeightData] = useState([]);

  useEffect(() => {
    const date = new Date();
    const year = String(date.getFullYear()); // Get the last two digits of the year
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    setCurrentDate(formattedDate);
  }, []);

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const setWeightScale = (weight) => {
    const scale = scaleRef.current;
    if (!needSetUp && scale) {
      const scrollPercentage = weight / maxWeight;
      const centerScroll = scrollPercentage * scale.scrollWidth;
      scale.scrollLeft = (centerScroll - scale.clientWidth / 2) / 1.017;
    }
  };

  const handleScroll = () => {
    const scale = scaleRef.current;
    if (!needSetUp && scale) {
      const centerScroll = scale.scrollLeft * 1.017 + scale.clientWidth / 2;
      const scrollPercentage = centerScroll / scale.scrollWidth;
      const newWeight = (scrollPercentage * maxWeight).toFixed(1);
      setWeight(newWeight);
    }
  };

  const updateDataChart = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await axios.get("https://us-central1-fitness-app-abbcb.cloudfunctions.net/api/homepage", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log("Response Username ", response);
        const data = response.data;
        const cleanedData = data.weights.userWeight.map(
          ({ _id, ...rest }) => rest
        );
        setUserWeightData(cleanedData);
      } else {
        console.error("No token found");
      }
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const response = await axios.get("https://us-central1-fitness-app-abbcb.cloudfunctions.net/api/homepage", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // console.log("Response Username ", response);
          const data = response.data;
          setUserId(data._id);
          if (data.weights.userWeight.length === 0) {
            setNeedSetUp(true);
          }
          const recentWeight = (
            data.weights.userWeight[0].weightInKg / 0.4535
          ).toFixed(1);
          setWeight(recentWeight);
          const cleanedData = data.weights.userWeight.map(
            ({ _id, ...rest }) => rest
          );
          setUserWeightData(cleanedData);
          console.log(cleanedData);
        } else {
          console.error("No token found");
        }
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!needSetUp && scaleRef.current) {
      const scale = scaleRef.current;
      const maxScrollLeft = scale.scrollWidth - scale.clientWidth;
      const weightPercentage = weight / maxWeight;
      const targetScrollPosition = maxScrollLeft * weightPercentage;
      scale.scrollLeft = targetScrollPosition - scale.clientWidth / 2;
      scale.scrollLeft = Math.max(0, Math.min(scale.scrollLeft, maxScrollLeft));
    }
  }, []);

  return needSetUp ? (
    <WeightSetUp setNeedSetUp={setNeedSetUp} />
  ) : (
    <div className="weight-page">
      <div className="weight-left-section">
        <div className="weight-left-top">
          <div className="weight-left-top-calendar">
            <WeightCalendar
              date={currentDate}
              setDate={setCurrentDate}
              setHasChooseDate={setHasChooseDate}
              hasSaved={hasSaved}
              setHasSaved={setHasSaved}
            />
          </div>
        </div>
        <div className="weight-scale-left-bottom">
          {hasChooseDate && (
            <WeightScale
              userId={userId}
              currentDate={currentDate}
              weight={weight}
              handleWeightChange={handleWeightChange}
              handleScroll={handleScroll}
              scaleRef={scaleRef}
              setWeight={setWeight}
              setWeightScale={setWeightScale}
              weightFilled={weightFilled}
              setWeightFilled={setWeightFilled}
              hasSaved={hasSaved}
              setHasSaved={setHasSaved}
              updateDataChart={updateDataChart}
            />
          )}
        </div>
      </div>
      <div className="weight-right-section">
        <WeightChart data={userWeightData} />
      </div>
    </div>
  );
};

export default Weight;
