import React from "react";
import OreBuybackTable from "../../OreBuyback/OreBuybackTable";
import { getOrders, updateStatus } from "../../../api/oreBuyback";
import { useQuery, useMutation, queryCache } from "react-query";
import styles from "./OreBuybackList.module.scss";

const OreBuybackList = () => {
  const { loading, error, data = [] } = useQuery("orders", getOrders);

  const [mutate] = useMutation(updateStatus, {
    onMutate: ({ buyBackRequestId, status }) => {
      const previousOrders = queryCache.getQueryData("orders");

      queryCache.setQueryData("orders", (orders) => {
        const orderToUpdate = orders.find(
          (order) => order.id === buyBackRequestId
        );

        return orders.map((order) =>
          order.id === buyBackRequestId ? { ...orderToUpdate, status } : order
        );
      });

      return previousOrders;
    },
  });

  return (
    <div className={styles.users}>
      <header className={styles.header}>
        <h1 className={styles.title}>Ore Buyback Administration</h1>
      </header>
      <OreBuybackTable data={data} mutate={mutate} adminView />
    </div>
  );
};

export default OreBuybackList;