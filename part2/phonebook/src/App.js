import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchPerson, setSearchPerson] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

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
    } else if (e.target.name === "search" && e.target.value !== "") {
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
