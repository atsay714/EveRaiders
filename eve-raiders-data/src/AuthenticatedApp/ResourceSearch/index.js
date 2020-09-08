import React, { useState, useMemo } from "react";
import Table from "components/Table";
import ResourceSearchForm from "./ResourceSearchForm";
import PageHeader from "components/PageHeader";
import SlideDown from "components/SlideDown";
import { getResources } from "../../api";
import * as Yup from "yup";
import styles from "./ResourceSearch.module.scss";

const ResourceSearch = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const getData = (values) => {
    setLoading(true);
    getResources(values)
      .then(({ data }) => {
        setData(data);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => setLoading(false));
  };

  const columns = useMemo(
    () => [
      {
        Header: "Jumps",
        accessor: "distanceFromBase",
        style: {
          textAlign: "right",
        },
      },
      {
        Header: "Planet Name",
        accessor: "planetName",
      },
      {
        Header: "Resource Type",
        accessor: "resourceType",
        Cell: ({ value }) => value.replace(/([A-Z])/g, " $1").trim(),
      },
      {
        Header: "Richness",
        accessor: "richness",
      },
      {
        Header: "Output",
        accessor: "output",
        style: {
          textAlign: "right",
        },
      },
    ],
    []
  );

  return (
    <div className={styles.resourceSearch}>
      <PageHeader>Find Resources</PageHeader>
      <SlideDown>
        <ResourceSearchForm handleSubmit={getData} loading={loading} />
      </SlideDown>
      <div className={styles.results}>
        {error && (
          <div className={styles.error}>
            An error occured. Please try again.
          </div>
        )}
        <Table
          data={data}
          columns={columns}
          placeholder="No data for selected filters"
        />
      </div>
    </div>
  );
};

export default ResourceSearch;
