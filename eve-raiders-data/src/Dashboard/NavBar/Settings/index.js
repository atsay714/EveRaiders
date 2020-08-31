import React, { useState, useRef, useContext } from "react";
import classNames from "classnames";
import { FaEllipsisV } from "react-icons/fa";
import useClickAway from "../../../hooks/useClickAway";
import NavItem from "../NavItem";
import { TokenContext, UserContext } from "../../../contexts";
import styles from "./Settings.module.scss";

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  const user = useContext(UserContext);
  const [token, setToken] = useContext(TokenContext);

  useClickAway(ref, () => isOpen && setIsOpen(false));
  return (
    <>
      <div
        ref={ref}
        className={styles.settings}
        onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
      >
        <FaEllipsisV size={16} />
      </div>
      <div
        className={classNames(styles.menu, { [styles.isOpen]: isOpen })}
        onClick={() => setIsOpen(false)}
      >
        {user?.superAdmin && (
          <NavItem label={"User Admin"} path={"/dashboard/admin/users"} />
        )}
        <div onClick={() => setToken()}>
          <NavItem label={"Logout"} />
        </div>
      </div>
    </>
  );
};

export default Settings;
