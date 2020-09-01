import React, { useState, useMemo } from "react";
import { getFilters } from "../../api";
import { buyback } from "../../api/oreBuyback";
import { useQuery } from "react-query";
import styles from "./OreBuyback.module.scss";
import OreBuybackForm from "./OreBuybackForm";
import OreBuybackTable from "./OreBuybackTable";

const OreBuyback = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    console.log(values);
    setLoading(true);
    const { success, error, data: res } = await buyback(
      values.resources.map(({ resourceName, quantity }) => ({
        id: resourceName.id,
        quantity: +quantity,
      }))
    );
    setLoading(false);
    if (error) return setError(error);
    setData((prevData) => [...prevData, res]);
  };

  const {
    loading: filtersLoading,
    error: filtersError,
    data: filtersTypesData,
  } = useQuery("filters", getFilters);

  if (filtersLoading) return "Loading...";

  if (filtersError) return "An error has occurred: " + filtersError.message;

  return (
    <div className={styles.oreBuyback}>
      <div className={styles.results}>
        {error && (
          <div className={styles.error}>
            An error occured. Please try again.
          </div>
        )}
        <OreBuybackTable data={data} />
      </div>
      <header className={styles.header}>
        <h1 className={styles.title}>Ore Buyback</h1>
        <OreBuybackForm handleSubmit={handleSubmit} />
      </header>
    </div>
  );
};

export default OreBuyback;
