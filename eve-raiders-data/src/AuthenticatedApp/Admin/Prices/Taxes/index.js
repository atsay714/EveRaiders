import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useQuery, useMutation, queryCache } from "react-query";
import { getTaxes, updateTaxes } from "api/admin";
import Input from "components/inputs/Input";
import Button from "components/inputs/Button";
import Fieldset from "components/inputs/Fieldset";
import styles from "./Taxes.module.scss";

const TaxesSchema = Yup.object().shape({
  baseSell: Yup.string().required("Value is required"),
  neededSell: Yup.string().required("Value is required"),
  baseBuy: Yup.string().required("Value is required"),
  neededBuy: Yup.string().required("Value is required"),
});

// {
//   "id": 1,
//   "name": "Needed",
//   "buyTax": 10,
//   "sellTax": 9
// },
// {
//   "id": 2,
//   "name": "Not Needed",
//   "buyTax": 20,
//   "sellTax": 12
// },

const Taxes = () => {
  const { loading, error, data: taxes } = useQuery("taxes", getTaxes);

  const [mutate] = useMutation(updateTaxes, {
    onSuccess: (newTaxes) => {
      queryCache.setQueryData("taxes", (prevTaxes) => [
        ...prevTaxes.filter(
          (x) => x.name !== "Needed" && x.name !== "Not Needed"
        ),
        ...newTaxes,
      ]);
    },
  });

  if (loading || !taxes) return "...loading";

  const baseTax = taxes.find(({ name }) => name === "Not Needed");
  const neededTax = taxes.find(({ name }) => name === "Needed");

  return (
    taxes && (
      <Formik
        validationSchema={TaxesSchema}
        initialValues={{
          baseSell: baseTax?.sellTax ?? 0,
          neededSell: neededTax?.sellTax ?? 0,
          baseBuy: baseTax?.buyTax ?? 0,
          neededBuy: neededTax?.buyTax ?? 0,
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const newBaseTax = {
            ...baseTax,
            buyTax: values.baseBuy,
            sellTax: values.baseSell,
          };

          const newNeededTax = {
            ...neededTax,
            buyTax: values.neededBuy,
            sellTax: values.neededSell,
          };

          await mutate([newBaseTax, newNeededTax]);
          setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className={styles.form}>
            <Fieldset label={"Taxes"}>
              <div className={styles.sell}>
                <span className={styles.label}>Sell</span>
                <Field name={"baseSell"}>
                  {({ field }) => (
                    <Input
                      className={styles.field}
                      label={"Base"}
                      type={"number"}
                      error={touched["baseSell"] && errors["baseSell"]}
                      {...field}
                    />
                  )}
                </Field>
                <Field name={"neededSell"}>
                  {({ field }) => (
                    <Input
                      className={styles.field}
                      label={"Needed"}
                      type={"number"}
                      error={touched["neededSell"] && errors["neededSell"]}
                      {...field}
                    />
                  )}
                </Field>
              </div>
              <div className={styles.buy}>
                <span className={styles.label}>Buy</span>
                <Field name={"baseBuy"}>
                  {({ field }) => (
                    <Input
                      className={styles.field}
                      label={"Base"}
                      type={"number"}
                      error={touched["baseBuy"] && errors["baseBuy"]}
                      {...field}
                    />
                  )}
                </Field>
                <Field name={"neededBuy"}>
                  {({ field }) => (
                    <Input
                      className={styles.field}
                      label={"Needed"}
                      type={"number"}
                      error={touched["neededBuy"] && errors["neededBuy"]}
                      {...field}
                    />
                  )}
                </Field>
              </div>
            </Fieldset>
            <Button
              className={styles.submitBtn}
              type="submit"
              loading={isSubmitting}
            >
              Update Taxes
            </Button>
          </Form>
        )}
      </Formik>
    )
  );
};

export default Taxes;
