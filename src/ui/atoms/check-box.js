import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

export const CheckBox = ({ defaultChecked, label, onChange }) => {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <label style={{ display: 'block' }}>
      <CheckboxContainer>
        <HiddenCheckbox
          checked={checked}
          onChange={(e) => {
            console.log(e);
            if (checked) {
              setChecked(false);
            } else {
              setChecked(true);
            }
            if (onChange) {
              onChange(e);
            }
          }}
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
};

CheckBox.propTypes = {
  defaultChecked: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
};

CheckBox.defaultProps = {
  defaultChecked: true,
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
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div`
  display: block;
  width: 16px;
  height: 16px;
  background: ${props => (props.checked ? "#375a7f" : "white")}
  border-radius: 3px;
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
