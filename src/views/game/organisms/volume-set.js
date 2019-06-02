import React from "react";

import { useStore } from 'effector-react';

import { Form, Field } from "react-final-form";

import { $volume, setVolume } from '../../../core/game/index';

import AutoSave from "../../../lib/auto-save";

import { Volume } from "../molecules/volume";


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const save = async (values) => {
  setVolume(values);
  await sleep(2000);
};

export const VolumeSet = () => {
  const volumeInitial = useStore($volume);
  return (
    <Form
      onSubmit={save}
      initialValues={{ volume: volumeInitial }}
      render={({
        handleSubmit, pristine, invalid, initial,
      }) => (
        <form>
          <Field name="volume">
            {({ input, meta }) => (
              <Volume {...input} defaultValue={volumeInitial} />
            )}
          </Field>
          <AutoSave debounce={500} save={save} opacity={0.5} />
        </form>
      )}
    />
  );
};
