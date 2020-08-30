import React, { useState, useRef, useContext } from "react";
import classNames from "classnames";
import { FaEllipsisV } from "react-icons/fa";
import useClickAway from "../../../hooks/useClickAway";
import NavItem from "../NavItem";
import { TokenContext } from "../../../contexts";
import styles from "./Settings.module.scss";

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  const [token, setToken] = useContext(TokenContext);

  useClickAway(ref, () => isOpen && setIsOpen(false));
  return (
    <>
      <div
        ref={ref}
        className={styles.settings}
        onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
      >
        <FaEllipsisV size={24} />
      </div>
      <div
        className={classNames(styles.menu, { [styles.isOpen]: isOpen })}
        onClick={() => setIsOpen(false)}
      >
        <div onClick={() => setToken("")}>
          <NavItem label={"Logout"} />
        </div>
      </div>
    </>
  );
};

export default Settings;