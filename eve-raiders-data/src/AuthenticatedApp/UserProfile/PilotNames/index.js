import React from "react";
import { FieldArray, Field, useFormikContext } from "formik";
import Input from "components/inputs/Input";
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
              <Field key={index} name={"pilotName"}>
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
                    readOnly={value.saved}
                  />
                )}
              </Field>
            ))}
          </InputArray>
        )}
      </FieldArray>
    </Fieldset>
  );
};

export default PilotNames;
