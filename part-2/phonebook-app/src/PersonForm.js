import React from 'react';

const PersonForm = ({
  handleSubmit,
  newName,
  setNewName,
  newNumber,
  setNewNumber
}) => {
  console.log('from form', newNumber);

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        name:{' '}
        <input
          style={{ marginBottom: '10px' }}
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        number:{' '}
        <input
          style={{ marginBottom: '10px' }}
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
