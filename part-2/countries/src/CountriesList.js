import React from 'react';
import Country from './Country';

const CountriesList = ({ filteredCountries }) => {
  const isThereOne = filteredCountries.length === 1;

  return (
    <div>
      {filteredCountries?.map((country) => (
        <Country
          isThereOne={isThereOne}
          country={country}
          key={country.name.common}
        />
      ))}
    </div>
  );
};

export default CountriesList;
