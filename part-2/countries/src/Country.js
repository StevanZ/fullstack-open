import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Country = ({ country, isThereOne }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [weather, setWeather] = useState({});
  const [capital, setCapital] = useState([]);

  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${country.capital[0]}&appid=${api_key}`
      )
      .then((response) => {
        setCapital(response.data);
      });
  }, [api_key, country.capital]);

  useEffect(() => {
    if (capital.length) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${capital[0].lat}&lon=${capital[0].lon}&units=metric&appid=${api_key}`
        )
        .then((response) => setWeather(response.data));
    }
  }, [api_key, capital]);

  const countryName = (
    <div style={{ width: '100px' }}>
      {isThereOne ? (
        <h2>{country.name.common}</h2>
      ) : (
        <p>{country.name.common}</p>
      )}
    </div>
  );

  const countryDetails = (
    <>
      <p>capital: {country.capital[0]}</p>
      <p>area: {country.area}</p>
      <h4>languages</h4>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="flag" />
    </>
  );

  let weatherDetails;

  if (Object.keys(weather).length) {
    const imgUrl = `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`;
    weatherDetails = (
      <>
        <h2>Weather in {capital[0].name}</h2>
        <p>Temperature: {weather.main.temp}</p>
        <img src={imgUrl} alt="weather icon" />
        <p>wind: {weather.wind.speed} m/s</p>
      </>
    );
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {countryName}
        {!isThereOne && (
          <button onClick={() => setShowDetails(!showDetails)}>show</button>
        )}
      </div>
      {(isThereOne || showDetails) && (
        <>
          {countryDetails}
          {weatherDetails}
        </>
      )}
    </>
  );
};

export default Country;
