import React from "react";
import PageHeader from "components/PageHeader";
import ResourcePrices from "./ResourcePrices";
import Taxes from "./Taxes";
import styles from "./Prices.module.scss";

const Prices = () => {
  return (
    <div className={styles.prices}>
      <PageHeader>Prices</PageHeader>
      <div className={styles.forms}>
        <Taxes />
        <ResourcePrices />
      </div>
    </div>
  );
};

export default Prices;
