import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Scrollbars } from 'react-custom-scrollbars';

import { formatTimeFromMs } from "../../../core/game";

export const TodaysSetsWidget = ({ gameResults }) => {
  const [scrollbar, scrollbarSet] = useState(null);
  useEffect(() => {
    if (scrollbar) {
      scrollbar.scrollToBottom();
    }
  });
  return (
    <TodaysSetsWidgetBox>
      <Scrollbars ref={scrollbarSet}>
        {gameResults.map((result, index) => (
          <TodaysSetsRow
            key={result.date}
            num={index + 1}
            typeFormatted={`D${result.mode.level}B`}
            rate={result.rate}
            durationFormatted={formatTimeFromMs(result.duration)}
            isSuccess={result.isSuccess}
            isFail={result.isFail}
          />
        ))}
      </Scrollbars>
    </TodaysSetsWidgetBox>
  );
};

TodaysSetsWidget.propTypes = {
  gameResults: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const TodaysSetsRow = ({
  num,
  typeFormatted,
  rate,
  durationFormatted,
  isSuccess,
  isFail,
}) => (
  <TodaysSetsRowBox isSuccess={isSuccess} isFail={isFail}>
    <SetNumBox>
      {num}
      .
    </SetNumBox>
    <SetTypeBox>{typeFormatted}</SetTypeBox>
    <SetRateBox>
      {rate}
      %
    </SetRateBox>
    <SetTimeBox>
      {durationFormatted}
    </SetTimeBox>
  </TodaysSetsRowBox>
);

TodaysSetsRow.propTypes = {
  num: PropTypes.number.isRequired,
  typeFormatted: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  durationFormatted: PropTypes.string.isRequired,
  isSuccess: PropTypes.bool.isRequired,
  isFail: PropTypes.bool.isRequired,
};

const TodaysSetsWidgetBox = styled.div`
  background-color: #303030;
  margin-bottom: 10px;
  padding: 6px 4px 4px 8px;
  border-radius: 10px;
  height: 110px;
  // overflow-y: scroll;
  font-size: 0.8em;
`;

const TodaysSetsRowBox = styled.div`
  ${p => p.isSuccess && `color: #00bc8c;`}
  ${p => p.isFail && `color: #E74C3C;`}
`;

const SetNumBox = styled.span`
  display: inline-block;
  width: 22px;
`;

const SetTypeBox = styled.span`
  display: inline-block;
  width: 55px;
`;

const SetRateBox = styled.span`
  display: inline-block;
  width: 42px;
`;

const SetTimeBox = styled.span`
  display: inline-block;
  font-size: 0.9em;
  color: #9e9e9e;
`;
