import React from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";

import { useStore } from "effector-react";
import {
  $gameMode,
  $gameButtons,
  positionMatchButtonPress,
  audioMatchButtonPress,
} from "../../../core/game";

export const GameButtons = () => {
  const gameMode = useStore($gameMode);
  const gameButtons = useStore($gameButtons);
  // console.log(gameButtons);
  return (
    <GameButtonsBox>
      {gameMode.match.position && (
        <GameButton
          keyLabel="A"
          label="Position Match"
          onClick={() => {
            if (!gameButtons.position.disabled) {
              positionMatchButtonPress();
            }
          }}
          disabled={gameButtons.position.disabled}
          showKeyPress={gameButtons.position.showKeyPress}
          showError={gameButtons.position.showError}
        />
      )}
      {gameMode.match.audio && (
        <GameButton
          keyLabel="L"
          label="Audio Match"
          onClick={() => {
            if (!gameButtons.audio.disabled) {
              audioMatchButtonPress();
            }
          }}
          disabled={gameButtons.audio.disabled}
          showKeyPress={gameButtons.audio.showKeyPress}
          showError={gameButtons.audio.showError}
        />
      )}
      {gameMode.match.number && (
        <GameButton keyLabel="D" label="Number Match" />
      )}
      {gameMode.match.color && (
        <GameButton keyLabel="F" label="Color Match" />
      )}
      {gameMode.match.shape && (
        <GameButton keyLabel="J" label="Shape Match" />
      )}
    </GameButtonsBox>
  );
};

const GameButton = ({
  keyLabel,
  label,
  onClick,
  disabled,
  showKeyPress,
  showError,
}) => (
  <GameButtonBox
    type="button"
    onClick={onClick}
    disabled={disabled}
    showKeyPress={showKeyPress}
    showError={showError}
  >
    <KeyLabel>{ keyLabel }</KeyLabel>
    :&nbsp;
    { label }
  </GameButtonBox>
);

GameButton.propTypes = {
  keyLabel: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  showKeyPress: PropTypes.bool,
  showError: PropTypes.bool,
};

GameButton.defaultProps = {
  onClick: undefined,
  disabled: false,
  showKeyPress: false,
  showError: false,
};

const GameButtonsBox = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const GameButtonBox = styled.button`
  display: inline-block;
  font-weight: 400;
  color: #00bc8c;
  
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
    -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  background-color: transparent;
  border: 1px solid #00bc8c;
  padding: 0.375rem 0.75rem;
  font-size: 0.9375rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  -webkit-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;

  &:hover {
    cursor: pointer;
  }

  &:active {
    color: #fff;
    background-color: #00bc8c;
    // border-color: #00bc8c;
    background-color: transparent;
    -webkit-box-shadow: 0 0 0 0.2rem rgba(0, 188, 140, 0.5);
            box-shadow: 0 0 0 0.2rem rgba(0, 188, 140, 0.5);
  }

  &:focus {
    outline: none !important;
    box-shadow: none !important;
  }
  margin-bottom: 10px;
  border-radius: 20px;
  transition: color 0.05s ease-in-out, background-color 0.05s ease-in-out, border-color 0.05s ease-in-out, box-shadow 0.05s ease-in-out, -webkit-box-shadow 0.05s ease-in-out;

  ${p => p.disabled
    && `opacity: 0.65;`}

  ${p => p.showKeyPress
    && `color: #fff;
        opacity: 1;`}

  ${p => p.showError
    && `border-color: #E74C3C;
        color: #E74C3C;
        opacity: 1;`}
`;

const KeyLabel = styled.span`
  color: #F39C12;
`;
