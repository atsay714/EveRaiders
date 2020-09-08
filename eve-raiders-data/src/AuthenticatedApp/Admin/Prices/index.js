import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, FieldArray } from "formik";
import PageHeader from "components/PageHeader";
import Button from "components/inputs/Button";
import Input from "components/inputs/Input";
import { useQuery, useMutation, queryCache } from "react-query";
import { getPrices, updatePrices } from "api/admin";
import styles from "./Prices.module.scss";

const PricesSchema = Yup.object().shape({
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

  return (
    <div className={styles.prices}>
      <PageHeader>Prices</PageHeader>
      {prices && (
        <Formik
          validationSchema={PricesSchema}
          initialValues={[
            ...prices.map(({ tax, ...rest }) => ({
              ...rest,
              needed: tax === 10,
            })),
          ]}
          onSubmit={(values) =>
            mutate(
              values.map(({ needed, ...rest }) => ({
                ...rest,
                tax: needed ? 10 : 15,
              }))
            )
          }
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form className={styles.form}>
              <FieldArray name={"prices"}>
                <>
                  {values.map((value, index) => (
                    <div key={value.name} className={styles.record}>
                      <Field name={"price"}>
                        {({ field }) => (
                          <Input
                            label={value.name}
                            placeholder=""
                            className={styles.field}
                            {...field}
                            value={values?.[index].price || ""}
                            onChange={(e) =>
                              setFieldValue(`[${index}]`, {
                                ...values?.[index],
                                price: +e.currentTarget.value,
                              })
                            }
                            error={errors[index]}
                          />
                        )}
                      </Field>
                      <Field name={"needed"}>
                        {({ field }) => (
                          <input
                            type={"checkbox"}
                            // className={styles.field}
                            {...field}
                            checked={values?.[index].needed ? "checked" : ""}
                            onChange={(e) =>
                              setFieldValue(`[${index}]`, {
                                ...values?.[index],
                                needed: e.currentTarget.checked,
                              })
                            }
                            error={errors[index]}
                          />
                        )}
                      </Field>
                    </div>
                  ))}
                </>
              </FieldArray>
              <Button
                className={styles.submitBtn}
                type="submit"
                disabled={loading}
              >
                Update Prices
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default Prices;
