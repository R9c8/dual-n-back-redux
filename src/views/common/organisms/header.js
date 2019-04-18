import React from "react";
import styled from "styled-components";

export const Header = () => (
  <HeaderBox>
    <LogoBox>
      <LogoImg src="/logo.png"></LogoImg>
    </LogoBox>
  </HeaderBox>
);

const HeaderBox = styled.header`
`;

const LogoBox = styled.div`
  {
      margin: 0 auto;
      width: 300px;
  }
`;

const LogoImg = styled.img`
  {
    height: 80px;
  }
`;