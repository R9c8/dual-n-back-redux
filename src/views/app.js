import React from 'react';

import { Normalize } from "styled-normalize";
import { GlobalStyles } from "./global-styles";

import { rootRoutes } from "./routes";

export const App = () => (
  <>
    <Normalize />
    <GlobalStyles />
    {rootRoutes()}
  </>
);
