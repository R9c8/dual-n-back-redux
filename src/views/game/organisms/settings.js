import React from "react";
import styled, { css } from "styled-components";

import { Form, Field } from "react-final-form";
import AutoSave from "../../../libs/auto-save";

import {
  H3, H4, Hr2, Input, CheckBox,
} from "../../../ui";

import { Volume } from "../molecules/volume";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const save = async (values) => {
  console.log('Saving', values);
  await sleep(2000);
};

export const Settings = () => (
  <Form
    onSubmit={save}
    initialValues={
      {
        trialsNumber: '20',
        trialsFactor: '1',
        trialsExponent: '2',
        thresholdAdvance: '80',
        thresholdFallback: '50',
        thresholdFallbackCount: '3',
        volume: 60,
        feedbackOnError: true,
        feedbackOnKeyPress: true,
      }
    }
    render={({ handleSubmit, pristine, invalid }) => (
      <form onSubmit={handleSubmit}>
        <H3>Settings</H3>
        <FormGroup />
        <H4>Trial time</H4>
        <Hr2 />
        <H4>Number of trials</H4>
        <div>number - factor - exponent:</div>
        <InputBox width="52px">
          <Field name="trialsNumber">
            {({ input, meta }) => (
              <Input {...input} type="text" />
            )}
          </Field>
        </InputBox>
        &nbsp;-&nbsp;
        <InputBox width="52px">
          <Field name="trialsFactor">
            {({ input, meta }) => (
              <Input {...input} type="text" />
            )}
          </Field>
        </InputBox>
        &nbsp;-&nbsp;
        <InputBox width="52px">
          <Field name="trialsExponent">
            {({ input, meta }) => (
              <Input {...input} type="text" />
            )}
          </Field>
        </InputBox>
        <Hr2 />
        <H4>Thresholds</H4>
        <span>Threshold advance:&nbsp;</span>
        <InputBox width="35px">
          <Field name="thresholdAdvance">
            {({ input, meta }) => (
              <Input {...input} type="text" />
            )}
          </Field>
        </InputBox>
        <span>Threshold fallback:&nbsp;</span>
        <InputBox width="35px">
          <Field name="thresholdFallback">
            {({ input, meta }) => (
              <Input {...input} type="text" />
            )}
          </Field>
        </InputBox>
        <span>Fallback count:&nbsp;</span>
        <InputBox width="35px">
          <Field name="thresholdFallbackCount">
            {({ input, meta }) => (
              <Input {...input} type="text" />
            )}
          </Field>
        </InputBox>
        <Hr2 />
        <H4>Feedback</H4>
        <Field name="feedbackOnError" type="checkbox">
          {({ input, meta }) => (
            <CheckBox {...input} label="Show feedback on error" />
          )}
        </Field>
        <Field name="feedbackOnKeyPress" type="checkbox">
          {({ input, meta }) => (
            <CheckBox {...input} label="Show feedback on key press" />
          )}
        </Field>
        <Hr2 />
        <Field name="volume">
          {({ input, meta }) => (
            <Volume {...input} defaultValue={60} />
          )}
        </Field>
        <AutoSave debounce={1000} save={save} opacity={0.5} />
      </form>
    )}
  />
);

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const InputBox = styled.div`
  ${p => css`width: ${p.width};`}
  display: inline-block;
`;
