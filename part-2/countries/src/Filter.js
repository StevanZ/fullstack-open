import React from 'react';

const Filter = ({ term, setTerm }) => {
  return (
    <label>
      Find countries:{' '}
      <input
        placeholder="enter country..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
    </label>
  );
};

export default Filter;
