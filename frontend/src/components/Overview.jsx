import React, { useEffect, useState } from "react";
import "./Overview.css";
import SuggestionCard from "./Suggestion/SuggestionCard";
import CaloriesCard from "./Calories/CaloriesCard";
import HealthCard from "./Health/HealthCard";
import WorkoutCard from "./Workout/WorkoutCard";
import Suggestion from "./Suggestion/Suggestion";
import Calories from "./Calories/Calories";
import Health from "./Health/Health";

import GoalsCard from "./Goals/GoalsCard";

const Overview = ({ setSelectPage }) => {
  // const [selectedComponent, setSelectedComponent] = useState();

  // function returnBackToInfoPage() {
  //   setSelectedComponent(
  //     <InfoPage setSelectedComponent={setSelectedComponent} returnBackToInfoPage={returnBackToInfoPage} current_page={current_page}/>
  //   );
  // }

  // useEffect(() => {
  //   console.log("again")
  //   returnBackToInfoPage();
  // }, []);

  // return <div className="overview">{selectedComponent}</div>;

  return (
    <div className="info-page">
      <div
        className="suggestions"
        onClick={() => setSelectPage("Suggestion")}
      >
        <SuggestionCard />
      </div>
      <div
        onClick={() =>
          setSelectPage('Workout')
        }
      >
        <WorkoutCard />
      </div>
      <div onClick={() => setSelectPage('Calories')}>
        <CaloriesCard />
      </div>
      <div onClick={() => setSelectPage('Health')}>
        <HealthCard />
      </div>
      <div className="goal-process">
        <GoalsCard />
      </div>
      <div className="schedule-page"></div>
    </div>
  );
};

export default Overview;
