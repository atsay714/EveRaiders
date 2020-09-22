import React, { useMemo } from "react";
import PageHeader from "components/PageHeader";
import OreBuybackTable from "../../OreBuyback/OreBuybackTable";
import { getOrders, updateStatus } from "api/oreBuyback";
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

  const activeOrders = useMemo(
    () =>
      data
        .filter(({ status }) => status === "Created")
        .sort((a, b) => Date.parse(a.requestedAt) - Date.parse(b.requestedAt)),
    [data]
  );

  const inactiveOrders = useMemo(
    () =>
      data
        .filter((x) => x.pilot && x.total > 0 && x.status !== "Created")
        .sort((a, b) => Date.parse(b.requestedAt) - Date.parse(a.requestedAt)),

    [data]
  );

  return (
    <div className={styles.oreBuybackList}>
      <PageHeader>Ore Buyback Administration</PageHeader>
      <div className={styles.tables}>
        <OreBuybackTable
          className={styles.activeOrders}
          header={"Active Orders"}
          data={activeOrders}
          mutate={mutate}
          adminView
        />
        <OreBuybackTable
          className={styles.activeOrders}
          header={"Inactive Orders"}
          data={inactiveOrders}
          mutate={mutate}
          adminView
        />
      </div>
    </div>
  );
};

export default OreBuybackList;
