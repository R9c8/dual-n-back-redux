import React from "react";

import { H3 } from "../../../ui";

export const TodaysStatistics = () => (
  <>
    <H3>Today&#39;s Statistics</H3>
    <span style={{ display: "block" }}>
      Started:&nbsp;
      <strong>2019-04-14 17:40:35</strong>
    </span>
    <span style={{ display: "block" }}>
      Duration:&nbsp;
      <strong>15 s.</strong>
    </span>
    <span style={{ display: "block" }}>
      N-Back Avg:&nbsp;
      <strong>3.0</strong>
      ;&nbsp; Max:&nbsp;
      <strong>3.0</strong>
    </span>
  </>
);
