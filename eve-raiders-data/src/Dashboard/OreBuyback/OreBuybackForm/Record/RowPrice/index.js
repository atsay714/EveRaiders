import React from "react";
import { useQuery } from "react-query";
import { getResources } from "../../../../../api/resources";
import styles from "./RowPrice.module.scss";

const RowPrice = ({ value: { resourceName, quantity = 0 } = {} }) => {
  const {
    loading: resourcesLoading,
    error: resourcesError,
    data: resourcesData,
  } = useQuery("resources", getResources);

  const getPrice = (resourceName, resourcesData = []) =>
    resourcesData.find(({ name }) => name === resourceName)?.price || 0;

  return (
    <div className={styles.rowPrice}>
      <span className={styles.price}>
        x {getPrice(resourceName, resourcesData)}
      </span>
      <span className={styles.equals}>=</span>
      <span className={styles.total}>
        {(getPrice(resourceName, resourcesData) * quantity).toLocaleString({
          style: "currency",
        })}
        <span className={styles.currency}>ISK</span>
      </span>
    </div>
  );
};

export default RowPrice;
