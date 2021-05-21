import React, { useState } from "react";
import ReactDOM from "react-dom";

const Titulo = ({title}) => {
  return (
    <h2>{title}</h2>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Titulo title="give feedback" />

      <Titulo title="statistics" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
