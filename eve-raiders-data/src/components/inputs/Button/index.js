import React from "react";
import classNames from "classnames";
import RingLoader from "@bit/davidhu2000.react-spinners.ring-loader";
import styles from "./Button.module.scss";

const Button = ({
  className,
  type = "button",
  loading,
  children = "Submit",
  ...props
}) => (
  <button
    className={classNames(className, styles.button)}
    type={type}
    {...props}
  >
    <span style={{ visibility: loading ? "hidden" : "visible" }}>
      {children}
    </span>
    {loading && (
      <div
        className={styles.loader}
        style={{
          position: "absolute",
          top: 10,
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
