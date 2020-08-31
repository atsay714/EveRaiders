import React from "react";
import { useQuery } from "react-query";
import { getResources } from "../../../../api/resources";
import styles from "./GrandTotal.module.scss";

const GrandTotal = ({ values }) => {
  const getPrice = (resourceType, resourcesData) =>
    resourcesData.find(({ name }) => name === resourceType)?.price || 0;

  const {
    loading: resourcesLoading,
    error: resourcesError,
    data: resourcesData,
  } = useQuery("resources", getResources);

  const total = values.resources.reduce(
    (total, { resourceType, count = 0 } = {}) => {
      total += getPrice(resourceType, resourcesData) * count;
      return total;
    },
    0
  );
  return (
    <div className={styles.grandTotal}>
      Total ={" "}
      {total.toLocaleString({
        style: "currency",
      })}
      <span className={styles.currency}>ISK</span>
    </div>
  );
};

export default GrandTotal;
