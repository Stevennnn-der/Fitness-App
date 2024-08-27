import React, { useState, useEffect } from "react";
import './Typewriter.css'

const Typewriter = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const interval = setInterval(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, speed);

      return () => clearInterval(interval); // Clean up the interval on component unmount
    }
  }, [index, text, speed]);

  return (
    <div className="typewriter">
      <p>{displayedText}</p>
    </div>
  );
};

export default Typewriter;
