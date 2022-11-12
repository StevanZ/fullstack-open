import React from 'react';

const Search = ({ setTerm, term }) => {
  return (
    <div>
      <label>search filter:</label>
      <input
        value={term}
        onChange={(e) => {
          setTerm(e.target.value);
        }}
      />
    </div>
  );
};

export default Search;
