import React from "react";
import styles from "./RowPrice.module.scss";

const RowPrice = ({ value: { resource, quantity = 0 } = {} }) => (
  <div className={styles.rowPrice}>
    <span className={styles.price}>
      x{" "}
      {(resource?.price || 0).toLocaleString("en", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </span>
    <span className={styles.equals}>=</span>
    <span className={styles.total}>
      {((resource?.price || 0) * quantity).toLocaleString("en", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
      <span className={styles.currency}>ISK</span>
    </span>
  </div>
);

export default RowPrice;
