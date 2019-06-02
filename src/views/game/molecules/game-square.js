import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { GameTable } from "./game-table";
import { StartButton } from "./start-button";

export const GameSquare = ({ isGameStarted, startGame }) => (
  <GameSquareBox>
    {!isGameStarted && <StartButton onClick={startGame} />}
    <GameTable />
  </GameSquareBox>
);

GameSquare.propTypes = {
  isGameStarted: PropTypes.bool,
  startGame: PropTypes.func,
};

GameSquare.defaultProps = {
  isGameStarted: false,
  startGame: undefined,
};

const GameSquareBox = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
`;
