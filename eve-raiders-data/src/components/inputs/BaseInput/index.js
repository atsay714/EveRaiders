import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import { MdErrorOutline } from "react-icons/md";
import styles from "./BaseInput.module.scss";

const BaseInput = React.forwardRef(
  (
    { className, label, name, active, error, readOnly, children, ...props },
    ref
  ) => {
    const [hasFocus, setHasFocus] = useState(false);
    const childRef = useRef();

    useEffect(() => {
      if (childRef.current) {
        childRef.current.addEventListener("focus", () => {
          setHasFocus(true);
        });
        childRef.current.addEventListener("blur", () => {
          setHasFocus(false);
        });
      }
      return setHasFocus;
    }, []);

    return (
      <div className={classNames(className, styles.inputWrapper)}>
        <div
          ref={ref}
          className={classNames(styles.inputContainer, {
            [styles.active]: hasFocus || active,
            [styles.hasError]: error,
            [styles.readOnly]: readOnly,
          })}
          {...props}
        >
          {label && (
            <label className={styles.label} htmlFor={name}>
              {label}
            </label>
          )}
          {children(childRef)}
        </div>
        {error && (
          <div className={styles.errorMsg}>
            <MdErrorOutline className={styles.logo} /> {error}
          </div>
        )}
      </div>
    );
  }
);

export default BaseInput;
