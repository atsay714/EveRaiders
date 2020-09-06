import React from "react";
import classNames from "classnames";
import styles from "./Notification.module.scss";
import NotificationIcon from "./NotificationIcon";
import NotificationMessage from "./NotificationMessage";

const Notification = ({ className, type = "error", children }) => (
  <div className={classNames(styles.notification, className)}>
    <NotificationIcon type={type} />
    <NotificationMessage type={type}>{children}</NotificationMessage>
  </div>
);

export default Notification;
