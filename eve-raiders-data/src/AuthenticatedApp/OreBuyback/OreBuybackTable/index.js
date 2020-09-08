import React, { useState, useMemo, useContext, useRef, useEffect } from "react";
import useCurrentUser from "context/user";
import Select from "components/inputs/Select";
import Table from "components/Table";
import BuybackModal from "./BuybackModal";
import styles from "./OreBuybackTable.module.scss";
import { queryCache } from "react-query";
import { getResources } from "api/resources";

const OreBuybackTable = ({ data = [], mutate, adminView }) => {
  useEffect(() => {
    queryCache.prefetchQuery("resources", getResources);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(false);

  const user = useCurrentUser();
  const scrollRef = useRef();

  const onClick = (data) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Requested At",
        accessor: "requestedAt",
        onClick,
      },
      {
        Header: "Pilot Name",
        accessor: "pilot",
        onClick,
      },

      {
        Header: "Total ISK",
        accessor: "total",
        style: {
          textAlign: "right",
        },
        Cell: ({ value }) =>
          value.toLocaleString({
            style: "currency",
          }),
        onClick,
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
        onClick: !adminView && onClick,
      },
    ],
    [user, scrollRef]
  );

  return (
    <>
      <Table
        data={data}
        columns={columns}
        placeholder="No buyback contracts available"
        scrollRef={scrollRef}
      />
      {isModalOpen && (
        <BuybackModal data={modalData} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default OreBuybackTable;
