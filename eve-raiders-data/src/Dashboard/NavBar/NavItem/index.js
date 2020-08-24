import React from "react";
import classNames from "classnames";
import styles from "./NavItem.module.scss";

const NavItem = ({ selected, onClick, logo: Logo, label }) => (
  <div
    className={classNames(styles.navItem, { [styles.active]: selected })}
    onClick={() => onClick()}
  >
    <div className={styles.logo}>
      <Logo />
    </div>
    <div className={styles.label}>{label}</div>
  </div>
);

export default NavItem;
