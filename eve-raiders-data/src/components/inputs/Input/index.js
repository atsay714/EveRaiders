import React from "react";
import BaseInput from "components/inputs/BaseInput";
import styles from "./Input.module.scss";

const Input = ({ className, label, error, readOnly, ...inputProps }) => (
  <BaseInput
    className={className}
    label={label}
    name={inputProps.name}
    error={error}
    readOnly={readOnly}
  >
    {(ref) => (
      <input
        ref={ref}
        className={styles.input}
        spellCheck="false"
        readOnly={readOnly}
        {...inputProps}
      />
    )}
  </BaseInput>
);

export default Input;
