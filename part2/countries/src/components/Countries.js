import React from "react";

const Countries = ({ countriesToShow, onClick }) => {
  return countriesToShow.map((country) => (
    <div key={country.alpha3Code}>
      {country.name}{" "}
      <button id={country.name} onClick={onClick}>
        show
      </button>
    </div>
  ));
};

export default Countries;
