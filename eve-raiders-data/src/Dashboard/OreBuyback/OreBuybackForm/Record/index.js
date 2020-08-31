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

const Record = ({ handleRemove }) => {
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
            // className={styles.field}
            {...field}
            onChange={(value) =>
              setFieldValue(
                "resourceName",
                value?.currentTarget?.value ?? value
              )
            }
            error={touched["resourceName"] && errors["resourceName"]}
          />
        )}
      </Field>
      <Field name={"quantity"}>
        {({ field }) => (
          <Input
            label="Count"
            placeholder="count"
            // className={styles.countField}
            type={"number"}
            {...field}
            // onChange={(value) =>
            //   setFieldValue(
            //     name,
            //     value?.currentTarget?.value ?? value
            //   )
            // }
            error={touched["quantity"] && errors["quantity"]}
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
