import React, { useState } from 'react';


const Poll = ({ pollId }) => {
  const [votes, setVotes] = useState(0);

  const vote = () => {
    setVotes(votes + 1);
  };

  return (
    <div className="p-4 bg-blue-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2">Poll ID: {pollId}</h2>
      <p className="text-lg mb-4">Votes: {votes}</p>
      <button onClick={vote} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Vote</button>
    </div>
  );
};


const Majority = () => {
  const [pollId, setPollId] = useState('');

  const createPoll = () => {
    
    const newPollId = Math.floor(Math.random() * 10000);
    setPollId(newPollId);
  };

  return (
    <div className="p-4">
      <button onClick={createPoll} className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-4">Create Poll</button>
      {pollId && <Poll key={pollId} pollId={pollId} />}
    </div>
  );
};

export default Majority;