import React, { useState } from 'react';
import WheelComponent from "react-wheel-of-prizes";
import "./JustAsk.css";

export default function JustAsk() {
  const [segments, setSegments] = useState([
    "Dad",
    "Mom",
    "John",
    "Nic",
    "Jack",
    "Anny",
  ]);

  const segColors = ["black", "#60BA97", "black", "#60BA97", "black", "#60BA97"];

  const [winnerMessage, setWinnerMessage] = useState("");

  const onFinished = (winner) => {
    setWinnerMessage(`It's ${winner}'s turn! :)`);
  };

  const handleInputChange = (event) => {
    // Update the segments state with the input values
    const newSegments = event.target.value.split(",");
    setSegments(newSegments.map((segment) => segment.trim()));
  };

  return (
    <div className="App">
      <h1>Spin the box! Who knows, it might be you!</h1>
      <div>
        <label>
          Enter segments (comma-separated):
          <input type="text" value={segments.join(",")} onChange={handleInputChange} />
        </label>
        <WheelComponent
          key={segments.join()} // Use key prop to force update when segments change
          segments={segments}
          segColors={segColors}
          onFinished={onFinished}
          primaryColor="black"
          contrastColor="white"
          buttonText="Spin"
          isOnlyOnce={false}
          size={250}
          upDuration={200}
          downDuration={800}
          fontFamily="Arial"
        />
      </div>
      <p>{winnerMessage}</p>
    </div>
  );
}
