import React from "react";

const Person = ({ person, onDelete }) => {
  return (
    <li>
      {person.name} {person.number}{" "}
      <button id={person.id} name={person.name} onClick={onDelete}>
        delete
      </button>
    </li>
  );
};

export default Person;
