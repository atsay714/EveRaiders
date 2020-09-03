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
        style: {
          textAlign: "left",
        },
      },
      ...(adminView
        ? [
            {
              Header: "Pilot Name",
              accessor: "pilot",
              style: {
                textAlign: "left",
              },
            },
          ]
        : []),
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
        style: {
          textAlign: "left",
        },
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
      placeholder="No data for selected filters"
      scrollRef={scrollRef}
    />
  );
};

export default OreBuybackTable;
