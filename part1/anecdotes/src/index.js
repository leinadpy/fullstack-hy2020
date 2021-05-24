import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [copyPoints, setCopyPoints] = useState(props.points);
  const [maxVoted, setMaxVote] = useState(0);
  const handleClick = () => {
    let aleatorio = random(0, props.anecdotes.length - 1);
    setSelected(aleatorio);
  };
  const handleVote = () => {
    const pointsAdd = [...copyPoints];
    pointsAdd[selected] += 1;
    let max = 0;
    let indexMax = 0;
    pointsAdd.forEach((point, index) => {
      if (max < point) {
        max = point;
        indexMax = index;
      }
    });
    setMaxVote(indexMax);
    setCopyPoints(pointsAdd);
  };
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{props.anecdotes[selected]}</p>
      <p>has {copyPoints[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <p>{props.anecdotes[maxVoted]}</p>
      <p>has {copyPoints[maxVoted]} votes</p>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];
const points = Array.apply(null, new Array(anecdotes.length)).map(
  Number.prototype.valueOf,
  0
);

ReactDOM.render(
  <App anecdotes={anecdotes} points={points} />,
  document.getElementById("root")
);
