import React from "react";
import classNames from "classnames";
import { Field, useFormikContext } from "formik";
import { FaTrashAlt } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import Input from "../../../components/inputs/Input";
import styles from "./PilotName.module.scss";

const PilotName = ({ handleRemove, index }) => {
  const { values, touched, errors, setFieldValue } = useFormikContext();

  return (
    <div className={styles.pilotName}>
      <Field name={"pilotName"}>
        {({ field }) => (
          <Input
            label="Pilot Name"
            placeholder="name"
            className={styles.field}
            {...field}
            value={values["pilotNames"]?.[index].name || ""}
            onChange={(e) =>
              setFieldValue(`pilotNames[${index}]`, {
                ...values["pilotNames"]?.[index],
                name: e.currentTarget.value,
              })
            }
            error={errors["pilotNames"]?.[index]}
          />
        )}
      </Field>
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

export default PilotName;
