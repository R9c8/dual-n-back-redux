import React from 'react';
import styled from 'styled-components';

import { startGame } from '../../../core/game';

import { GameTable } from './game-table';
import { StartButton } from './start-button';

export const GameSquare = () => (
  <GameSquareBox>
    <StartButton onClick={startGame} />
    <GameTable />
  </GameSquareBox>
);

const GameSquareBox = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
`;
