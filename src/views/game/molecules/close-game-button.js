import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Icon } from '@iconify/react';
import closeOutline from '@iconify/react/ant-design/close-outline';

export const CloseGameButton = ({ onClick }) => (
  <CloseGameButtonBox>
    <IconBox>
      <Icon icon={closeOutline} width="36" onClick={onClick} />
    </IconBox>
  </CloseGameButtonBox>
);

CloseGameButton.propTypes = {
  onClick: PropTypes.func,
};

CloseGameButton.defaultProps = {
  onClick: undefined,
};

const CloseGameButtonBox = styled.div`
  color: #8a8a8a;
  position: absolute;
  top: 12px;
  right: 15px;
`;

const IconBox = styled.div`
  &:hover {
    cursor: pointer;
    color: #E74C3C;
  }

  .anticon:focus {
    outline: none !important;
    box-shadow: none !important;
  }
`;
