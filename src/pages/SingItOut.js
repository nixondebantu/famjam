import React, { useState, useEffect } from 'react';

export default function SingItOut() {
  const [score, setScore] = useState({ group1: 0, group2: 0 });
  const [letter, setLetter] = useState('');
   const [turn, setTurn] = useState('group1');
  const [gameStarted, setGameStarted] = useState(false);
  const [passCount, setPassCount] = useState(0);
  const [timerId, setTimerId] = useState(null); 

  const generateLetter = () => {
    const randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    setLetter(randomLetter);
    setPassCount(0); 
  };

  const handleStart = () => {
    setGameStarted(true);
    generateLetter();
  };

  const handleAccept = () => {
    clearTimeout(timerId); 
    setScore(prevScore => ({ ...prevScore, [turn]: prevScore[turn] + 1 }));
    setTurn(turn === 'group1' ? 'group2' : 'group1');
    generateLetter();
  };

  const handlePass = () => {
    clearTimeout(timerId); 
    setPassCount(passCount + 1);
    const otherGroup = turn === 'group1' ? 'group2' : 'group1';
    setScore(prevScore => ({ ...prevScore, [otherGroup]: prevScore[otherGroup] + 1 }));
    setTurn(otherGroup);
    if (passCount >= 1) {
      generateLetter();
    }
  };

  useEffect(() => {
    if (gameStarted) {
      const id = setTimeout(handlePass, 30000); 
      setTimerId(id); 
    }
  }, [gameStarted, turn]); 

  if (score.group1 >= 10) {
    return <h2 className="text-2xl font-bold text-green-500">Group 1 wins!</h2>;
  }

  if (score.group2 >= 10) {
    return <h2 className="text-2xl font-bold text-green-500">Group 2 wins!</h2>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="mb-4 text-2xl font-bold text-blue-500">{turn.toUpperCase()}</h2>
      <p className="mb-4 text-lg">Score: Group 1 - {score.group1}, Group 2 - {score.group2}</p>
      <p className="mb-4 text-lg">Letter: {letter}</p>
      {!gameStarted && <button className="px-4 py-2 mb-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700" onClick={handleStart}>Start</button>}
      {gameStarted && <button className="px-4 py-2 mb-2 font-bold text-white bg-green-500 rounded hover:bg-green-700" onClick={handleAccept}>Accept</button>}
      {gameStarted && <button className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700" onClick={handlePass}>Pass</button>}
    </div>
  );
}
