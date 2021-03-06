import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, FieldArray } from "formik";
import Button from "components/inputs/Button";
import Input from "components/inputs/Input";
import Checkbox from "components/inputs/Checkbox";
import Fieldset from "components/inputs/Fieldset";
import { useQuery, useMutation, queryCache } from "react-query";
import { getPrices, updatePrices } from "api/admin";
import styles from "./ResourcePrices.module.scss";

const ResourcePricesSchema = Yup.object().shape({
  prices: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.number().required("Missing id"),
        name: Yup.string().required(),
        price: Yup.string().required("Price is required"),
        needed: Yup.boolean(),
      })
    )
    .required("missing prices"),
});

const Prices = () => {
  const { loading, error, data: prices } = useQuery("prices", getPrices);

  const [mutate] = useMutation(updatePrices, {
    onSuccess: (newPrices) => queryCache.setQueryData("prices", newPrices),
  });

  if (loading || !prices) return "...loading";

  return (
    prices && (
      <Formik
        validationSchema={ResourcePricesSchema}
        initialValues={{ prices }}
        onSubmit={async (values, { setSubmitting }) => {
          await mutate(
            values.prices.map(({ needed, ...rest }) => ({
              ...rest,
              tax: needed ? 10 : 15,
            }))
          );
          setSubmitting(false);
        }}
      >
        {({ values, errors, setFieldValue, isSubmitting }) => (
          <Form className={styles.form}>
            <Fieldset label={"Resources"}>
              <div className={styles.neededLabel}>Needed?</div>
              <FieldArray name={"prices"}>
                <div className={styles.resources}>
                  {values.prices.map((value, index) => (
                    <div key={value.name} className={styles.record}>
                      <Field name={"price"}>
                        {({ field }) => (
                          <Input
                            label={value.name}
                            placeholder=""
                            className={styles.field}
                            {...field}
                            value={value.price || ""}
                            onChange={(e) =>
                              setFieldValue(`prices[${index}]`, {
                                ...value,
                                price: +e.currentTarget.value,
                              })
                            }
                            error={errors.prices?.[index]}
                          />
                        )}
                      </Field>
                      <Field name={"needed"}>
                        {({ field }) => (
                          <Checkbox
                            className={styles.neededCheckbox}
                            {...field}
                            checked={value.needed ? "checked" : ""}
                            onChange={(e) =>
                              setFieldValue(`prices[${index}]`, {
                                ...value,
                                needed: e.currentTarget.checked,
                              })
                            }
                            error={errors.prices?.[index]}
                          />
                        )}
                      </Field>
                    </div>
                  ))}
                </div>
              </FieldArray>
            </Fieldset>
            <Button
              className={styles.submitBtn}
              type="submit"
              loading={isSubmitting}
            >
              Update Prices
            </Button>
          </Form>
        )}
      </Formik>
    )
  );
};

export default Prices;
