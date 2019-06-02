import React from "react";
import PropTypes from "prop-types";

import { TodaysSetsWidget } from "./todays-sets-widget";
import { Hr3, H3 } from "../../../ui";

export const TodaysSets = ({ gameResults }) => (
  <>
    <H3>Today&#39;s Sets</H3>
    <TodaysSetsWidget gameResults={gameResults} />
    <div>Last Set (total/errors):</div>
    <div>
      {gameResults[gameResults.length - 1].mode.match.audio && (
      <>
        Audio:&nbsp;
        <strong>
          {gameResults[gameResults.length - 1].numberOfMatches}
          /
          {gameResults[gameResults.length - 1].resultErrors.audio}
        </strong>
        ;&nbsp;
      </>
      )}
      {gameResults[gameResults.length - 1].mode.match.position && (
      <>
        Position:&nbsp;
        <strong>
          {gameResults[gameResults.length - 1].numberOfMatches}
          /
          {gameResults[gameResults.length - 1].resultErrors.position}
        </strong>
        ;&nbsp;
      </>
      )}
    </div>
    <Hr3 />
  </>
);

TodaysSets.propTypes = {
  gameResults: PropTypes.arrayOf(PropTypes.object).isRequired,
};
