import React from "react";
import { Field, useFormikContext } from "formik";
import Input from "components/inputs/Input";
import Fieldset from "components/inputs/Fieldset";
import styles from "./Taxes.module.scss";

const Taxes = () => {
  const { touched, errors } = useFormikContext();
  return (
    <Fieldset label={"Taxes"}>
      <div className={styles.sell}>
        Sell
        <Field name={"taxSellBase"}>
          {({ field }) => (
            <Input
              className={styles.field}
              label={"Base"}
              type={"number"}
              error={touched["taxSellBase"] && errors["taxSellBase"]}
              {...field}
            />
          )}
        </Field>
        <Field name={"taxSellNeeded"}>
          {({ field }) => (
            <Input
              className={styles.field}
              label={"Needed"}
              type={"number"}
              error={touched["taxSellNeeded"] && errors["taxSellNeeded"]}
              {...field}
            />
          )}
        </Field>
      </div>
      <div className={styles.buy}>
        Buy
        <Field name={"taxBuyBase"}>
          {({ field }) => (
            <Input
              className={styles.field}
              label={"Base"}
              type={"number"}
              error={touched["taxBuyBase"] && errors["taxBuyBase"]}
              {...field}
            />
          )}
        </Field>
        <Field name={"taxBuyNeeded"}>
          {({ field }) => (
            <Input
              className={styles.field}
              label={"Needed"}
              type={"number"}
              error={touched["taxBuyNeeded"] && errors["taxBuyNeeded"]}
              {...field}
            />
          )}
        </Field>
      </div>
    </Fieldset>
  );
};

export default Taxes;
