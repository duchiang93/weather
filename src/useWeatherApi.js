import { useState, useEffect, useCallback } from "react";

//串接日落及日出時間API
const fetchSunsetTime = (locationName) => {
  let sunRise;
  let sunSet;
  let nowTime;

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

  return fetch(
    `https://opendata.cwb.gov.tw/api/v1/rest/datastore/A-B0062-001?Authorization=CWB-5FC27772-F79D-430D-AF49-BB3BC0EFE3C5&format=JSON&locationName=${locationName}&dataTime=${nowDate}`
  )
    .then((response) => response.json())
    .then((data) => {
      sunRise = new Date(
        `${nowDate} ${data.records.locations.location[0].time[0].SunRiseTime}`
      ).getTime();
      sunSet = new Date(
        `${nowDate} ${data.records.locations.location[0].time[0].SunSetTime}`
      ).getTime();
      nowTime = new Date().getTime();
      return sunRise <= nowTime && nowTime <= sunSet ? "day" : "night";
    });
};

const fetchCurrentWeather = (locationName) => {
  //加上 return 直接把 fetch API 回傳的 Promise 回傳出去
  return fetch(
    `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-5FC27772-F79D-430D-AF49-BB3BC0EFE3C5&locationName=${locationName}`
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

//串接降雨機率與天氣描述API
const fetchWeatherForecast = (cityName) => {
  return fetch(
    `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-5FC27772-F79D-430D-AF49-BB3BC0EFE3C5&locationName=${cityName}`
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

const useWeatherApi = (currentLocation) => {
  const { locationName, cityName } = currentLocation;
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
    currentTime: "",
    isLoading: true,
  });

  const fetchData = useCallback(() => {
    const fetchingData = async () => {
      const [currentWeather, weatherForecast, currentTime] = await Promise.all([
        fetchCurrentWeather(locationName),
        fetchWeatherForecast(cityName),
        fetchSunsetTime(cityName),
      ]);

      setWeatherElement({
        ...currentWeather,
        ...weatherForecast,
        currentTime: currentTime,
        isLoading: false,
      });
    };
    setWeatherElement((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    fetchingData();
  }, [locationName, cityName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [weatherElement, fetchData];
};

export default useWeatherApi;
