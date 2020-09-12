import React, { useState } from "react";
import classNames from "classnames";
import styles from "./Sidebar.module.scss";
import { HiOutlineCurrencyDollar } from "react-icons/hi";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState();
  return (
    <div className={styles.sidebar}>
      <div
        className={classNames(styles.sideBtn, { [styles.active]: isOpen })}
        onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
      >
        <HiOutlineCurrencyDollar className={styles.icon} size={25} />
      </div>
      <div className={classNames(styles.menu, { [styles.open]: isOpen })}>
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
