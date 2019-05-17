import 'rc-slider/assets/index.css';

import React from "react";
import styled, { css } from 'styled-components';

import { Form, Field } from 'react-final-form';

import Slider, { createSliderWithTooltip } from 'rc-slider';

import {
  H3, H4, Hr2, Input, CheckBox,
} from '../../../ui';

const onSubmit = (e) => { console.log(e); };

export const Settings = () => (
  <Form
    onSubmit={onSubmit}
    render={({ handleSubmit, pristine, invalid }) => (
      <form onSubmit={handleSubmit}>
        <H3>Settings</H3>
        <FormGroup />
        <H4>Trial time</H4>
        <Hr2 />
        <H4>Number of trials</H4>
        <div>number - factor - exponent:</div>
        <InputBox width="52px">
          <Input value="20" />
        </InputBox>
        &nbsp;-&nbsp;
        <InputBox width="52px">
          <Input value="1" />
        </InputBox>
        &nbsp;-&nbsp;
        <InputBox width="52px">
          <Input value="2" />
        </InputBox>
        <Hr2 />
        <H4>Thresholds</H4>
        <span>Threshold advance:&nbsp;</span>
        <InputBox width="35px">
          <Input value="80" />
        </InputBox>
        <span>Threshold fallback:&nbsp;</span>
        <InputBox width="35px">
          <Input value="50" />
        </InputBox>
        <span>Fallback count:&nbsp;</span>
        <InputBox width="35px">
          <Input value="3" />
        </InputBox>
        <Hr2 />
        <H4>Feedback</H4>
        <CheckBox label="Show feedback on error" />
        <CheckBox label="Show feedback on key press" />
        <Hr2 />
        <H4>Sound volume: 100%</H4>
        <Slider
          defaultValue={60}
          trackStyle={{ backgroundColor: '#00bc8c', height: 3 }}
          handleStyle={{
            borderColor: '#00bc8c',
            height: 16,
            width: 16,
            marginLeft: -6,
            marginTop: -6,
            backgroundColor: 'white',
          }}
          railStyle={{ backgroundColor: '#222', height: 3 }}
        />
      </form>
    )}
  />
);

const styles = {
  root: {
    width: 300,
  },
  slider: {
    padding: '22px 0px',
    trackColor: 'yellow',
    selectionColor: 'green',
  },
};

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const InputBox = styled.div`
  ${p => css`width: ${p.width};`}
  display: inline-block;
`;
