import React from "react";
import { Redirect } from "react-router-dom";
import useCurrentUser from "../context/user";
import styles from "./AwaitingApproval.module.scss";

const AwaitingApproval = () => {
  const user = useCurrentUser();

  // if (user?.approved !== false) {
  //   return <Redirect to="/" />;
  // }

  return (
    <div className={styles.awaitingApproval}>
      <div className={styles.message}>
        <p>Account is currently awaiting approval.</p>
        <p>Please contact one of the following admins in discord</p>
        <ul className={styles.adminList}>
          <li className={styles.adminPrimary}>TBNRregs#6114 (primary)</li>
          <li className={styles.adminSecondary}>
            [RAID] Sicario #6393 (secondary)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AwaitingApproval;
