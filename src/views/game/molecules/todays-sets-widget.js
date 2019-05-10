import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

export const TodaysSetsWidget = () => (
  <TodaysSetsWidgetBox>
    <TodaysSetsRow
      setIsSuccess={2}
      setNum={1}
      setType="D2B"
      setRate={100}
      setTime={15}
    />
    <TodaysSetsRow
      setIsSuccess={0}
      setNum={2}
      setType="D2B"
      setRate={0}
      setTime={15}
    />
    <TodaysSetsRow
      setIsSuccess={1}
      setNum={3}
      setType="D2B"
      setRate={50}
      setTime={15}
    />
  </TodaysSetsWidgetBox>
);

const TodaysSetsRow = ({
  setIsSuccess, setNum, setType, setRate, setTime,
}) => (
  <TodaysSetsRowBox setIsSuccess={setIsSuccess}>
    <SetNumBox>
      {setNum}
      .
    </SetNumBox>
    <SetTypeBox>{setType}</SetTypeBox>
    <SetRateBox>
      {setRate}
      %
    </SetRateBox>
    <SetTimeBox>
      {setTime}
      &nbsp;s.
    </SetTimeBox>
  </TodaysSetsRowBox>
);

TodaysSetsRow.propTypes = {
  setIsSuccess: PropTypes.number.isRequired,
  setNum: PropTypes.number.isRequired,
  setType: PropTypes.string.isRequired,
  setRate: PropTypes.number.isRequired,
  setTime: PropTypes.number.isRequired,
};

const TodaysSetsWidgetBox = styled.div`
  background-color: #303030;
  margin-bottom: 10px;
  padding: 6px 4px 4px 8px;
  border-radius: 10px;
  height: 110px;
  overflow-y: scroll;
  font-size: 0.8em;
`;

const TodaysSetsRowBox = styled.div`
  ${(props) => {
    let s;
    if (props.setIsSuccess === 0) {
      s = "color: #E74C3C;";
    }
    if (props.setIsSuccess === 1) {
      s = "";
    }
    if (props.setIsSuccess === 2) {
      s = "color: #00bc8c;";
    }
    return s;
  }}
`;

const SetNumBox = styled.span`
  display: inline-block;
  width: 22px;
`;

const SetTypeBox = styled.span`
  display: inline-block;
  width: 77px;
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
