import React, { Fragment } from "react";
import InputRange from "react-input-range";
import './styles.scss'

const CustomInputRange = ({ maxValue = 10, minValue = 20, value=15, onChange, formatLabel = null, disabled = false, maxLabel = null }) => {
  return (
    <Fragment>
      <InputRange
        maxValue={maxValue}
        minValue={minValue}
        value={value}
        onChange={onChange}
        formatLabel={formatLabel}
        disabled={disabled}
        maxLabel="label"

      />
    </Fragment>
  );
};


export default CustomInputRange;
