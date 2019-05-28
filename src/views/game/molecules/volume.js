import 'rc-slider/assets/index.css';

import React, { useState } from "react";
import PropTypes from "prop-types";

import Slider from 'rc-slider';

import { H4 } from '../../../ui';

export const Volume = ({
  defaultValue, onChange, value, onAfterChange,
}) => (
  <div>
    <H4>
      Sound volume:&nbsp;
      {value}
      %
    </H4>
    <Slider
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      onAfterChange={onAfterChange}
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
  </div>
);

Volume.propTypes = {
  defaultValue: PropTypes.number,
  value: PropTypes.number,
  onChange: PropTypes.func,
  onAfterChange: PropTypes.func,
};

Volume.defaultProps = {
  defaultValue: 0,
  value: 0,
  onChange: undefined,
  onAfterChange: undefined,
};
