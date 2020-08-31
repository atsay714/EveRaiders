import React from "react";
import classNames from "classnames";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./NavItem.module.scss";

const NavItem = ({ path, logo: Logo, label }) => {
  const history = useHistory();
  const location = useLocation();

  return (
    <div
      to={path}
      className={classNames(styles.navItem, {
        [styles.active]: location.pathname === path,
      })}
      onClick={() => history.push(path)}
    >
      {Logo && (
        <div className={styles.logo}>
          <Logo />
        </div>
      )}
      <div className={styles.label}>{label}</div>
    </div>
  );
};

export default NavItem;
