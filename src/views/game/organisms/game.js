import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { GameMode } from "../molecules/game-mode";
import { GameButtons } from "../molecules/game-buttons";
import { GameSquare } from "../molecules/game-square";
import { CloseGameButton } from "../molecules/close-game-button";

export const Game = ({
  isGameStarted,
  abortGame,
  startGame,
}) => (
  <>
    {isGameStarted && <CloseGameButton onClick={abortGame} />}
    <GameBox>
      <GameMode isGameStarted={isGameStarted} />
      <GameSquare
        isGameStarted={isGameStarted}
        startGame={startGame}
      />
      <GameButtons />
    </GameBox>
  </>
);

Game.propTypes = {
  isGameStarted: PropTypes.bool,
  startGame: PropTypes.func,
  abortGame: PropTypes.func,
};

Game.defaultProps = {
  isGameStarted: false,
  startGame: undefined,
  abortGame: undefined,
};

const GameBox = styled.div`
  position: absolute;
  top: 0;
  left: 260px;
  width: 400px;
  height: 620px;
  padding: 15px 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
