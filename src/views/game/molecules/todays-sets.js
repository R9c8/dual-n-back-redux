import React from "react";

import { TodaysSetsWidget } from "./todays-sets-widget";
import { Hr3, H3 } from "../../../ui";

export const TodaysSets = () => (
  <>
    <H3>Today&#39;s Sets</H3>
    <TodaysSetsWidget />
    <span style={{ display: "block" }}>Last Set (total/errors):</span>
    <span style={{ display: "block" }}>
      Audio:&nbsp;
      <strong>1/0</strong>
      ;&nbsp; Position:&nbsp;
      <strong>1/0</strong>
    </span>
    <Hr3 />
  </>
);
