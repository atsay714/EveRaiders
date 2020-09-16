import React, { useMemo } from "react";
import { getResources } from "api/resources";
import { useQuery } from "react-query";
import ComboBox from "components/inputs/ComboBox";
import Input from "components/inputs/Input";
import Button from "components/inputs/Button";
import data from "../../../blueprint.js";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "./BuyIndustry.module.scss";

const BuyIndustrySchema = Yup.object().shape({
  blueprint: Yup.string().required("Select a blueprint"),
  efficiency: Yup.number().min(0).max(100),
});

const BuyIndustry = ({ onChange = () => {} }) => {
  const { loading, error, data: resourceData } = useQuery(
    "resources",
    getResources
  );

  const handleSubmit = ({ blueprint, efficiency }) => {
    if (data[blueprint]) {
      const newData = data[blueprint].resources.map(
        ({ resource, quantity }) => ({
          resource: resourceData.find((x) => x.name === resource),
          quantity: Math.round(quantity * ((100 - efficiency) / 100)),
        })
      );
      onChange(newData);
    }
  };

  const blueprints = useMemo(() => Object.keys(data), []);

  return (
    <div className={styles.buyIndustry}>
      <Formik
        validationSchema={BuyIndustrySchema}
        initialValues={{
          blueprint: "",
          efficiency: 0,
        }}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, resetForm, errors, touched }) => (
          <Form className={styles.form}>
            <Field name={"blueprint"}>
              {({ field }) => (
                <ComboBox
                  className={styles.field}
                  label={"Blueprints"}
                  placeholder={"Select a blueprint"}
                  items={blueprints}
                  {...field}
                  onChange={(value) => setFieldValue("blueprint", value)}
                  error={touched["blueprint"] && errors["blueprint"]}
                />
              )}
            </Field>
            <Field name={"efficiency"}>
              {({ field }) => (
                <Input
                  label={"Efficiency"}
                  placeholder=""
                  className={styles.field}
                  {...field}
                  error={errors["efficiency"]}
                  type={"number"}
                />
              )}
            </Field>
            <Button
              className={styles.submitBtn}
              type="submit"
              disabled={loading}
            >
              Calculate Resources
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BuyIndustry;
