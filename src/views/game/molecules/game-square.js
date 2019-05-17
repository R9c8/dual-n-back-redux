import React from 'react';
import styled from 'styled-components';

import { GameTable } from './game-table';
import { StartButton } from './start-button';

export const GameSquare = () => (
  <GameSquareBox>
    <StartButton />
    <GameTable />
  </GameSquareBox>
);

const GameSquareBox = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
`;
