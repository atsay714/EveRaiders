import React from "react";
import BaseInput from "../BaseInput";
import styles from "./Input.module.scss";

const Input = ({ className, label, onChange, error, ...inputProps }) => (
  <BaseInput
    className={className}
    label={label}
    name={inputProps.name}
    error={error}
  >
    {(ref) => (
      <input
        ref={ref}
        className={styles.input}
        onChange={(e) => onChange(e.currentTarget.value)}
        spellCheck="false"
        {...inputProps}
      />
    )}
  </BaseInput>
);

export default Input;
