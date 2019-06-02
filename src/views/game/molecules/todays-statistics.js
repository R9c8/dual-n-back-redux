import React from "react";
import PropTypes from "prop-types";
import { H3 } from "../../../ui";

import { formatTimeFromMs } from "../../../core/game";

export const TodaysStatistics = ({ gameResults }) => {
  const startTime = new Date(gameResults[0].date);
  const startTimeFormatted = startTime.toTimeString();
  const totalDuration = gameResults.reduce((acc, result) => acc + result.duration, 0);
  return (
    <>
      <H3>Today&#39;s Statistics</H3>
      <div>
        Started:&nbsp;
        <strong>{startTimeFormatted}</strong>
      </div>
      <div>
        Duration:&nbsp;
        <strong>{formatTimeFromMs(totalDuration)}</strong>
      </div>
    </>
  );
};

TodaysStatistics.propTypes = {
  gameResults: PropTypes.arrayOf(PropTypes.object).isRequired,
};
