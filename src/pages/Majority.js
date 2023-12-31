
import React, { useState } from 'react';

const Option = ({ option, voteCount, onVote }) => (
  <div>
    <button onClick={onVote} className="px-4 py-2 bg-blue-500 text-white rounded-lg">{option}: {voteCount}</button>
  </div>
);

const Poll = ({ pollId, title, options, votes, onVote }) => (
  <div className="p-4 bg-blue-100 rounded-lg shadow-md">
    <h1 className="text-3xl font-bold mb-2">{title}</h1>
    <h2 className="text-2xl font-bold mb-2">Poll ID: {pollId}</h2>
    {options.map((option, index) => (
      <Option key={index} option={option} voteCount={votes[index]} onVote={() => onVote(index)} />
    ))}
  </div>
);

const Majority = () => {
  const [poll, setPoll] = useState(null);
  const [newOption, setNewOption] = useState('');
  const [title, setTitle] = useState('');

  const createPoll = () => {
    if (title !== '') {
      setPoll({ id: Math.floor(Math.random() * 10000), title, options: [], votes: [] });
      setTitle('');
    }
  };

  const addOptionToPoll = () => {
    if (newOption !== '') {
      setPoll({
        ...poll,
        options: [...poll.options, newOption],
        votes: [...poll.votes, 0],
      });
      setNewOption('');
    }
  };

  const vote = (optionIndex) => {
    const newVotes = [...poll.votes];
    newVotes[optionIndex]++;
    setPoll({ ...poll, votes: newVotes });
  };

  return (
    <div className="p-4">
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Poll title" />
      <button onClick={createPoll} className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-4">Create Poll</button>
      {poll && (
        <div>
          <Poll pollId={poll.id} title={poll.title} options={poll.options} votes={poll.votes} onVote={vote} />
          <input type="text" value={newOption} onChange={(e) => setNewOption(e.target.value)} placeholder="Add option" />
          <button onClick={addOptionToPoll} className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-4">Add Option</button>
        </div>
      )}
    </div>
  );
};

export default Majority;
