import React, { useState } from "react";
import classNames from "classnames";
import { FiChevronsDown, FiChevronsUp } from "react-icons/fi";
import styles from "./SlideDown.module.scss";

const SlideDown = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={classNames(styles.slideDown, { [styles.open]: isOpen })}>
      <div className={styles.content}>{children}</div>
      <div className={styles.tab} onClick={() => setIsOpen((x) => !x)}>
        {isOpen ? <FiChevronsUp /> : <FiChevronsDown />}
      </div>
    </div>
  );
};

export default SlideDown;
