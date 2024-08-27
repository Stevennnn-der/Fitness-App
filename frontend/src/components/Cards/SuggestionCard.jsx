import React from "react";
import "./SuggestionCard.css";
import SmartToyIcon from "@mui/icons-material/SmartToy";

const SuggestionCard = () => {
  return (
    <div className="suggestionCard">
      <div className="suggestion-container">
        <div className="suggestion-icon">
          <i
            class="fa-solid fa-robot"
            style={{ color: "#E4EAF3", fontSize: "2.5rem" }}
          />
        </div>
        <div className="suggestion-p">
          <p>Ask AI For Suggestions!</p>
        </div>
      </div>
    </div>
  );
};

export default SuggestionCard;
