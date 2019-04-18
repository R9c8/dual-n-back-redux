import React from 'react';
import { rootRoutes } from "./routes";

import { Normalize } from "styled-normalize";
import { GlobalStyles } from "./global-styles";

export const App = () => (
  <>
    <Normalize />
    <GlobalStyles />
    {rootRoutes()}
  </>
);
