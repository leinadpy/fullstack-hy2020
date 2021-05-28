import React from "react";
import Weather from "./Weather";

const Country = ({ countryToShow, weatherCountry }) => {
  return (
    <>
      <h1>{countryToShow.name}</h1>
      <p>capital {countryToShow.capital}</p>
      <p>population {countryToShow.population}</p>
      <h2>languages</h2>
      <ul>
        {countryToShow.languages.map((language) => (
          <li key={language.iso639_2}>{language.name}</li>
        ))}
      </ul>
      <img src={countryToShow.flag} alt="flag" style={{ width: "120px" }} />
      <Weather weatherCountry={weatherCountry} />
    </>
  );
};

export default Country;
