import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

export const StartButton = ({ onClick }) => (
  <StartButtonBox>
    <StartButtonElement onClick={onClick}>
      <CaptureFirst>Press the Spacebar to start training</CaptureFirst>
      <CaptureSecond>or click this message</CaptureSecond>
    </StartButtonElement>
  </StartButtonBox>
);

StartButton.propTypes = {
  onClick: PropTypes.func,
};

StartButton.defaultProps = {
  onClick: undefined,
};

const StartButtonElement = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: space-around;
  background-color: #444;
  padding: 0.75rem 1.25rem;
  border-radius: 115px;
  box-shadow: 0 0 2rem #292929;
  opacity: 0.85;

  &:hover {
    cursor: pointer;
    opacity: 1;
    background-color: #00bc8c;
    transition: color 0.05s ease-in-out, background-color 0.05s ease-in-out,
      border-color 0.05s ease-in-out, box-shadow 0.05s ease-in-out,
      -webkit-box-shadow 0.05s ease-in-out;
  }
`;

const StartButtonBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CaptureFirst = styled.span`
  display: block;
  font-size: 1.2rem;
`;

const CaptureSecond = styled.span`
  display: block;
`;
