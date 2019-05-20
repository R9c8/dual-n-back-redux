import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Icon } from "antd";

export const CloseGameButton = ({ onClick }) => (
  <CloseGameButtonBox>
    <IconBox>
      <Icon type="close" onClick={onClick} />
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
  font-size: 30px;
  color: #8a8a8a;
  position: absolute;
  top: 10px;
  right: 20px;
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
