import React from "react";
import styled from "styled-components";

import { useStore } from "effector-react";
import { $settings, $volume } from "../../../core/game/index";

import { Settings } from "./settings";
import { VolumeSet } from "./volume-set";

export const RightSidebar = () => {
  const settings = useStore($settings);
  const volume = useStore($volume);
  return (
    <RightSidebarBox>
      {settings && <Settings />}
      {volume && <VolumeSet />}
    </RightSidebarBox>
  );
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
