import React from "react";
import Routes from "./Routes";
import useUser from "../context/user";
import NavBar from "./NavBar";
import { Redirect } from "react-router-dom";
import styles from "./AuthenticatedApp.module.scss";

const AuthenticatedApp = () => {
  return (
    <div className={styles.authenticatedApp}>
      <NavBar />
      <div className={styles.content}>
        <Routes />
      </div>
    </div>
  );
};

export default AuthenticatedApp;
