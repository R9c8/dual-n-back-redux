import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { GameInfo } from "./game-info";

export const LeftSidebar = ({ isStarted }) => (
  <LeftSidebarBox>
    <GameInfo />
  </LeftSidebarBox>
);

LeftSidebar.propTypes = {
  isStarted: PropTypes.bool,
};

LeftSidebar.defaultProps = {
  isStarted: true,
};

const LeftSidebarBox = styled.aside`
  position: absolute;
  top: 0;
  left: 0;
  width: 210px;
  height: 650px;
  background-color: #363636;
  padding: 25px 25px;
`;
