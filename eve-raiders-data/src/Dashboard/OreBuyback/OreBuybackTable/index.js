import React, { useMemo, useContext, useRef } from "react";
import { UserContext } from "../../../contexts";
import Select from "../../../components/inputs/Select";
import Table from "../../../components/Table";
import styles from "./OreBuybackTable.module.scss";

const OreBuybackTable = ({ data = [] }) => {
  const user = useContext(UserContext);
  const scrollRef = useRef();

  const columns = useMemo(
    () => [
      {
        Header: "Timestamp",
        accessor: "timestamp",
        style: {
          textAlign: "left",
        },
        Cell: ({ value }) => <div>{new Date().toDateString()}</div>,
      },
      {
        Header: "Total ISK",
        accessor: "total",
        style: {
          textAlign: "right",
        },
        // Cell: ({ value }) => {
        //   return "placeholder";
        //   //   const total = value.reduce((total, { resourceName, count = 0 }) => {
        //   //     total += prices[resourceName] * count;
        //   //     return total;
        //   //   }, 0);
        //   //   return (
        //   //     <div>
        //   //       {total.toLocaleString({ style: "currency" })}
        //   //       <span className={styles.currency}>ISK</span>
        //   //     </div>
        //   //   );
        // },
      },
      {
        Header: "Status",
        accessor: "status",
        style: {
          textAlign: "left",
        },
        Cell: ({ value }) => {
          const items = ["Created", "Accepted", "Rejected", "On Hold"];

          return user?.superAdmin ? (
            <Select
              className={styles.statusSelect}
              items={items}
              value={value}
              onChange={() => console.log("update status placeholder")}
              scrollRef={scrollRef}
            />
          ) : (
            <div>{value}</div>
          );
        },
      },
    ],
    [user, scrollRef]
  );

  return (
    <Table
      data={data}
      columns={columns}
      placeholder="No data for selected filters"
      scrollRef={scrollRef}
    />
  );
};

export default OreBuybackTable;
