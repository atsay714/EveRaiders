import React from "react";
import classNames from "classnames";
import RingLoader from "react-spinners/RingLoader";
import styles from "./Button.module.scss";

const Button = ({
  className,
  type = "button",
  loading,
  variant = "contained",
  children = "Submit",
  disabled,
  ...props
}) => (
  <button
    className={classNames(className, styles.button, {
      [styles[variant]]: variant !== "contained",
    })}
    type={type}
    disabled={loading || disabled}
    {...props}
  >
    <span
      style={{
        visibility: loading ? "hidden" : "visible",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </span>
    {loading && (
      <div
        className={styles.loader}
        style={{
          position: "absolute",
          top: "calc(50% - 10px)",
          left: "calc(50% - 10px)",
        }}
      >
        <RingLoader
          size={20}
          color={getComputedStyle(document.documentElement).getPropertyValue(
            "--color-text-white"
          )}
        />
      </div>
    )}
  </button>
);

export default Button;
