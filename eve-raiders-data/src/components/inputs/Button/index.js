import React from "react";
import classNames from "classnames";
import styles from "./Button.module.scss";

const Button = ({ className, type = "button", children, ...props }) => (
  <button
    className={classNames(className, styles.button)}
    type={type}
    {...props}
  >
    {children}
  </button>
);

export default Button;
