import React from "react";
import styles from "./PageHeader.module.scss";

const PageHeader = ({ children }) => (
  <h1 className={styles.pageHeader}>{children}</h1>
);

export default PageHeader;
