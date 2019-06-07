import React from "react";
import styled from "styled-components";

import { useStore } from "effector-react";
import { $settingsForm, $volume } from "../../../core/game/index";

import { Settings } from "./settings";
import { VolumeSet } from "./volume-set";

export const RightSidebar = () => {
  const settings = useStore($settingsForm);
  const volume = useStore($volume);
  return (
    <RightSidebarBox>
      {settings && <Settings />}
      {(volume || volume === 0) && <VolumeSet />}
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
