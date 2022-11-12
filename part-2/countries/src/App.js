import Filter from './Filter';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CountriesList from './CountriesList';

function App() {
  const [term, setTerm] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => setCountries(response.data));
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(term.toLowerCase())
  );

  return (
    <div className="App">
      <Filter term={term} setTerm={setTerm} />
      {(term && filteredCountries.length) > 10 && (
        <p>To many matches, specify another filter</p>
      )}

      {filteredCountries.length < 11 && (
        <CountriesList filteredCountries={filteredCountries} />
      )}
    </div>
  );
}

export default App;
