import React from "react";
import { GiMining } from "react-icons/gi";
import { IoMdPlanet } from "react-icons/io";
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
];

const NavBar = ({ route, setRoute }) => (
  <div className={styles.navBar}>
    <img
      className={styles.logo}
      src={`${process.env.PUBLIC_URL}/logo.png`}
      alt="raiders logo"
    />
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
);

export default NavBar;
