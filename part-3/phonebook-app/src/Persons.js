import React from 'react';
import Person from './Person';

const Persons = ({ persons, handleRemovePerson }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Person
          handleRemovePerson={handleRemovePerson}
          key={person.id}
          person={person}
        />
      ))}
    </ul>
  );
};

export default Persons;
