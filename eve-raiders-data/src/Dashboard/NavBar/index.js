import React, { useState, useRef, useContext } from "react";
import classNames from "classnames";
import { GiMining } from "react-icons/gi";
import { IoMdPlanet } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import useClickAway from "../../hooks/useClickAway";
import NavItem from "./NavItem";
import Settings from "./Settings";
import { TokenContext } from "../../contexts";
import styles from "./NavBar.module.scss";

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
  // {
  //   path: "/ore-buyback",
  //   label: "Ore Buyback",
  //   logo: GiMining,
  // },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  const [token, setToken] = useContext(TokenContext);

  useClickAway(ref, () => isOpen && setIsOpen(false));

  return (
    <div ref={ref} className={styles.navBar}>
      <img
        className={styles.logo}
        src={`${process.env.PUBLIC_URL}/logo.png`}
        alt="raiders logo"
      />
      <div className={styles.navItems}>
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            path={item.path}
            logo={item.logo}
            label={item.label}
          />
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
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            path={item.path}
            logo={item.logo}
            label={item.label}
          />
        ))}
        <div onClick={() => setToken("")}>
          <NavItem label={"Logout"} />
        </div>
      </div>
      <Settings />
    </div>
  );
};

export default NavBar;
