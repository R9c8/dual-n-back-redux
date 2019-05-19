import React from "react";

import { useStore } from 'effector-react';
import { $isGameStarted } from '../../../core/game/index';

import { Main } from "../../common/templates/main";
import { Header } from "../../common/organisms/header";
import { Footer } from "../../common/organisms/footer";

import { LeftSidebar } from "../organisms/left-sidebar";
import { RightSidebar } from "../organisms/right-sidebar";
import { Game } from "../organisms/game";

export const GamePage = () => {
  const isGameStarted = useStore($isGameStarted);
  return (
    <Main header={<Header />} footer={<Footer />}>
      {!isGameStarted && <LeftSidebar />}
      <Game />
      {!isGameStarted && <RightSidebar />}
    </Main>
  );
};
