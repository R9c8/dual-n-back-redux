import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

export const CheckBox = ({
  checked,
  label,
  onChange,
}) => (
  <label style={{ display: 'block' }}>
    <CheckboxContainer>
      <HiddenCheckbox
        checked={checked}
        onChange={onChange}
      />
      <StyledCheckbox checked={checked}>
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
    <Label>{label}</Label>
  </label>
);

CheckBox.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
};

CheckBox.defaultProps = {
  checked: true,
  label: undefined,
  onChange: undefined,
};

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 3px;
`;
// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  border-color: transparent;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
  -webkit-transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
`;

const StyledCheckbox = styled.div`
  display: block;
  width: 16px;
  height: 16px;
  background: ${props => (props.checked ? "#375a7f" : "white")}
  border-radius: 4px;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 0.2rem rgba(55, 90, 127, 0.25);
  }

  ${Icon} {
    visibility: ${props => (props.checked ? "visible" : "hidden")}
  }
`;

const Label = styled.span`
  margin-left: 8px;
  vertical-align: middle;
  &:hover {
    cursor: pointer;
  }
`;
