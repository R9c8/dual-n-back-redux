import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

export const Radio = ({
  label,
}) => (
  <div class="custom-control custom-radio" style="display: inline-block">
    <NativeRadioInput
      type="radio"
      id="customRadio2"
      name="customRadio"
    />
    {label && <RadioLabel for={id}>{label}</RadioLabel>}
  </div>
);

const RadioLabel = styled.label`
  margin-bottom: 0;
`;

const NativeRadioInput = styled.input`
  position: absolute;
  z-index: -1;
  opacity: 0;
`;

const RadioBox = styled.div`
`;
