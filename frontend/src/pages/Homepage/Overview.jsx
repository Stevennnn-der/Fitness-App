import React, { useEffect, useState } from "react";
import "./Overview.css";
import SuggestionCard from "../../components/Cards/SuggestionCard";
import HealthCard from "../../components/Cards/HealthCard";
import Suggestion from "../../components/Suggestion/Suggestion";
import GoalsCard from "../../components/Cards/GoalsCard";
import AwardCard from "../../components/Cards/AwardCard";
import JournalCard from "../../components/Cards/JournalCard";

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
          setSelectPage('Journal')
        }
      >
        <JournalCard />
      </div>
      <div onClick={() => setSelectPage('Award')}>
        <AwardCard />
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
