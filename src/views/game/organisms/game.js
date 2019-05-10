import React from "react";
import styled from 'styled-components';

import { GameMode } from '../molecules/game-mode';
import { GameButtons } from '../molecules/game-buttons';

export const Game = () => (
  <GameBox>
    <GameMode />
    <GameButtons />
  </GameBox>
);

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
