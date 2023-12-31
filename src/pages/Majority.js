import React, { useState } from 'react';

// Global object to store all polls
const polls = {};

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
  const [pollId, setPollId] = useState(null);
  const [newOption, setNewOption] = useState('');
  const [title, setTitle] = useState('');
  const [searchId, setSearchId] = useState('');

  const createPoll = () => {
    const id = Math.floor(Math.random() * 10000);
    setPollId(id);
    polls[id] = { title, options: [], votes: [] };
    setTitle('');
  };

  const addOptionToPoll = () => {
    if (newOption !== '') {
      polls[pollId].options.push(newOption);
      polls[pollId].votes.push(0);
      setNewOption('');
    }
  };

  const vote = (optionIndex) => {
    polls[pollId].votes[optionIndex]++;
  };

  const searchPoll = () => {
    if (polls[searchId]) {
      setPollId(searchId);
    } else {
      alert('Invalid poll ID');
    }
  };

  return (
    <div className="p-4">
      <input type="text" value={searchId} onChange={(e) => setSearchId(e.target.value)} placeholder="Search poll by ID" />
      <button onClick={searchPoll} className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-4">Search</button>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Poll title" />
      <button onClick={createPoll} className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-4">Create Poll</button>
      {pollId && (
        <div>
          <Poll pollId={pollId} title={polls[pollId].title} options={polls[pollId].options} votes={polls[pollId].votes} onVote={vote} />
          <input type="text" value={newOption} onChange={(e) => setNewOption(e.target.value)} placeholder="Add option" />
          <button onClick={addOptionToPoll} className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-4">Add Option</button>
        </div>
      )}
    </div>
  );
};

export default Majority;
