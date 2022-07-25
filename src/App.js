import React from "react";
import Icon from "./Icon";
import "./styles/style.css";

function App() {
  return (
    <div className="container">
      <div className="weatherCard">
        <div className="location">台北市</div>
        <div className="description">多雲時晴</div>

        <div className="currentWeather">
          <div className="temperature">
            23<div className="celsius">°C</div>
          </div>
          <Icon.CloudyIcon className="CloudyIcon" />
        </div>
        <div className="airFlow">
          <Icon.AirFlowIcon className="AirFlowIcon" />
          23 m/h
        </div>
        <div className="rain">
          <Icon.RainIcon className="RainIcon" />
          48%
        </div>
        <Icon.RedoIcon className="RedoIcon" />
      </div>
    </div>
  );
}

export default App;
