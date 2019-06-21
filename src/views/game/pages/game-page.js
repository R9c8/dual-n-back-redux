import React from "react";
import ReactRouterPropTypes from 'react-router-prop-types';

import { useStore } from "effector-react";
import { RouteGate } from "../../../core/routing";
import { $isGameStarted, startGame, abortGame } from "../../../core/game";

import { Main } from "../../common/templates/main";
import { Header } from "../../common/organisms/header";
import { Footer } from "../../common/organisms/footer";

import { LeftSidebar } from "../organisms/left-sidebar";
import { RightSidebar } from "../organisms/right-sidebar";
import { Game } from "../organisms/game";

export const GamePage = ({ route }) => {
  const isGameStarted = useStore($isGameStarted);
  return (
    <>
      <RouteGate path={route.path} />
      <Main
        header={<Header isGameStarted={isGameStarted} />}
        footer={<Footer isGameStarted={isGameStarted} />}
      >
        {!isGameStarted && <LeftSidebar />}
        <Game
          isGameStarted={isGameStarted}
          startGame={startGame}
          abortGame={abortGame}
        />
        {!isGameStarted && <RightSidebar />}
      </Main>
    </>
  );
};

GamePage.propTypes = {
  route: ReactRouterPropTypes.route.isRequired,
};
