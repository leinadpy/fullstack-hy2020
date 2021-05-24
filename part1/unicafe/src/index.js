import React, { useState } from "react";
import ReactDOM from "react-dom";

const Titulo = ({ title }) => {
  return <h2>{title}</h2>;
};

const Button = ({ text, setAction }) => {
  const updateState = () => {
    setAction((prevstate) => prevstate + 1);
  };
  return <button onClick={updateState}>{text}</button>;
};

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  return (
    <>
      {good === 0 && neutral === 0 && bad === 0 ? (
        <p>No feedback given</p>
      ) : (
        <div>
          <table>
            <tbody>
              <Statistic text="good" value={good} />
              <Statistic text="neutral" value={neutral} />
              <Statistic text="bad" value={bad} />
              <Statistic text="all" value={good + neutral + bad} />
              <Statistic
                text="average"
                value={(good - bad) / (good + neutral + bad)}
              />
              <Statistic
                text="positive"
                value={(good / (good + neutral + bad)) * 100 + " %"}
              />
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Titulo title="give feedback" />
      <div>
        <Button text="good" setAction={setGood} />
        <Button text="neutral" setAction={setNeutral} />
        <Button text="bad" setAction={setBad} />
      </div>
      <Titulo title="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
