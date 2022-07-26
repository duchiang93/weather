import React from "react";
import styled from "@emotion/styled";

import { ReactComponent as DayCloudy } from "./IMG/day-cloudy.svg";
import { ReactComponent as AirFlow } from "./IMG/airFlow.svg";
import { ReactComponent as Rain } from "./IMG/rain.svg";
import { ReactComponent as Redo } from "./IMG/redo.svg";

const Icon = () => {
  return (
    <div>
      <DayCloudy />
      <AirFlow />
      <Rain />
      <Redo />
    </div>
  );
};

export default {
  DayCloudy,
  AirFlow,
  Rain,
  Redo,
};
