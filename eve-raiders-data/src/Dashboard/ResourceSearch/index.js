import React, { useState, useMemo } from "react";
import Table from "../../components/Table";
import FormRenderer from "../../components/FormRenderer";
import { getFilters, getResources } from "../../api";
import { useQuery } from "react-query";
import * as Yup from "yup";
import styles from "./ResourceSearch.module.scss";

const ResourceSearchSchema = Yup.object().shape({
  resourceType: Yup.string().required("Resource Type is required"),
  richness: Yup.string().required("Richness is required"),
});

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
        style: {
          textAlign: "left",
        },
      },
      {
        Header: "Resource Type",
        accessor: "resourceType",
        Cell: ({ value }) => value.replace(/([A-Z])/g, " $1").trim(),
        style: {
          textAlign: "left",
        },
      },
      {
        Header: "Richness",
        accessor: "richness",
        style: {
          textAlign: "left",
        },
      },
    ],
    []
  );

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

  if (filtersLoading) return "Loading...";

  if (filtersError) return "An error has occurred: " + filtersError.message;

  const formConfig = {
    validation: ResourceSearchSchema,
    className: styles.resourceSearchForm,
    fieldsClassName: styles.fields,
    btnClassName: styles.submitBtn,
    fields: [
      {
        name: "resourceType",
        label: "Resource Type",
        placeholder: "resource type",
        type: "combobox",
        items: resourceTypeOptions,
        className: styles.field,
      },
      {
        name: "richness",
        label: "Richness",
        placeholder: "Select a richness",
        items: richness,
        type: "select",
        className: styles.field,
      },
      {
        name: "region",
        label: "Region",
        placeholder: "Select a region",
        items: regions,
        type: "combobox",
        itemToString: (item) => item?.name ?? "",
        className: styles.field,
      },
    ],
  };

  return (
    <div className={styles.resourceSearch}>
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
        <h1 className={styles.title}>Find Resources</h1>
        <FormRenderer
          config={formConfig}
          onSubmit={getData}
          loading={loading}
        />
      </header>
    </div>
  );
};

export default ResourceSearch;
