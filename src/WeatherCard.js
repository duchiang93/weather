import React, { Fragment } from "react";
import WeatherIcon from "./WeatherIcon";
import Icon from "./Icon";

const WeatherCard = (props) => {
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
      <div className="location">{locationName}</div>
      <div className="description">{comfortability}</div>
      <div className="currentWeather">
        <div className="temperature">
          {Math.round(temperature)}
          <div className="celsius">°C</div>
        </div>
        <WeatherIcon
          currentWeatherCode={weatherCode}
          moment={moment || "day"}
        />
      </div>
      <div className="airFlow">
        <Icon.AirFlow className="AirFlowIcon" />
        {windSpeed} m/h
      </div>
      <div className="rain">
        <Icon.Rain className="RainIcon" />
        {Math.round(rainPossibility)} %
      </div>

      <div className="loading" onClick={fetchData}>
        <div className="observationTime">
          最後觀測時間：
          {new Intl.DateTimeFormat("zh-TW", {
            hour: "numeric",
            minute: "numeric",
          }).format(new Date(observationTime))}{" "}
          {isLoading ? (
            <Icon.LoadingIcon
              className="RefreshIcon"
              style={{
                animationDuration: ` ${isLoading ? "1.5s" : "0s"}`,
              }}
            />
          ) : (
            <Icon.Refresh className="RefreshIcon" />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default WeatherCard;
