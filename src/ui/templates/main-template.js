import React from "react";
import PropTypes from 'prop-types';
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

MainTemplate.propTypes = {
  header: PropTypes.node,
  footer: PropTypes.node,
  children: PropTypes.node,
};

MainTemplate.defaultProps = {
  header: null,
  footer: null,
  children: null,
};
