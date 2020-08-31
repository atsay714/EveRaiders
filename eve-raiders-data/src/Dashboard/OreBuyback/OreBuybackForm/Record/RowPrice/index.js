import React from "react";
import { useQuery } from "react-query";
import { getResources } from "../../../../../api/resources";
import styles from "./RowPrice.module.scss";

const RowPrice = ({ value: { resourceType, count = 0 } = {} }) => {
  const {
    loading: resourcesLoading,
    error: resourcesError,
    data: resourcesData,
  } = useQuery("resources", getResources);

  const getPrice = (resourceType, resourcesData = []) =>
    resourcesData.find(({ name }) => name === resourceType)?.price || 0;

  return (
    <div className={styles.rowPrice}>
      <span className={styles.price}>
        x {getPrice(resourceType, resourcesData)}
      </span>
      <span className={styles.equals}>=</span>
      <span className={styles.total}>
        {(getPrice(resourceType, resourcesData) * count).toLocaleString({
          style: "currency",
        })}
        <span className={styles.currency}>ISK</span>
      </span>
    </div>
  );
};

export default RowPrice;
