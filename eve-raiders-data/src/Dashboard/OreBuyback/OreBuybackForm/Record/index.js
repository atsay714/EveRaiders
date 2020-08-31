import React from "react";
import classNames from "classnames";
import { Field, useFormikContext } from "formik";
import { useQuery } from "react-query";
import { FaTrashAlt } from "react-icons/fa";
import { getResources } from "../../../../api/resources";
import Input from "../../../../components/inputs/Input";
import ComboBox from "../../../../components/inputs/ComboBox";
import RowPrice from "./RowPrice";
import styles from "./Record.module.scss";

const Record = ({ handleRemove, index }) => {
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
            label="Resource Name"
            placeholder="resource name"
            items={resourcesData}
            itemToString={(item) => item?.name ?? ""}
            className={styles.field}
            {...field}
            value={values["resources"]?.[index]?.["resourceName"] || ""}
            onChange={(value) =>
              setFieldValue(`resources[${index}].resourceName`, value)
            }
            error={errors["resources"]?.[index]?.["resourceName"]}
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
            error={errors["resources"]?.[index]?.["quantity"]}
          />
        )}
      </Field>
      <RowPrice value={values} />
      <div
        className={classNames(styles.remove, {
          [styles.removeable]: handleRemove,
        })}
        onClick={handleRemove}
      >
        <FaTrashAlt />
      </div>
    </div>
  );
};

export default Record;
