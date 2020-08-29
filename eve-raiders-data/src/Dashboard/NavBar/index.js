import React, { useState, useRef } from "react";
import classNames from "classnames";
import { GiMining } from "react-icons/gi";
import { IoMdPlanet } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import useClickAway from "../../hooks/useClickAway";
import NavItem from "./NavItem";
import styles from "./NavBar.module.scss";

const navItems = [
  {
    name: "resource-search",
    label: "Resource Search",
    logo: GiMining,
  },
  {
    name: "planet-search",
    label: "Planet Search",
    logo: IoMdPlanet,
  },
  {
    name: "ore-buyback",
    label: "Ore Buyback",
    logo: GiMining,
  },
];

const NavBar = ({ route, setRoute }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

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
            key={item.name}
            selected={route === item.name}
            onClick={() => setRoute(item.name)}
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
            key={item.name}
            selected={route === item.name}
            onClick={() => setRoute(item.name)}
            logo={item.logo}
            label={item.label}
          />
        ))}
      </div>
    </div>
  );
};

export default NavBar;
