import { useState, useEffect } from 'react';
import Notification from './Notification';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Search from './Search';
import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [term, setTerm] = useState('');

  useEffect(() => {
    personsService.getAll().then((allPersons) => setPersons(allPersons));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    };

    const handleSetError = (error) => {
      setError(error.response.data.error);
      setTimeout(() => {
        setError(null);
      }, 5000);
    };

    const resetFields = () => {
      setNewName('');
      setNewNumber('');
    };

    const findPerson = persons.find(
      (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
    );

    if (findPerson === undefined) {
      personsService
        .create(newPerson)
        .then((savedPerson) => {
          setMessage(`Added ${newPerson.name}`);
          setPersons(persons.concat(savedPerson));
          resetFields();
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.log('ERROR: ', error.response.data.error);
          handleSetError(error);
        });
    } else {
      if (
        window.confirm(
          `${newPerson.name} is already in phonebook. Are you sure you want to change the number?`
        )
      ) {
        personsService
          .update(findPerson.id, newPerson)
          .then((updatedPerson) => {
            setPersons(
              persons.map((p) =>
                p.name !== newPerson.name ? p : updatedPerson
              )
            );
            resetFields();
          })
          .catch((error) => {
            handleSetError(error);
          });
      }
    }
  };

  const handleRemovePerson = (id) => {
    const contact = persons.find((contact) => contact.id === id);
    if (window.confirm(`Delete ${contact.name} ?`))
      personsService
        .removePerson(id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          setError(`${contact.name} is already deleted from base`);
          setTimeout(() => {
            setError(null);
          }, 5000);
        });
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(term.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
      <Search setTerm={setTerm} term={term} />
      <h3>Add new person</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons
        handleRemovePerson={handleRemovePerson}
        persons={filteredPersons}
      />
    </div>
  );
};

export default App;
