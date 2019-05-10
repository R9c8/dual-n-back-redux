import React from "react";
import styled from 'styled-components';

import Range from '@atlaskit/range';
import { RadioGroup, Radio } from '@atlaskit/radio';
import { H3, H4, Hr2 } from '../../../ui';

const radioOptions = [
  { name: 'color', value: 'red', label: 'Red' },
  { name: 'color', value: 'blue', label: 'Blue' },
];

export const Settings = () => (
  <>
    <H3>Settings</H3>
    <FormGroup />
    <H4>Trial time</H4>
    <RadioGroup
      options={radioOptions}
    />
    <Hr2 />
    <H4>Number of trials</H4>
    <Hr2 />
    <H4>Thresholds</H4>
    <Hr2 />
    <H4>Feedback</H4>
    <Hr2 />
    <H4>Sound volume: 100%</H4>
    <Range step={1} onChange={e => (console.log('updated range', e))} />
  </>
);

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;
