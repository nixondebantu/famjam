import React, { useState } from 'react';
import "./JustAsk.css";
import WheelComponent from "react-wheel-of-prizes";

export default function JustAsk() {
  const segments = [
    "Dad",
    "Mom",
    "John ",
    "Nic ",
    "jack ",
    "Anny "
  ];

  const segColors = ["black","#60BA97","black","#60BA97","black","#60BA97",];

  const [winnerMessage, setWinnerMessage] = useState("");

  const onFinished = (winner) => {
    setWinnerMessage(`It's ${winner}'s turn! :)`);
  };

  return (
    <div className="App">
      <h1>Spin the box! Who knows, it might be you!</h1>
      <div>
        <WheelComponent
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
