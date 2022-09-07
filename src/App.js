import React, { useState, useEffect, useMemo } from "react";
import "./styles/style.css";
import styled from "@emotion/styled";
import WeatherCard from "./WeatherCard";
import useWeatherApi from "./useWeatherApi";
import WeatherSetting from "./WeatherSetting";

const theme = {
  light: {
    backgroundColor: "#ededed",
    foregroundColor: "#f9f9f9",
    boxShadow: "0 1px 3px 0 #999999",
    titleColor: "#212121",
    temperatureColor: "#757575",
    textColor: "#828282",
  },
  dark: {
    backgroundColor: "#1F2022",
    foregroundColor: "#121416",
    boxShadow: "0 1px 4px 0 rgba(12,12,13,0.2),0 0 0 1px rgba(0,0,0,0.15)",
    titleColor: "#f9f9fa",
    temperatureColor: "#dddddd",
    textColor: "#cccccc",
  },
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
        <Container theme={theme.dark} />
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
