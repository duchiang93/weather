import React, { useState, useEffect, useMemo } from "react";
import styled from "@emotion/styled";

import { ReactComponent as DayThunderstorm } from "./IMG/day-thunderstorm.svg";
import { ReactComponent as DayClear } from "./IMG/day-clear.svg";
import { ReactComponent as DayCloudyFog } from "./IMG/day-cloudy-fog.svg";
import { ReactComponent as DayFog } from "./IMG/day-fog.svg";
import { ReactComponent as DayPartiallyClearWithRain } from "./IMG/day-partially-clear-with-rain.svg";
import { ReactComponent as DaySnowing } from "./IMG/day-snowing.svg";
import { ReactComponent as NightThunderstorm } from "./IMG/night-thunderstorm.svg";
import { ReactComponent as NightClear } from "./IMG/night-clear.svg";
import { ReactComponent as NightCloudyFog } from "./IMG/night-cloudy-fog.svg";
import { ReactComponent as NightCloudy } from "./IMG/night-cloudy.svg";
import { ReactComponent as NightFog } from "./IMG/night-fog.svg";
import { ReactComponent as NightPartiallyClearWithRain } from "./IMG/night-partially-clear-with-rain.svg";
import { ReactComponent as NightSnowing } from "./IMG/night-snowing.svg";
import { ReactComponent as DayCloudy } from "./IMG/day-cloudy.svg";

const weatherTypes = {
  isThunderstorm: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
  isClear: [1],
  isCloudyFog: [25, 26, 27, 28],
  isCloudy: [2, 3, 4, 5, 6, 7],
  isFog: [24],
  isPartiallyClearWithRain: [
    8, 9, 10, 11, 12, 13, 14, 19, 20, 29, 30, 31, 32, 38, 39,
  ],
  isSnowing: [23, 37, 42],
};

const weatherIcons = {
  day: {
    isThunderstorm: <DayThunderstorm />,
    isClear: <DayClear />,
    isCloudyFog: <DayCloudyFog />,
    isCloudy: <DayCloudy />,
    isFog: <DayFog />,
    isPartiallyClearWithRain: <DayPartiallyClearWithRain />,
    isSnowing: <DaySnowing />,
  },
  night: {
    isThunderstorm: <NightThunderstorm />,
    isClear: <NightClear />,
    isCloudyFog: <NightCloudyFog />,
    isCloudy: <NightCloudy />,
    isFog: <NightFog />,
    isPartiallyClearWithRain: <NightPartiallyClearWithRain />,
    isSnowing: <NightSnowing />,
  },
};

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

const IconContainer = styled.div`
  flex-basis: 45%;

  svg {
    max-height: 140px;
  }
`;
const weatherCode2Type = (weatherCode) =>
  Object.entries(weatherTypes).reduce(
    (currentWeatherType, [weatherType, weatherCodes]) =>
      weatherCodes.includes(Number(weatherCode))
        ? weatherType
        : currentWeatherType,
    ""
  );

const WeatherIcon = ({ currentWeatherCode, moment }) => {
  const [currentWeatherIcon, setCurrentWeatherIcon] = useState("isClear");

  const theWeatherIcon = useMemo(
    () => weatherCode2Type(currentWeatherCode),
    [currentWeatherCode]
  );

  useEffect(() => {
    setCurrentWeatherIcon(theWeatherIcon);
  }, [theWeatherIcon]);

  return (
    <IconContainer>{weatherIcons[moment][currentWeatherIcon]}</IconContainer>
  );
};

export default WeatherIcon;
