import React from "react";
import Person from "./Person";

const Persons = ({ personsToShow, onDelete }) => {
  return (
    <ul>
      {personsToShow.map((person) => (
        <Person key={person.name} person={person} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default Persons;
