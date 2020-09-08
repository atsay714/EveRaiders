import React from "react";
import Routes from "./Routes";
import useUser from "../context/user";
import NavBar from "./NavBar";
import { Redirect } from "react-router-dom";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <NavBar />
      <div className={styles.content}>
        <Routes />
      </div>
    </div>
  );
};

export default Dashboard;
