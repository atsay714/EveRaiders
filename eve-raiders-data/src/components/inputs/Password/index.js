import React, { useState } from "react";
import BaseInput from "../BaseInput";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import styles from "./Password.module.scss";

const Password = ({ className, label, error, ...inputProps }) => {
  const [show, setShow] = useState(false);

  return (
    <BaseInput
      className={className}
      label={label}
      name={inputProps.name}
      error={error}
    >
      {(ref) => (
        <>
          <input
            ref={ref}
            className={styles.input}
            spellCheck="false"
            type={show ? "text" : "password"}
            {...inputProps}
          />
          <div
            className={styles.showToggle}
            onClick={() => setShow((prevShow) => !prevShow)}
          >
            {show ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
          </div>
        </>
      )}
    </BaseInput>
  );
};

export default Password;
