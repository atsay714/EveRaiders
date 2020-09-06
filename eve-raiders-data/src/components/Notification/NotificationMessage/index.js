import React from "react";
import classNames from "classnames";
import styles from "./NotificationMessage.module.scss";

const NotificationMessage = ({ className, type = "error", children }) => (
  <p
    className={classNames(styles.notificationMessage, styles[type], className)}
  >
    {children}
  </p>
);

export default NotificationMessage;
