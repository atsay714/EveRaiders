import React, { useMemo } from "react";
import Modal from "components/Modal";
import Table from "components/Table";
import GrandTotal from "../../OreBuybackForm/GrandTotal";
import styles from "./BuybackModal.module.scss";

const BuybackModal = ({ onClose, data = [] }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Resource",
        accessor: "name",
      },
      {
        Header: "Quantity",
        accessor: "quantity",
        style: {
          textAlign: "right",
        },
      },
    ],
    []
  );

  return (
    <Modal onClose={onClose} hideSubmit>
      <p>{data.pilot}</p>
      <div className={styles.table}>
        <Table data={data.resources} columns={columns} />
      </div>
      <div className={styles.grandTotal}>
        Total = {data.total.toLocaleString({ style: "currency" })} ISK
      </div>
    </Modal>
  );
};

export default BuybackModal;
