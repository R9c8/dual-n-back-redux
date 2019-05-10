import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Settings } from "./settings";

export const RightSidebar = ({ isStarted }) => (
  <RightSidebarBox>
    <Settings />
  </RightSidebarBox>
);

RightSidebar.propTypes = {
  isStarted: PropTypes.bool,
};

RightSidebar.defaultProps = {
  isStarted: true,
};

const RightSidebarBox = styled.aside`
  position: absolute;
  top: 0;
  left: 710px;
  width: 210px;
  height: 650px;
  background-color: #363636;
  padding-top: 25px;
  padding-left: 25px;
  padding-right: 23px;
`;
