import React, { Fragment } from "react";
import WeatherIcon from "./WeatherIcon";
import Icon from "./Icon";
import styled from "@emotion/styled";

const WeatherCard = (props) => {
  const Location = styled.div`
    font-size: 28px;
    color: ${({ theme }) => theme.titleColor};
    margin-bottom: 20px;
  `;

  const Description = styled.div`
    font-size: 16px;
    color: ${({ theme }) => theme.textColor};
    margin-bottom: 15px;
  `;

  const CurrentWeather = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  `;

  const Temperature = styled.div`
    color: ${({ theme }) => theme.temperatureColor};
    font-size: 96px;
    font-weight: 300;
    display: flex;
  `;

  const Celsius = styled.div`
    font-weight: normal;
    font-size: 42px;
  `;

  const AirFlow = styled.div`
    display: flex;
    align-items: center;
    font-size: 16x;
    font-weight: 300;
    color: ${({ theme }) => theme.textColor};
    margin-bottom: 20px;

    .AirFlowIcon {
      width: 30px;
      height: auto;
      margin-right: 30px;
    }
  `;

  const Rain = styled.div`
    display: flex;
    align-items: center;
    font-size: 16x;
    font-weight: 300;
    color: ${({ theme }) => theme.textColor};

    .RainIcon {
      width: 30px;
      height: auto;
      margin-right: 30px;
    }
  `;

  const Refresh = styled.div`
    color: ${({ theme }) => theme.textColor};

    svg {
      width: 20px;
      height: 20px;
      position: absolute;
      right: -30px;
      bottom: 0px;
      cursor: pointer;
      animation: rotate infinite 0s linear;
      animation-duration: ${({ isLoading }) => (isLoading ? "1.5s" : "0s")};
    }

    @keyframes rotate {
      from {
        transform: rotate(360deg);
      }
      to {
        transform: rotate(0deg);
      }
    }
  `;

  const ObservationTime = styled.div`
    position: absolute;
    right: 50px;
    bottom: 15px;
    color: #828282;
  `;

  const { weatherElement, moment, fetchData } = props;
  const {
    observationTime,
    locationName,
    temperature,
    windSpeed,
    weatherCode,
    rainPossibility,
    comfortability,
    isLoading,
  } = weatherElement;

  return (
    <Fragment>
      <Location>{locationName}</Location>
      <Description>{comfortability}</Description>
      <CurrentWeather>
        <Temperature>
          {Math.round(temperature)}
          <Celsius>°C</Celsius>
        </Temperature>
        <WeatherIcon
          currentWeatherCode={weatherCode}
          moment={moment || "day"}
        />
      </CurrentWeather>
      <AirFlow>
        <Icon.AirFlow className="AirFlowIcon" />
        {windSpeed} m/h
      </AirFlow>
      <Rain>
        <Icon.Rain className="RainIcon" />
        {Math.round(rainPossibility)} %
      </Rain>

      <Refresh onClick={fetchData} isLoading={isLoading}>
        <ObservationTime>
          最後觀測時間：
          {new Intl.DateTimeFormat("zh-TW", {
            hour: "numeric",
            minute: "numeric",
          }).format(new Date(observationTime))}{" "}
          {isLoading ? <Icon.LoadingIcon /> : <Icon.Refresh />}
        </ObservationTime>
      </Refresh>
    </Fragment>
  );
};

export default WeatherCard;
