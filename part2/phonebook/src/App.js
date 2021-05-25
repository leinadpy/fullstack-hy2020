import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchPerson, setSearchPerson] = useState("");
  const [showAll, setShowAll] = useState(true);

  const personsToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(searchPerson.toLowerCase())
      );

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setNewName(e.target.value);
    } else if (e.target.name === "number") {
      setNewNumber(e.target.value);
    } else if (e.target.name === "search" && e.target.name !== "") {
      setShowAll(false);
      setSearchPerson(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isPerson = persons.some((person) => person.name === newName);
    if (isPerson) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons([
        ...persons,
        {
          name: newName,
          number: newNumber,
        },
      ]);
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter onChange={handleChange} />

      <h3>Add a new</h3>

      <PersonForm
        onSubmit={handleSubmit}
        onChange={handleChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
      
    </div>
  );
};

export default App;
