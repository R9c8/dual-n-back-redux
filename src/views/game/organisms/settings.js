import React, { useState } from "react";
import styled, { css } from "styled-components";

import { useStore } from 'effector-react';

import { Icon } from "antd";
import Popover from "react-tiny-popover";

import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";

import { $settings, setSettings, resetSettingsAndMode } from '../../../core/game/index';

import AutoSave from "../../../lib/auto-save";

import {
  H3, H4, Hr2, Input, CheckBox, Radio, SmallButton, PopoverContent,
} from "../../../ui";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const save = async (values) => {
  // console.log('Saving', values);
  setSettings(values);
  await sleep(500);
};

const numberOfTrialsPopoverContent = (
  <PopoverContent>
    The number of trials is calculated by the formula&nbsp;
    <strong style={{ color: "#00bc8c" }}>Number + (N-Back-level*Factor)^Exponent</strong>
  </PopoverContent>
);

const thresholdsPopoverContent = (
  <PopoverContent maxWidth="300">
    <p>
      If you completed a set with the rate equal or higher
      to the&nbsp;
      <strong style={{ color: "#00bc8c" }}>Threshold Advance</strong>
      &nbsp;value - then the&nbsp;
      <strong style={{ color: "#00bc8c" }}>N-Back level</strong>
      &nbsp;will be raised automatically for the next set.
    </p>
    <p>
      If you completed a&nbsp;
      <strong style={{ color: "#00bc8c" }}>Fallback count</strong>
      &nbsp;sets with the rate lower than the&nbsp;
      <strong style={{ color: "#00bc8c" }}>Threshold Fallback</strong>
      &nbsp;value - then the&nbsp;
      N-Back level will be lowered automatically for the next set.
    </p>
  </PopoverContent>
);

export const Settings = () => {
  const settingsInitialValues = useStore($settings);
  const [trialTimeMode, setTrialTimeMode] = useState(settingsInitialValues.trialTimeMode);
  const [isNumberOfTrialsPopoverOpen, setNumberOfTrialsPopoverOpen] = useState(false);
  const [isThresholdsPopoverOpen, setThresholdsPopoverOpen] = useState(false);
  return (
    <Form
      onSubmit={save}
      initialValues={settingsInitialValues}
      render={({
        handleSubmit, pristine, invalid, initial, form,
      }) => (
        <form>
          <H3>
            Settings&nbsp;
            <SmallButton
              type="button"
              onClick={resetSettingsAndMode}
            >
              Reset
            </SmallButton>
          </H3>
          <H4>Trial time</H4>
          <FormGroup>
            <Field name="trialTimeMode" type="radio" value="static">
              {({ input, meta }) => (
                <Radio {...input} label="Static" />
              )}
            </Field>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Field name="trialTimeMode" type="radio" value="dynamic">
              {({ input, meta }) => (
                <Radio {...input} label="Dynamic" />
              )}
            </Field>
          </FormGroup>
          <OnChange name="trialTimeMode">
            {(value, previous) => {
              setTrialTimeMode(value);
            }}
          </OnChange>
          <HideBox isHidden={(trialTimeMode !== "static")}>
            <span>Trial time (ms):&nbsp;</span>
            <InputBox width="72px">
              <Field name="trialTimeMs">
                {({ input, meta }) => (
                  <Input {...input} type="number" step="100" />
                )}
              </Field>
            </InputBox>
            <br />
          </HideBox>
          <HideBox isHidden={(trialTimeMode === "static")}>
            <span>Time initial (ms):&nbsp;</span>
            <InputBox width="72px">
              <Field name="timeInitialMs">
                {({ input, meta }) => (
                  <Input {...input} type="number" step="100" />
                )}
              </Field>
            </InputBox>
            <br />
            <span>Increment (ms):&nbsp;</span>
            <InputBox width="72px">
              <Field name="timeIncrementMs">
                {({ input, meta }) => (
                  <Input {...input} type="number" step="100" />
                )}
              </Field>
            </InputBox>
          </HideBox>
          <Hr2 />
          <H4>
            Number of trials&nbsp;
            <Popover
              isOpen={isNumberOfTrialsPopoverOpen}
              position="left"
              content={numberOfTrialsPopoverContent}
            >
              <Icon
                type="question-circle"
                theme="filled"
                style={{ fontSize: '18px' }}
                onMouseEnter={() => setNumberOfTrialsPopoverOpen(true)}
                onMouseLeave={() => setNumberOfTrialsPopoverOpen(false)}
              />
            </Popover>
          </H4>
          <div>number - factor - exponent:</div>
          <InputBox width="52px">
            <Field name="trialsNumber">
              {({ input, meta }) => (
                <Input {...input} type="number" />
              )}
            </Field>
          </InputBox>
          &nbsp;-&nbsp;
          <InputBox width="52px">
            <Field name="trialsFactor">
              {({ input, meta }) => (
                <Input {...input} type="number" />
              )}
            </Field>
          </InputBox>
          &nbsp;-&nbsp;
          <InputBox width="52px">
            <Field name="trialsExponent">
              {({ input, meta }) => (
                <Input {...input} type="number" />
              )}
            </Field>
          </InputBox>
          <Hr2 />
          <H4>
            Thresholds&nbsp;
            <Popover
              isOpen={isThresholdsPopoverOpen}
              position="left"
              content={thresholdsPopoverContent}
            >
              <Icon
                type="question-circle"
                theme="filled"
                style={{ fontSize: '18px' }}
                onMouseEnter={() => setThresholdsPopoverOpen(true)}
                onMouseLeave={() => setThresholdsPopoverOpen(false)}
              />
            </Popover>
          </H4>
          <span>Threshold advance:&nbsp;</span>
          <InputBox width="65px">
            <Field name="thresholdAdvance">
              {({ input, meta }) => (
                <Input {...input} type="number" />
              )}
            </Field>
          </InputBox>
          <span>Threshold fallback:&nbsp;</span>
          <InputBox width="65px">
            <Field name="thresholdFallback">
              {({ input, meta }) => (
                <Input {...input} type="number" />
              )}
            </Field>
          </InputBox>
          <span>Fallback count:&nbsp;</span>
          <InputBox width="65px">
            <Field name="thresholdFallbackCount">
              {({ input, meta }) => (
                <Input {...input} type="number" />
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
          <AutoSave debounce={100} save={save} opacity={0.5} />
        </form>
      )}
    />
  );
};

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const InputBox = styled.div`
  ${p => css`width: ${p.width};`}
  display: inline-block;
`;

const HideBox = styled.div`
  ${p => p.isHidden && "display: none;"}
`;
