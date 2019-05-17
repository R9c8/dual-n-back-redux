import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

export const Radio = ({
  checked,
  label,
  onChange,
  value,
}) => (
  <label>
    <RadioContainer>
      <HiddenRadio
        checked={checked}
        onChange={onChange}
        value={value}
      />
      <StyledRadio checked={checked} />
    </RadioContainer>
    <Label>{label}</Label>
  </label>
);

Radio.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string.isRequired,
};

Radio.defaultProps = {
  checked: true,
  label: undefined,
  onChange: undefined,
};

const RadioContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 3px;
`;

const HiddenRadio = styled.input.attrs({ type: "radio" })`
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

const StyledRadio = styled.div`
  top: 0.203125rem;
  left: -1.5rem;
  display: block;
  width: 1rem;
  height: 1rem;
  content: "";
  background: no-repeat 50% / 50% 50%;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  background-color: ${props => (props.checked ? "#375a7f" : "white")};
  ${props => (props.checked && `background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");`)}
  transition: all 150ms;

  ${HiddenRadio}:focus + & {
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
