import React from 'react';

const Person = ({ person, handleRemovePerson }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <p>
        {person.name} - {person.number}
      </p>
      <button
        onClick={() => handleRemovePerson(person.id)}
        style={{ marginLeft: '15px' }}
      >
        delete
      </button>
    </div>
  );
};

export default Person;
