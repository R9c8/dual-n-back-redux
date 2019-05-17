import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * Required: `value`
 */
export const Input = ({
  autoComplete,
  disabled,
  error,
  label,
  name,
  onBlur,
  onChange,
  type,
  value,
}) => (
  <>
    {label && <InputLabel>{label}</InputLabel>}
    <InputNative
      autoComplete={autoComplete}
      disabled={disabled}
      error={Boolean(error)}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      type={type}
      value={value}
    />
  </>
);

Input.propTypes = {
  autoComplete: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
};

Input.defaultProps = {
  autoComplete: undefined,
  disabled: false,
  error: undefined,
  label: undefined,
  name: undefined,
  onBlur: undefined,
  onChange: undefined,
  type: "text",
};

const InputNative = styled.input`
  &:focus {
    color: #444;
    background-color: #fff;
    border-color: #739ac2;
    outline: 0;
    -webkit-box-shadow: 0 0 0 0.2rem rgba(55, 90, 127, 0.25);
            box-shadow: 0 0 0 0.2rem rgba(55, 90, 127, 0.25);
  }

  &:disabled {
    background-color: rgba(80, 80, 80, .1);
  }

  position: relative;
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: calc(1.5em + 0.5rem + 2px);
  padding: 0.25rem 0.5rem;
  font-size: 0.8203125rem;
  font-weight: 400;
  line-height: 1.5;
  color: #444;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid transparent;
  border-radius: 0.2rem;
  -webkit-transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
`;

const InputLabel = styled.label`
  color: currentColor;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  text-align: left;
`;
