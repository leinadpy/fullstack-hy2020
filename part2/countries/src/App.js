import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";
import Country from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [countryToShow, setCountryToShow] = useState({});
  const [showCountry, setShowCountry] = useState(false);
  const [weatherCountry, setWeatherCountry] = useState({});

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    if (Object.keys(countryToShow).length !== 0) {
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${api_key}&query=${countryToShow.capital}`
        )
        .then((response) => {
          setWeatherCountry(response.data);
          setShowCountry(true);
        });
    }
  }, [countryToShow]);

  const handleChange = (e) => {
    if (e.target.value !== "") {
      const toShow = countries.filter((country) =>
        country.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setCountriesToShow(toShow);
      if (toShow.length === 1) {
        setCountryToShow(toShow[0]);
      }
    } else {
      setCountriesToShow([]);
      setShowCountry(false);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    const newCountryToShow = countriesToShow.filter(
      (country) => country.name === e.target.id
    );
    setCountriesToShow(newCountryToShow);
    setCountryToShow(newCountryToShow[0]);
  };

  return (
    <div>
      <Filter onChange={handleChange} />
      {countriesToShow.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countriesToShow.length > 1 ? (
        <Countries countriesToShow={countriesToShow} onClick={handleClick} />
      ) : showCountry ? (
        <Country
          countryToShow={countryToShow}
          weatherCountry={weatherCountry}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default App;
