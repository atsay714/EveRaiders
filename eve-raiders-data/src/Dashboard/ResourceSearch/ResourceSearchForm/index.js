import React, { useMemo } from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import Button from "../../../components/inputs/Button";
import Select from "../../../components/inputs/Select";
import ComboBox from "../../../components/inputs/ComboBox";
import Loader from "../../../components/Loader";
import { useQuery } from "react-query";
import { getFilters } from "../../../api";
import styles from "./ResourceSearchForm.module.scss";

const ResourceSearchSchema = Yup.object().shape({
  resourceName: Yup.string().required("Resource is required"),
  richness: Yup.string().required("Richness is required"),
});

const ResourceSearchForm = ({ handleSubmit, loading }) => {
  const {
    isLoading: filtersLoading,
    error: filtersError,
    data: filtersTypesData,
  } = useQuery("filters", getFilters);

  const { regions = [], richness = [], types = [] } = useMemo(
    () => (filtersTypesData ? filtersTypesData.data : []),
    [filtersTypesData]
  );

  const resourceNameOptions = useMemo(
    () => types.map((type) => type.replace(/([A-Z])/g, " $1").trim()),
    [types]
  );

  const initialRegion = useMemo(
    () => regions.find((region) => region.name === "Deklein"),
    [regions]
  );

  if (filtersLoading) return <Loader />;

  return (
    <Formik
      validationSchema={ResourceSearchSchema}
      initialValues={{
        resourceName: "",
        richness: "Perfect",
        region: initialRegion || "",
      }}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, touched, errors }) => (
        <Form className={styles.form}>
          <div className={styles.fields}>
            <Field name={"resourceName"}>
              {({ field }) => (
                <ComboBox
                  className={styles.field}
                  label="Resource"
                  placeholder="resource"
                  items={resourceNameOptions}
                  {...field}
                  onChange={(value) => setFieldValue("resourceName", value)}
                  error={touched["resourceName"] && errors["resourceName"]}
                  loading={filtersLoading}
                />
              )}
            </Field>
            <Field name={"richness"}>
              {({ field }) => (
                <Select
                  label={"Richness"}
                  className={styles.field}
                  items={richness}
                  {...field}
                  onChange={(value) => setFieldValue("richness", value)}
                  loading={filtersLoading}
                />
              )}
            </Field>
            <Field name={"region"}>
              {({ field }) => (
                <ComboBox
                  className={styles.field}
                  label="Region"
                  placeholder="region"
                  items={regions}
                  itemToString={(item) => item?.name ?? ""}
                  {...field}
                  onChange={(value) => setFieldValue("region", value)}
                  error={touched["region"] && errors["region"]}
                  loading={filtersLoading}
                />
              )}
            </Field>
          </div>

          <Button className={styles.submitBtn} type="submit" loading={loading}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ResourceSearchForm;
