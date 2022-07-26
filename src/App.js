import React, { useState, useEffect, useCallback } from "react";
import Icon from "./Icon";
import "./styles/style.css";
import WeatherIcon from "./WeatherIcon";

const fetchCurrentWeather = () => {
  //加上 return 直接把 fetch API 回傳的 Promise 回傳出去
  return fetch(
    "https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-BEFBC2DC-A35D-45D0-88E1-BD1CCC49891F&locationName=臺北"
  )
    .then((response) => response.json())
    .then((data) => {
      // 定義 `locationData` 把回傳的資料中會用到的部分取出來
      const locationData = data.records.location[0];

      // 將風速（WDSD）、氣溫（TEMP）和濕度（HUMD）的資料取出
      const weatherElements = locationData.weatherElement.reduce(
        (neededElements, item) => {
          if (["WDSD", "TEMP", "HUMD"].includes(item.elementName)) {
            neededElements[item.elementName] = item.elementValue;
          }
          return neededElements;
        },
        {}
      );
      // 要使用到 React 組件中的資料
      return {
        observationTime: locationData.time.obsTime,
        locationName: locationData.locationName,
        temperature: weatherElements.TEMP,
        windSpeed: weatherElements.WDSD,
        humid: weatherElements.HUMD,
      };
    });
};

const fetchWeatherForecast = () => {
  return fetch(
    "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-BEFBC2DC-A35D-45D0-88E1-BD1CCC49891F&locationName=臺北市 "
  )
    .then((response) => response.json())
    .then((data) => {
      const locationData = data.records.location[0];
      const weatherElements = locationData.weatherElement.reduce(
        (neededElements, item) => {
          if (["Wx", "PoP", "CI"].includes(item.elementName)) {
            neededElements[item.elementName] = item.time[0].parameter;
          }
          return neededElements;
        },
        {}
      );
      return {
        description: weatherElements.Wx.parameterName,
        weatherCode: weatherElements.Wx.parameterValue,
        rainPossibility: weatherElements.PoP.parameterName,
        comfortability: weatherElements.CI.parameterName,
      };
    });
};

function App() {
  const [weatherElement, setWeatherElement] = useState({
    observationTime: new Date(),
    locationName: "",
    humid: 0,
    temperature: 0,
    windSpeed: 0,
    description: "",
    weatherCode: 0,
    rainPossibility: 0,
    comfortability: "",
  });

  const fetchData = useCallback(() => {
    const fetchingData = async () => {
      const [currentWeather, weatherForecast] = await Promise.all([
        fetchCurrentWeather(),
        fetchWeatherForecast(),
      ]);
      setWeatherElement({
        ...currentWeather,
        ...weatherForecast,
      });
    };

    fetchingData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="container">
      <div className="weatherCard">
        <div className="location">{weatherElement.locationName}</div>
        <div className="description">{weatherElement.comfortability}</div>
        <div className="currentWeather">
          <div className="temperature">
            {Math.round(weatherElement.temperature)}
            <div className="celsius">°C</div>
          </div>
          <WeatherIcon
            currentWeatherCode={weatherElement.weatherCode}
            moment="night"
          />
        </div>
        <div className="airFlow">
          <Icon.AirFlow className="AirFlowIcon" />
          {weatherElement.windSpeed} m/h
        </div>
        <div className="rain">
          <Icon.Rain className="RainIcon" />
          {Math.round(weatherElement.rainPossibility)} %
        </div>
        <Icon.Redo className="RedoIcon" onClick={fetchData} />
        <div className="observationTime">
          最後觀測時間：
          {new Intl.DateTimeFormat("zh-TW", {
            hour: "numeric",
            minute: "numeric",
          }).format(new Date(weatherElement.observationTime))}{" "}
        </div>
      </div>
    </div>
  );
}

export default App;
