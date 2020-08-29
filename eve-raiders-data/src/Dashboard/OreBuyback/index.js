import React, { useState, useMemo } from "react";
import FormRenderer from "../../components/FormRenderer";
import { getFilters, getResources } from "../../api";
import { useQuery } from "react-query";
import * as Yup from "yup";
import Table from "../../components/Table";
import styles from "./OreBuyback.module.scss";

const orePrices = {
  Veldspar: 11.0,
  Scodrite: 17.5,
  Pyroxeres: 385.0,
  Plagioclase: 38.5,
  Omber: 113.5,
  Kernite: 228.5,
  Jaspet: 1956.5,
  Hemorphite: 1295.0,
  Hedbergite: 1311.0,
  Spodumain: 1099.0,
  DarkOrche: 405.5,
  Gneiss: 713.0,
  Crokite: 3000.0,
  Bistot: 3698.5,
  Arkonor: 3633.5,
  Mercoxit: 5404.5,
};

const prices = {
  "Lustering Alloy": 167.0,
  "Sheen Compound": 23776.5,
  "Gleaming Alloy": 582.5,
  "Condensed Alloy": 11573.5,
  "Precious Alloy": 12094.0,
};

const OreBuybackSchema = Yup.object().shape({
  resourceType: Yup.string().required("Resource Type is required"),
  richness: Yup.string().required("Richness is required"),
});

const OreBuyback = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  // const getData = (values) => {
  //   setLoading(true);
  //   getResources(values)
  //     .then(({ data }) => {
  //       setData(data);
  //     })
  //     .catch((e) => {
  //       setError(e);
  //     })
  //     .finally(() => setLoading(false));
  // };

  const {
    loading: filtersLoading,
    error: filtersError,
    data: filtersTypesData,
  } = useQuery("filters", getFilters);

  const { regions = [], richness = [], types = [] } = useMemo(
    () => (filtersTypesData ? filtersTypesData.data : []),
    [filtersTypesData]
  );

  const resourceTypeOptions = useMemo(
    () => types.map((type) => type.replace(/([A-Z])/g, " $1").trim()),
    [types]
  );

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
          const total = value.reduce((total, { resourceType, count = 0 }) => {
            total += prices[resourceType] * count;
            return total;
          }, 0);
          return (
            <div>
              {total.toLocaleString({ style: "currency" })}
              <span className={styles.currency}>ISK</span>
            </div>
          );
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

  if (filtersLoading) return "Loading...";

  if (filtersError) return "An error has occurred: " + filtersError.message;

  const formConfig = {
    // validation: OreBuybackSchema,
    className: styles.oreBuybackForm,
    fieldsClassName: styles.fields,
    btnClassName: styles.submitBtn,
    fields: [
      {
        name: "resources",
        type: "fieldarray",
        className: styles.fieldArray,
        initialValue: [
          {
            resourceType: "",
            count: 0,
          },
        ],
        Label: ({ value: { resourceType, count = 0 } = {} }) => {
          const price = (
            <span className={styles.price}>x {prices[resourceType] || 0}</span>
          );

          const total = (
            <span className={styles.total}>
              {((prices[resourceType] || 0) * count).toLocaleString({
                style: "currency",
              })}
              <span className={styles.currency}>ISK</span>
            </span>
          );

          return (
            <div className={styles.label}>
              {price}
              <span className={styles.equals}>=</span>
              {total}
            </div>
          );
        },
        fields: [
          {
            name: "resourceType",
            label: "Resource Type",
            placeholder: "resource type",
            type: "combobox",
            items: resourceTypeOptions,
            className: styles.field,
            initialValue: "",
          },
          {
            name: "count",
            label: "Count",
            placeholder: "count",
            type: "number",
            className: styles.countField,
            initialValue: 0,
          },
        ],
      },
    ],
  };

  return (
    <div className={styles.oreBuyback}>
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
      <header className={styles.header}>
        <h1 className={styles.title}>Ore Buyback</h1>
        <FormRenderer
          config={formConfig}
          onSubmit={(values) => {
            setData([values]);
          }}
          loading={loading}
        >
          {(values) => {
            const total = values.resources.reduce(
              (total, { resourceType, count = 0 } = {}) => {
                total += (prices[resourceType] || 0) * count;
                return total;
              },
              0
            );
            return (
              <div className={styles.grandTotal}>
                Total ={" "}
                {total.toLocaleString({
                  style: "currency",
                })}
                <span className={styles.currency}>ISK</span>
              </div>
            );
          }}
        </FormRenderer>
      </header>
    </div>
  );
};

export default OreBuyback;
