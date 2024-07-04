import React, { useEffect, useState } from "react";
import "./Overview.css";
import SuggestionCard from "./Suggestion/SuggestionCard";
import CaloriesCard from "./Calories/CaloriesCard";
import StepsCard from "./Steps/StepsCard";
import WorkoutCard from "./Workout/WorkoutCard";
import Suggestion from "./Suggestion/Suggestion";
import Calories from "./Calories/Calories";
import Steps from "./Steps/Steps";
import Workout from "./Workout/Workout";
import GoalsCard from "./Goals/GoalsCard";

const Overview = () => {
  const [selectedComponent, setSelectedComponent] = useState();

  useEffect(() => {
    setSelectedComponent(<InfoPage setSelectedComponent={setSelectedComponent}/>);
  }, [])

  return <>{selectedComponent}</>;
};

export default Overview;

const InfoPage = ({setSelectedComponent}) => {
  return (
    <>
      <div className="info-page">
        <div className="suggestions" onClick={() => setSelectedComponent(<Suggestion />)}><SuggestionCard /></div>
        <div onClick={() => setSelectedComponent(<Workout />)}><WorkoutCard /></div>
        <div onClick={() => setSelectedComponent(<Calories />)}><CaloriesCard /></div>
        <div onClick={() => setSelectedComponent(<Steps />)}><StepsCard /></div>
        <div className="goal-process"><GoalsCard /></div>
      </div>
      <div className="schedule-page"></div>
    </>
  );
};
