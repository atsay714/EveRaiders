import React from "react";
import styles from "./RowPrice.module.scss";

const RowPrice = ({ value: { resource, quantity = 0 } = {} }) => (
  <div className={styles.rowPrice}>
    <span className={styles.price}>x {resource?.price || 0}</span>
    <span className={styles.equals}>=</span>
    <span className={styles.total}>
      {((resource?.price || 0) * quantity).toLocaleString({
        style: "currency",
      })}
      <span className={styles.currency}>ISK</span>
    </span>
  </div>
);

export default RowPrice;
