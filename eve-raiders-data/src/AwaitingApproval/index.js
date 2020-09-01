import React from "react";
import styles from "./AwaitingApproval.module.scss";

const AwaitingApproval = () => (
  <div className={styles.awaitingApproval}>
    <p>Account is currently awaiting approval.</p>
    <p>Please contact one of the following admins in discord</p>
    <ul className={styles.adminList}>
      <li className={styles.adminPrimary}>TBNRregs#6114 (primary)</li>
      <li className={styles.adminSecondary}>
        [RAID] Sicario #6393 (secondary)
      </li>
    </ul>
  </div>
);

export default AwaitingApproval;
