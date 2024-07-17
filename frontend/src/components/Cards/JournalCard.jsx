import React from "react";
import "./JournalCard.css";

const JournalCard = () => {
  return (
    <div className="journalCard">
      <div className="journal-container">
        <div className="journal-icon">
          <i
            class="fa-solid fa-book"
            style={{ color: "#E4EAF3", fontSize: "1.5rem" }}
          />
        </div>
        <p>Journal</p>
      </div>
    </div>
  );
};

export default JournalCard;
