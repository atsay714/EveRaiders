import React, { useState, useRef, useContext } from "react";
import AboutModal from "../AboutModal";
import classNames from "classnames";
import { FaEllipsisV } from "react-icons/fa";
import useClickAway from "../../../hooks/useClickAway";
import NavItem from "../NavItem";
import useAuth from "../../../context/auth";
import useCurrentUser from "../../../context/user";
import styles from "./Settings.module.scss";
import { useHistory } from "react-router-dom";

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useRef();

  const user = useCurrentUser();
  const { logout } = useAuth();

  const history = useHistory();

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
          <>
            <NavItem label={"User Admin"} path={"/admin/users"} />
            <NavItem label={"Ore Buyback Admin"} path={"/admin/ore-buyback"} />
            <NavItem label={"Prices"} path={"/admin/prices"} />
          </>
        )}
        <div onClick={() => setIsModalOpen(true)}>
          <NavItem label={"About"} />
        </div>
        <div>
          <NavItem label={"User Profile"} path={"/user-profile"} />
        </div>
        <div
          onClick={() => {
            logout();
          }}
        >
          <NavItem label={"Logout"} />
        </div>
      </div>
      {isModalOpen && <AboutModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Settings;
