import React, { useState, useEffect, useMemo } from "react";
import "./styles/style.css";
import WeatherCard from "./WeatherCard";
import useWeatherApi from "./useWeatherApi";
import WeatherSetting from "./WeatherSetting";

//串接日落及日出時間API
const fetchSunsetTime = (locationName) => {
  let sunRise = Number();
  let sunSet = Number();
  let nowTime = Number();

  // 取得當前時間
  const now = new Date();
  // 將當前時間以 "yyyy-mm-dd" 的時間格式呈現
  const nowDate = Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(now)
    .replace(/\//g, "-");

  fetch(
    `https://opendata.cwb.gov.tw/api/v1/rest/datastore/A-B0062-001?Authorization=CWB-BEFBC2DC-A35D-45D0-88E1-BD1CCC49891F&format=JSON&locationName=臺北市&dataTime=${nowDate}`
  )
    .then((response) => response.json())
    .then((data) => {
      sunRise = new Date(
        `${nowDate} ${data.records.locations.location[0].time[0].parameter[1].parameterValue}`
      ).getTime();
      sunSet = new Date(
        `${nowDate} ${data.records.locations.location[0].time[0].parameter[5].parameterValue}`
      ).getTime();
      nowTime = new Date().getTime();
    });

  return sunRise <= nowTime && nowTime <= sunSet ? "day" : "night";
};

const App = () => {
  const [weatherElement, fetchData] = useWeatherApi();
  const [currentTheme, setCurrentTheme] = useState("light");
  const { locationName } = weatherElement;

  const moment = useMemo(() => fetchSunsetTime(locationName), [locationName]);

  useEffect(() => {
    setCurrentTheme(moment === "day" ? "light" : "dark");
  }, [moment]);

  return (
    <div className="ThemeProvider">
      <div className="container">
        <div className="weatherCard">
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
