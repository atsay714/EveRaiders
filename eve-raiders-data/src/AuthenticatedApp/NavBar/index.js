import React, { useState, useRef } from "react";
import classNames from "classnames";
import { GiMining } from "react-icons/gi";
import { IoMdPlanet } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import useClickAway from "hooks/useClickAway";
import NavItem from "./NavItem";
import Settings from "./Settings";
import useAuth from "context/auth";
import AboutModal from "./AboutModal";
import styles from "./NavBar.module.scss";
import useUser from "context/user";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    path: "/resource-search",
    label: "Resource Search",
    logo: GiMining,
  },
  {
    path: "/planet-search",
    label: "Planet Search",
    logo: IoMdPlanet,
  },
  {
    path: "/ore-buyback",
    label: "Ore Buyback",
    logo: GiMining,
  },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useRef();
  const { logout } = useAuth();

  const user = useUser();

  useClickAway(ref, () => isOpen && setIsOpen(false));

  return (
    <div ref={ref} className={styles.navBar}>
      <NavLink to={"/overview"}>
        <img
          className={styles.logo}
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt="raiders logo"
        />
      </NavLink>
      <div className={styles.navItems}>
        {navItems
          .filter(
            (x) => user?.approved && (user?.superAdmin || !x.requiresSuperAdmin)
          )
          .map((item) => (
            <NavItem key={item.path} {...item} />
          ))}
      </div>

      <div
        className={styles.hamburger}
        onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
      >
        <MdMenu size={24} />
      </div>
      <div
        className={classNames(styles.menu, { [styles.isOpen]: isOpen })}
        onClick={() => setIsOpen(false)}
      >
        {navItems
          .filter(
            (x) => user?.approved && (user?.superAdmin || !x.requiresSuperAdmin)
          )
          .map((item) => (
            <NavItem key={item.path} {...item} />
          ))}
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
      <Settings />
      {isModalOpen && <AboutModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default NavBar;
