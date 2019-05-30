import React from "react";
import styled from "styled-components";

export const Header = () => (
  <HeaderBox>
    <LogoBox>
      <LogoImg src="/logo.png" />
    </LogoBox>
  </HeaderBox>
);

const HeaderBox = styled.header``;

const LogoBox = styled.div`
  {
    margin: 5px auto 0;
    width: 335px;
    height: 80px;
  }
`;

const LogoImg = styled.img`
  {
    height: 80px;
  }
`;
