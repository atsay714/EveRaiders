import React, { useState, useMemo } from "react";
import Table from "../../components/Table";
import FormRenderer from "../../components/FormRenderer";
import { getFilters, getPlanets } from "../../api";
import { useQuery } from "react-query";
import * as Yup from "yup";
import styles from "./PlanetSearch.module.scss";

const PlanetSearchSchema = Yup.object().shape({
  region: Yup.string(),
  constellation: Yup.string(),
  system: Yup.string(),
  planetName: Yup.string(),
  planetType: Yup.string(),
});

const PlanetSearch = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const getData = (values) => {
    setLoading(true);
    getPlanets(values)
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
        Header: "Constellation",
        accessor: "constellation",
        style: {
          textAlign: "left",
        },
      },
      {
        Header: "System",
        accessor: "system",
        style: {
          textAlign: "left",
        },
      },
      {
        Header: "Planet Name",
        accessor: "name",
        style: {
          textAlign: "left",
        },
      },
      {
        Header: "Planet Type",
        accessor: "type",
        style: {
          textAlign: "left",
        },
      },
      {
        id: "resourceType",
        Header: "Resource",
        accessor: (row) => row.resources.map(({ type }) => type).join(", "),
        Cell: (v) =>
          v.value.split(", ").map((x, i) => (
            <div key={i} style={{ whiteSpace: "nowrap" }}>
              {x}
            </div>
          )),
      },
      {
        id: "resourceRichness",
        Header: "Richness",
        accessor: (row) =>
          row.resources.map(({ richness }) => richness).join(", "),
        Cell: (v) => v.value.split(", ").map((x, i) => <div key={i}>{x}</div>),
      },
    ],
    []
  );

  const {
    loading: filtersLoading,
    error: filtersError,
    data: filtersTypesData,
  } = useQuery("filters", getFilters);

  const { regions = [], planetTypes = [], constellations = [] } = useMemo(
    () => (filtersTypesData ? filtersTypesData.data : []),
    [filtersTypesData]
  );

  if (filtersLoading) return "Loading...";

  if (filtersError) return "An error has occurred: " + filtersError.message;

  const formConfig = {
    validation: PlanetSearchSchema,
    className: styles.planetSearchForm,
    btnClassName: styles.submitBtn,
    fieldsClassName: styles.fields,
    fields: [
      {
        name: "region",
        label: "Region",
        placeholder: "Select a region",
        items: regions,
        type: "combobox",
        itemToString: (item) => item?.name ?? "",
        className: styles.field,
      },
      {
        name: "constellation",
        label: "Constellation",
        placeholder: "Select a constellation",
        items: constellations,
        type: "combobox",
        itemToString: (item) => item?.name ?? "",
        className: styles.field,
      },

      {
        name: "system",
        label: "System",
        placeholder: "Enter a system",
        // items: regions,
        // type: "combobox",
        // itemToString: (item) => item?.name ?? "",
        className: styles.field,
      },
      {
        name: "planetName",
        label: "Planet Name",
        placeholder: "Enter a planet name",
        // items: regions,
        // type: "combobox",
        // itemToString: (item) => item?.name ?? "",
        className: styles.field,
      },
      {
        name: "planetType",
        label: "Planet Type",
        placeholder: "Select a planet type",
        items: planetTypes,
        type: "select",
        className: styles.field,
      },
    ],
  };

  return (
    <div className={styles.planetSearch}>
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
        <h1 className={styles.title}>Find Planets</h1>
        <FormRenderer
          config={formConfig}
          onSubmit={getData}
          loading={loading}
        />
      </header>
    </div>
  );
};

export default PlanetSearch;
