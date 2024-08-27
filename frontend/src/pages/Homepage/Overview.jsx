import React, { useEffect, useState } from "react";
import "./Overview.css";
import SuggestionCard from "../../components/Cards/SuggestionCard";
import HealthCard from "../../components/Cards/HealthCard";
import GoalsCard from "../../components/Cards/GoalsCard";
import AwardCard from "../../components/Cards/AwardCard";
import JournalCard from "../../components/Cards/JournalCard";
import DailyCheckInCard from "../../components/Cards/DailyCheckInCard";

const Overview = ({ setSelectPage }) => {
  return (
    <div className="overview">
      <div className="info-page">
        <div
          className="suggestions"
          onClick={() => setSelectPage("Suggestion")}
        >
          <SuggestionCard />
        </div>

        <div onClick={() => setSelectPage("Journal")}>
          <JournalCard />
        </div>

        <div onClick={() => setSelectPage("Award")}>
          <AwardCard />
        </div>
        <div onClick={() => setSelectPage("Health")}>
          <HealthCard />
        </div>
        <div className="goal-process">
          <GoalsCard />
        </div>
        
      </div>
      <div className="schedule-page">
          <DailyCheckInCard />
        </div>
    </div>
  );
};

export default Overview;
