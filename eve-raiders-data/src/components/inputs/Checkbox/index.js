import React from "react";
import classNames from "classnames";
import styles from "./Checkbox.module.scss";

const Checkbox = ({ className, label, error, ...inputProps }) => (
  <input
    type={"checkbox"}
    className={classNames(styles.checkbox, className)}
    {...inputProps}
  />
);

export default Checkbox;
