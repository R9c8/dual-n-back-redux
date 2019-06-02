import React from "react";
import { useStore } from "effector-react";
import isEqual from "lodash/isEqual";

import {
  $nextSetWidget,
  $gameResults,
  // $todaysSetsWidget,
  // $todaysStatisticsWidget,
} from "../../../core/game";

import { NextSet } from "../molecules/next-set";
import { TodaysSets } from '../molecules/todays-sets';
import { TodaysStatistics } from '../molecules/todays-statistics';

export const GameInfo = () => {
  const nextSetWidget = useStore($nextSetWidget);
  const gameResults = useStore($gameResults);
  // const todaysStatisticsWidget = useStore($todaysStatisticsWidget);
  return (
    <>
      {nextSetWidget && (
        <NextSet
          level={nextSetWidget.level}
          numberOfTrials={nextSetWidget.numberOfTrials}
          trialTime={nextSetWidget.trialTime}
          trialTimeIncrement={nextSetWidget.trialTimeIncrement}
          duration={nextSetWidget.duration}
        />
      )}
      {!isEqual(gameResults, []) && <TodaysSets gameResults={gameResults} />}
      {!isEqual(gameResults, []) && <TodaysStatistics gameResults={gameResults} />}
    </>
  );
};
