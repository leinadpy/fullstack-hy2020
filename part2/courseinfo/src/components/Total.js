import React from "react";

const Total = ({ parts }) => {
  //   let total = 0;
  //   parts.forEach((part) => {
  //     total += part.exercises;
  //   });
  const reducer = (accumulator, currentValue, index) => {
    return (
      (index === 1 ? accumulator.exercises : accumulator) +
      currentValue.exercises
    );
  };
  const total = parts.reduce(reducer);

  return <b>total of {total} exercises</b>;
};

export default Total;
