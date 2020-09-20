import React from "react";
import { FieldArray, Field, useFormikContext } from "formik";
import { InputField } from "components/inputs/";
import InputArray from "components/inputs/InputArray";
import Fieldset from "components/inputs/Fieldset";
import styles from "./PilotNames.module.scss";

const PilotNames = () => {
  const { values, setFieldValue, errors } = useFormikContext();

  return (
    <Fieldset label={"Pilot Names"}>
      <FieldArray name={"pilotNames"}>
        {(arrayHelpers) => (
          <InputArray
            className={styles.pilotNames}
            btnLabel={"Add a pilot name"}
            handleRemove={(i) => arrayHelpers.remove(i)}
            handleAdd={() => arrayHelpers.push("")}
          >
            {values.pilotNames.map((value, index) => (
              <InputField
                key={index}
                name={"pilotName"}
                label="Pilot Name"
                placeholder="name"
                className={styles.field}
                value={values["pilotNames"]?.[index].name || ""}
                onChange={(e) =>
                  setFieldValue(`pilotNames[${index}]`, {
                    ...values["pilotNames"]?.[index],
                    name: e.currentTarget.value,
                  })
                }
                error={errors["pilotNames"]?.[index]}
                readOnly={value.saved}
              />
            ))}
          </InputArray>
        )}
      </FieldArray>
    </Fieldset>
  );
};

export default PilotNames;
