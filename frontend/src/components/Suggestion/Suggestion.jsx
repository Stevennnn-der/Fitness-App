import React, { useState } from "react";
import "./Suggestion.css";
import Typewriter from "./Typewriter";

const Suggestion = () => {
  const [input, setInput] = useState("");
  const [AIText, setAIText] = useState("");

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleButtonClick = async () => {
    // Example logic for adding input to messages
    console.log("iiiii");
    const prompt = "Make it short and concise: \n" + input;
    const response = await fetch(`https://us-central1-fitness-app-abbcb.cloudfunctions.net/api/homepage/suggestion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });
    const data = await response.json();
    const text = data.text;
    setAIText(text);
    setInput(""); // Clear the input after adding to messages
  };

  return (
    <div className="suggestion">
      <div className="suggestion-header">
        <h1>Ask Me Question!</h1>
      </div>
      <div className="suggestion-input">
        <textarea
          type="text"
          value={input}
          onChange={handleInputChange}
          rows="3"
          wrap="soft"
          className="suggestion-input-box"
        />
      </div>
      <div className="suggestion-btn-container">
        <button className="suggestion-btn" onClick={handleButtonClick}>
          <p>Generate</p>
        </button>
      </div>
      <div className="suggestion-ai-text">
        <Typewriter text={AIText} speed={50} />
      </div>
    </div>
  );
};

export default Suggestion;
