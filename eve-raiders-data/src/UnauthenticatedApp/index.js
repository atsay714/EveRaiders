import React from "react";
import Routes from "./Routes";
import styles from "./UnauthenticatedApp.module.scss";

const UnauthenticatedApp = () => {
  return (
    <div className={styles.unauthenticatedApp}>
      <div className={styles.content}>
        <Routes />
      </div>
    </div>
  );
};

export default UnauthenticatedApp;
