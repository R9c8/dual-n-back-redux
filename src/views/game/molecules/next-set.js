import React from "react";
import PropTypes from "prop-types";

import { formatTimeFromMs } from "../../../lib/time";

import { Hr3, H3 } from "../../../ui";

export const NextSet = ({
  level,
  numberOfTrials,
  trialTime,
  trialTimeIncrement,
  duration,
}) => (
  <>
    <H3>Next Set</H3>
    <div>
      Level:&nbsp;
      <strong>{level}</strong>
    </div>
    <div>
      Number of trials:&nbsp;
      <strong>{numberOfTrials}</strong>
    </div>
    <div>
      Trial Time:&nbsp;
      <strong>{formatTimeFromMs(trialTime)}</strong>
    </div>
    {trialTimeIncrement !== 0 && (
      <div>
        Trial Time Increment:&nbsp;
        <strong>{formatTimeFromMs(trialTimeIncrement)}</strong>
      </div>
    )}
    <div>
      Set duration:&nbsp;
      <strong>{formatTimeFromMs(duration)}</strong>
    </div>
    <Hr3 />
  </>
);

NextSet.propTypes = {
  level: PropTypes.number.isRequired,
  numberOfTrials: PropTypes.number.isRequired,
  trialTime: PropTypes.number.isRequired,
  trialTimeIncrement: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
};
