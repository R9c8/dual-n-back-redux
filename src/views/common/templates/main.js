import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { MainTemplate } from "../../../ui/templates/main-template";
import { Header } from "../organisms/header";
import { Footer } from "../organisms/footer";

export const Main = ({ header, footer, children }) => (
  <MainTemplate header={header} footer={footer}>
    <MainBox>{children}</MainBox>
  </MainTemplate>
);

Main.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.node,
  footer: PropTypes.node,
};

Main.defaultProps = {
  header: <Header />,
  footer: <Footer />,
};

export const MainBox = styled.main`
  position: relative;
  overflow: hidden;
  width: 970px;
  height: 650px;
  background-color: #303030;
  border-radius: 30px;
  box-shadow: 0 0 5rem #141414;
`;
