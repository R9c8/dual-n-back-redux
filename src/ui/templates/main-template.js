import React from "react";
import styled from "styled-components";

export const MainTemplate = ({ header, footer, children }) => (
  <MainContainer>
    {header && <>{header}</>}
    {children}
    {footer && <>{footer}</>}
  </MainContainer>
);

const MainContainer = styled.div`
  width: 970px;
`;
