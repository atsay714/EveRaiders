import React from "react";
import classNames from "classnames";
import { MdAdd } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import Button from "../Button";
import styles from "./InputArray.module.scss";

const InputArray = ({
  className,
  btnLabel,
  handleRemove,
  handleAdd,
  children = [],
}) => (
  <div className={classNames(styles.inputArray, className)}>
    {children.map((child, i) => (
      <div key={i} className={styles.item}>
        {child}
        <div
          className={classNames(styles.remove, {
            [styles.removeable]: handleRemove,
          })}
          onClick={() => handleRemove(i)}
        >
          <FaTrashAlt />
        </div>
      </div>
    ))}
    <Button className={styles.add} variant={"text"} onClick={handleAdd}>
      <MdAdd /> {btnLabel}
    </Button>
  </div>
);

export default InputArray;
