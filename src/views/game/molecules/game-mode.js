import React from 'react';
import styled from 'styled-components';

import { useStore } from 'effector-react';
import { $isGameStarted, $gameMode, setModeLevel } from '../../../core/game';

const getModeFormatted = (gameMode) => {
  const { match } = gameMode;
  const matchValues = Object.values(match);
  const matchValuesTrueLength = matchValues.filter(v => v).length;
  let modeFormatted;
  if (matchValuesTrueLength === 1) {
    modeFormatted = `Single`;
  }
  if (matchValuesTrueLength === 2) {
    modeFormatted = `Dual`;
  }
  if (matchValuesTrueLength === 3) {
    modeFormatted = `Triple`;
  }
  if (matchValuesTrueLength === 4) {
    modeFormatted = `Quad`;
  }
  if (matchValuesTrueLength === 5) {
    modeFormatted = `Five`;
  }
  return modeFormatted;
};

export const GameMode = () => {
  const isGameStarted = useStore($isGameStarted);
  const gameMode = useStore($gameMode);
  return (
    <GameModeBox>
      {!isGameStarted && (
        <>
          Type:
          <ModeButton type="button">{getModeFormatted(gameMode)}</ModeButton>
          &nbsp;&nbsp;&middot;&nbsp;&nbsp;&nbsp;
          N-Back:&nbsp;
          <select
            onChange={e => setModeLevel(Number(e.target.value))}
            value={gameMode.level}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
          </select>
        </>
      )}
      {isGameStarted && (
        <>
          Type:&nbsp;
          <strong>{getModeFormatted(gameMode)}</strong>
          &nbsp;&nbsp;&nbsp;&middot;&nbsp;&nbsp;&nbsp;
          N-Back:&nbsp;
          <strong>{gameMode.level}</strong>
        </>
      )}
    </GameModeBox>
  );
};

const GameModeBox = styled.div`
  {
    display: flex;
    justify-content: center;
    height: 22px;
  }
`;

const ModeButton = styled.button`
  {
    font-weight: 400;
    color: #00bc8c;
    text-decoration: none;
    background-color: transparent;
    border: 0px;
    margin: 2px 0;
    display: inline;

    &:hover {
      color: #007053;
      text-decoration: underline;
      cursor: pointer;
    }

    &:focus {
      text-decoration: underline;
      -webkit-box-shadow: none;
              box-shadow: none;
    }
  }
`;
