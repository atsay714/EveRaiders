import React, { useMemo } from "react";
import { GiStopSign } from "react-icons/gi";
import Modal from "../../../../components/Modal";
import GrandTotal from "../GrandTotal";
import Table from "../../../../components/Table";
import styles from "./ConfirmOreBuybackModal.module.scss";

const ConfirmOreBuybackModal = ({ onSubmit, onClose, values }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Resource",
        accessor: "resourceName.name",
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
    <Modal
      onClose={onClose}
      onSubmit={onSubmit}
      closeLabel={"Go back"}
      submitLabel={"I have created a contract"}
    >
      <header className={styles.header}>
        <GiStopSign className={styles.stopIcon} size={60} />
        <h3>Have you created a contract yet?</h3>
      </header>
      <p>
        Before continuing, make a contract for buyback in N-DQ to: Daniel Finch
      </p>
      <div className={styles.table}>
        <Table data={values.resources} columns={columns} />
      </div>
      <GrandTotal className={styles.grandTotal} values={values} />
    </Modal>
  );
};

export default ConfirmOreBuybackModal;
