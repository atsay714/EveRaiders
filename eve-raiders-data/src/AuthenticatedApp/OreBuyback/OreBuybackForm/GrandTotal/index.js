import React from "react";
import classNames from "classnames";
import { useQuery } from "react-query";
import { getResources } from "../../../../api/resources";
import styles from "./GrandTotal.module.scss";

const GrandTotal = ({ className, values }) => {
  const getPrice = (resource, resourcesData) =>
    resourcesData.find(({ name }) => name === resource?.name)?.price || 0;

  const {
    loading: resourcesLoading,
    error: resourcesError,
    data: resourcesData = [],
  } = useQuery("resources", getResources);

  const total = values.resources.reduce(
    (total, { resource, quantity = 0 } = {}) => {
      total += getPrice(resource, resourcesData) * quantity;
      return total;
    },
    0
  );

  return (
    <div className={classNames(styles.grandTotal, className)}>
      Total ={" "}
      {total.toLocaleString({
        style: "currency",
      })}
      <span className={styles.currency}>ISK</span>
    </div>
  );
};

export default GrandTotal;
