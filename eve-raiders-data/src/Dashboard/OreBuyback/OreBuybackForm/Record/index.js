import React from "react";
import { Field, useFormikContext } from "formik";
import { useQuery } from "react-query";
import { getResources } from "../../../../api/resources";
import Input from "../../../../components/inputs/Input";
import ComboBox from "../../../../components/inputs/ComboBox";
import RowPrice from "./RowPrice";
import styles from "./Record.module.scss";

const Record = ({ index }) => {
  const {
    loading: resourcesLoading,
    error: resourcesError,
    data: resourcesData,
  } = useQuery("resources", getResources);

  const { values, touched, errors, setFieldValue } = useFormikContext();

  return (
    <div className={styles.record}>
      <Field name={"resourceName"}>
        {({ field }) => (
          <ComboBox
            className={styles.resourceField}
            label="Resource Name"
            placeholder="resource name"
            items={resourcesData}
            itemToString={(item) => item?.name ?? ""}
            {...field}
            value={values["resources"]?.[index]?.["resourceName"] || ""}
            onChange={(value) =>
              setFieldValue(`resources[${index}].resourceName`, value)
            }
            error={
              touched["resources"]?.[index]?.["resourceName"] &&
              errors["resources"]?.[index]?.["resourceName"]
            }
            loading={resourcesLoading}
          />
        )}
      </Field>
      <Field name={"quantity"}>
        {({ field }) => (
          <Input
            label="Quantity"
            placeholder="quantity"
            className={styles.countField}
            type={"number"}
            {...field}
            value={values["resources"]?.[index]?.["quantity"] || ""}
            onChange={(e) =>
              setFieldValue(
                `resources[${index}].quantity`,
                e.currentTarget.value
              )
            }
            error={
              touched["resources"]?.[index]?.["quantity"] &&
              errors["resources"]?.[index]?.["quantity"]
            }
          />
        )}
      </Field>
      <RowPrice value={values["resources"]?.[index]} />
    </div>
  );
};

export default Record;
