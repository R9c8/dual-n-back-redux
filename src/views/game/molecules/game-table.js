import React from "react";
import isEqual from "lodash/isEqual";
import { useStore } from "effector-react";
import styled from "styled-components";

import { $gameSquare } from "../../../core/game";

export const GameTable = () => {
  const gameSquare = useStore($gameSquare);
  return (
    <table cellPadding="0" cellSpacing="0">
      <tbody>
        <tr id="row-1">
          <Td11>{gameSquare && isEqual(gameSquare.position, [1, 1]) && <PositionElement />}</Td11>
          <Td21>{gameSquare && isEqual(gameSquare.position, [1, 2]) && <PositionElement />}</Td21>
          <Td31>{gameSquare && isEqual(gameSquare.position, [1, 3]) && <PositionElement />}</Td31>
        </tr>
        <tr id="row-1">
          <Td12>{gameSquare && isEqual(gameSquare.position, [2, 1]) && <PositionElement />}</Td12>
          <Td22>{gameSquare && isEqual(gameSquare.position, [2, 2]) && <PositionElement />}</Td22>
          <Td32>{gameSquare && isEqual(gameSquare.position, [2, 3]) && <PositionElement />}</Td32>
        </tr>
        <tr id="row-1">
          <Td13>{gameSquare && isEqual(gameSquare.position, [3, 1]) && <PositionElement />}</Td13>
          <Td23>{gameSquare && isEqual(gameSquare.position, [3, 2]) && <PositionElement />}</Td23>
          <Td33>{gameSquare && isEqual(gameSquare.position, [3, 3]) && <PositionElement />}</Td33>
        </tr>
      </tbody>
    </table>
  );
};

const PositionElement = styled.div`
  margin: 0 auto;
  width: 100px;
  height: 100px;
  border-radius: 15px;
  background-color: #00bc8c;
`;

const Td11 = styled.td`
  margin: 0;
  //padding: 16px;
  width: 133px;
  height: 133px;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  border-right: 1px solid #8a8a8a;
  border-bottom: 1px solid #8a8a8a;
`;

const Td21 = styled.td`
  margin: 0;
  //padding: 16px;
  width: 133px;
  height: 133px;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  border-right: 1px solid #8a8a8a;
  border-bottom: 1px solid #8a8a8a;
`;

const Td31 = styled.td`
  margin: 0;
  //padding: 16px;
  width: 133px;
  height: 133px;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  border-bottom: 1px solid #8a8a8a;
`;

const Td12 = styled.td`
  margin: 0;
  //padding: 16px;
  width: 133px;
  height: 133px;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  border-right: 1px solid #8a8a8a;
  border-bottom: 1px solid #8a8a8a;
`;

const Td22 = styled.td`
  margin: 0;
  //padding: 16px;
  width: 133px;
  height: 133px;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  border-right: 1px solid #8a8a8a;
  border-bottom: 1px solid #8a8a8a;
`;

const Td32 = styled.td`
  margin: 0;
  //padding: 16px;
  width: 133px;
  height: 133px;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  border-bottom: 1px solid #8a8a8a;
`;

const Td13 = styled.td`
  margin: 0;
  //padding: 16px;
  width: 133px;
  height: 133px;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  border-right: 1px solid #8a8a8a;
`;

const Td23 = styled.td`
  margin: 0;
  //padding: 16px;
  width: 133px;
  height: 133px;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  border-right: 1px solid #8a8a8a;
`;

const Td33 = styled.td`
  margin: 0;
  //padding: 16px;
  width: 133px;
  height: 133px;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`;
