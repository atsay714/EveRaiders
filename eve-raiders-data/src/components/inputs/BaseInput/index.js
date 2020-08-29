import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import { MdErrorOutline } from "react-icons/md";
import styles from "./BaseInput.module.scss";

const BaseInput = React.forwardRef(
  ({ className, label, name, active, error, children, ...props }, ref) => {
    const [hasFocus, setHasFocus] = useState(false);
    const childRef = useRef();

    useEffect(() => {
      // if (childRef.current) {
      //   childRef.current.addEventListener("focus", () => {
      //     setHasFocus(true);
      //   });
      //   childRef.current.addEventListener("blur", () => {
      //     setHasFocus(false);
      //   });
      // }
      // return setHasFocus;
    }, []);

    return (
      <div
        ref={ref}
        className={classNames(className, styles.inputWrapper, {
          // [styles.active]: hasFocus || active,
          // [styles.hasError]: error,
        })}
        onClick={() => {
          //childRef.current.focus();
        }}
        {...props}
      >
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
        {children(childRef)}
        {error && (
          <div className={styles.errorMsg}>
            <MdErrorOutline /> {error}
          </div>
        )}
      </div>
    );
  }
);

export default BaseInput;
