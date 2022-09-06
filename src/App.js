import React, { useState, useEffect, useMemo } from "react";
import "./styles/style.css";
import WeatherCard from "./WeatherCard";
import useWeatherApi from "./useWeatherApi";
import WeatherSetting from "./WeatherSetting";

const App = () => {
  const [weatherElement, fetchData] = useWeatherApi();
  const [currentTheme, setCurrentTheme] = useState("light");

  const moment = weatherElement.currentTime;
  useEffect(() => {
    setCurrentTheme(moment === "day" ? "light" : "dark");
  }, [moment]);

  return (
    <div className="ThemeProvider">
      <div className="container">
        <div
          className="weatherCard"
          style={{
            backgroundColor: currentTheme === "light" ? "#f9f9f9" : "#000000",
          }}
        >
          <WeatherCard
            weatherElement={weatherElement}
            moment={moment}
            fetchData={fetchData}
          />
        </div>
        <WeatherSetting />
      </div>
    </div>
  );
};

export default App;
