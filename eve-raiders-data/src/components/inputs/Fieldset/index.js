import React from "react";
import classNames from "classnames";
import styles from "./Fieldset.module.scss";

const Input = ({ className, label, children }) => (
  <fieldset className={classNames(styles.fieldset, className)}>
    <legend>{label}</legend>
    {children}
  </fieldset>
);

export default Input;
