import React from "react";

import { useStore } from "effector-react";
import { $isGameStarted, startGame, abortGame } from "../../../core/game";

import { Main } from "../../common/templates/main";
import { Header } from "../../common/organisms/header";
import { Footer } from "../../common/organisms/footer";

import { LeftSidebar } from "../organisms/left-sidebar";
import { RightSidebar } from "../organisms/right-sidebar";
import { Game } from "../organisms/game";

export const GamePage = () => {
  const isGameStarted = useStore($isGameStarted);
  return (
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
  );
};
