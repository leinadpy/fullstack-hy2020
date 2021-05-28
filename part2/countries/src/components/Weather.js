import React from "react";

const Weather = ({ weatherCountry }) => {
  return (
    <div>
      <h2>Weather in {weatherCountry.location.name}</h2>
      <div>
        <b>temperature: </b>
        {weatherCountry.current.temperature} Celsius
      </div>
      <img
        src={weatherCountry.current.weather_icons[0]}
        alt="Weather Icon"
        style={{ width: "60px" }}
      />
      <div>
        <b>wind: </b>
        {weatherCountry.current.wind_speed} mph direction{" "}
        {weatherCountry.current.wind_dir}
      </div>
    </div>
  );
};

export default Weather;
