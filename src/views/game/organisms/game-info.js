import React from "react";

import { NextSet } from "../molecules/next-set";
import { TodaysSets } from '../molecules/todays-sets';
import { TodaysStatistics } from '../molecules/todays-statistics';

export const GameInfo = () => (
  <>
    <NextSet />
    <TodaysSets />
    <TodaysStatistics />
  </>
);
