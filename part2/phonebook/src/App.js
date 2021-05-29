import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/Person";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchPerson, setSearchPerson] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [message, setMessage] = useState(null);
  const [typeMessage, setTypeMessage] = useState("success");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const person = persons.filter((person) => person.name === newName);
    if (person.length === 0) {
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
      setMessage(`Added ${personObject.name}`);
      setTypeMessage("success");
    } else if (
      window.confirm(
        `${newName} is already added to phonebook, replace the old number ${person[0].number} with a new one ${newNumber}`
      )
    ) {
      const changedPerson = {
        ...person[0],
        name: newName,
        number: newNumber,
      };
      personService
        .update(person[0].id, changedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((p) => (p.id !== person[0].id ? p : returnedPerson))
          );
        })
        .catch((error) => {
          setMessage(
            `the person ${person[0].name} was already deleted from server`
          );
          setTypeMessage("error");
          setPersons(persons.filter((p) => p.id !== person[0].id));
        });
      setNewName("");
      setNewNumber("");
    }
  };

  const handleDelete = (e) => {
    const { id, name } = e.target;
    if (window.confirm(`Delete ${name}?`)) {
      personService.deleteId(id).then((personReturned) => {
        setPersons(
          persons.filter((person) => {
            return person.id.toString() !== id;
          })
        );
      });
    }
  };

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
    } else if (e.target.name === "search") {
      if (e.target.value !== "") {
        setShowAll(false);
        setSearchPerson(e.target.value);
      } else {
        setShowAll(true);
      }
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification
        message={message}
        setMessage={setMessage}
        typeMessage={typeMessage}
      />

      <Filter onChange={handleChange} />

      <h3>Add a new</h3>

      <PersonForm
        onSubmit={addPerson}
        onChange={handleChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} onDelete={handleDelete} />
    </div>
  );
};

export default App;
