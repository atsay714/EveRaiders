import React, { useMemo } from "react";
import Table from "../../../components/Table";

const OreBuybackTable = ({ data = [] }) => {
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
        Header: "User",
        accessor: "user",
        style: {
          textAlign: "left",
        },
        Cell: ({ value }) => "Hans Anmaicok",
      },
      {
        Header: "Total ISK",
        accessor: "resources",
        style: {
          textAlign: "right",
        },
        Cell: ({ value }) => {
          return "placeholder";
          //   const total = value.reduce((total, { resourceType, count = 0 }) => {
          //     total += prices[resourceType] * count;
          //     return total;
          //   }, 0);
          //   return (
          //     <div>
          //       {total.toLocaleString({ style: "currency" })}
          //       <span className={styles.currency}>ISK</span>
          //     </div>
          //   );
        },
      },
      {
        Header: "Status",
        accessor: "status",
        style: {
          textAlign: "left",
        },
        Cell: ({ value }) => "Pending",
      },
    ],
    []
  );
  return (
    <Table
      data={data}
      columns={columns}
      placeholder="No data for selected filters"
    />
  );
};

export default OreBuybackTable;
