import React from "react";
import Routes from "./Routes";
import NavBar from "./NavBar";
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
