import React from "react";

const WeatherSetting = () => {
  return (
    <div className="WeatherSettingWrapper">
      <title>設定</title>
      <div className="StyledLabel" htmlFor="location">
        地區
      </div>
      <div
        className="StyledInputList"
        list="location-list"
        id="location"
        name="location"
      >
        <div className="datalist" id="location-list">
          {/* 定義datalist中的options */}
        </div>
      </div>
      <div className="ButtonGroup">
        <button>返回</button>
        <button>儲存</button>
      </div>
    </div>
  );
};

export default WeatherSetting;
