import React from "react";
import { useQuery } from "react-query";
import { getResources } from "../../../../../api/resources";
import styles from "./RowPrice.module.scss";

const RowPrice = ({ value: { resourceName, quantity = 0 } = {} }) => {
  return (
    <div className={styles.rowPrice}>
      <span className={styles.price}>x {resourceName?.price || 0}</span>
      <span className={styles.equals}>=</span>
      <span className={styles.total}>
        {((resourceName?.price || 0) * quantity).toLocaleString({
          style: "currency",
        })}
        <span className={styles.currency}>ISK</span>
      </span>
    </div>
  );
};

export default RowPrice;
