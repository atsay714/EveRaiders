import React, { useMemo, useContext, useRef } from "react";
import { UserContext } from "../../../contexts";
import Select from "../../../components/inputs/Select";
import Table from "../../../components/Table";
import styles from "./OreBuybackTable.module.scss";

const OreBuybackTable = ({ data = [], mutate, adminView }) => {
  const user = useContext(UserContext);
  const scrollRef = useRef();

  const columns = useMemo(
    () => [
      {
        Header: "Requested At",
        accessor: "requestedAt",
      },
      {
        Header: "Pilot Name",
        accessor: "pilot",
      },

      {
        Header: "Total ISK",
        accessor: "total",
        style: {
          textAlign: "right",
        },
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({
          value,
          row: {
            original: { id },
          },
        }) => {
          const items = ["Created", "Approved", "Denied", "Paid", "Closed"];
          return adminView && user?.superAdmin ? (
            <Select
              className={styles.statusSelect}
              items={items}
              value={value}
              onChange={(status) => mutate({ buyBackRequestId: id, status })}
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
      placeholder="No buyback contracts available"
      scrollRef={scrollRef}
    />
  );
};

export default OreBuybackTable;
