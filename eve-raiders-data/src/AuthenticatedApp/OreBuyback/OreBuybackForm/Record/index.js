import React from "react";
import { Field, useFormikContext } from "formik";
import { useQuery } from "react-query";
import { getResources } from "api/resources";
import { InputField } from "components/inputs";
import ComboBox from "components/inputs/ComboBox";
import RowPrice from "./RowPrice";
import styles from "./Record.module.scss";

const Record = ({ index }) => {
  const {
    loading: resourcesLoading,
    error: resourcesError,
    data: resourcesData = [],
  } = useQuery("resources", getResources);

  const { values, touched, errors, setFieldValue } = useFormikContext();

  return (
    <div className={styles.record}>
      <Field name={"resource"}>
        {({ field }) => (
          <ComboBox
            className={styles.resourceField}
            label="Resource"
            placeholder="resource"
            items={resourcesData.sort((a, b) => a.name.localeCompare(b.name))}
            itemToString={(item) => item?.name ?? ""}
            {...field}
            value={values["resources"]?.[index]?.["resource"] || ""}
            onChange={(value) =>
              setFieldValue(`resources[${index}].resource`, value)
            }
            error={
              touched["resources"]?.[index]?.["resource"] &&
              errors["resources"]?.[index]?.["resource"]
            }
            loading={resourcesLoading}
          />
        )}
      </Field>
      <InputField
        name={"quantity"}
        label="Quantity"
        placeholder="quantity"
        className={styles.countField}
        type={"number"}
        value={values["resources"]?.[index]?.["quantity"] || ""}
        onFocus={(e) => e.currentTarget.select()}
        onChange={(e) =>
          setFieldValue(`resources[${index}].quantity`, e.currentTarget.value)
        }
        error={
          touched["resources"]?.[index]?.["quantity"] &&
          errors["resources"]?.[index]?.["quantity"]
        }
      />
      <RowPrice value={values["resources"]?.[index]} />
    </div>
  );
};

export default Record;
