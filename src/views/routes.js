import React from "react";
import { renderRoutes } from "react-router-config";

import { GamePage } from "./game/pages/game-page";
//import { AboutPage } from "./game";
//import { TermsPage } from "./game";
//import { NotFoundPage } from "./common";


const routes = [
  {
    path: "/",
    exact: true,
    component: GamePage,
  },
/*  {
    path: "/about",
    exact: true,
    component: AboutPage,
  },
  {
    path: "/terms",
    exact: true,
    component: TermsPage,
  },
  {
    component: NotFoundPage
  } */
];

export const rootRoutes = () => (
  <>{renderRoutes(routes)}</>
);
