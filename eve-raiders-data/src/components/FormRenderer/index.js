import React, { useMemo } from "react";
import classNames from "classnames";
import Button from "../inputs/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import RingLoader from "@bit/davidhu2000.react-spinners.ring-loader";
import inputTypes from "./inputTypes";
import styles from "./FormRenderer.module.scss";

const FormRenderer = ({ config, onSubmit, loading, children = () => {} }) => {
  const initialValues = useMemo(
    () =>
      config.fields.reduce((acc, field) => {
        acc[field.name] = field.initialValue || "";
        return acc;
      }, {}),
    [config]
  );

  return (
    <Formik
      validationSchema={config.validation}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form className={classNames(styles.form, config.className)}>
          <div className={styles.fields}>
            {config.fields.map(({ className, name, type, ...inputProps }) => (
              <div className={classNames(styles.field, className)} key={name}>
                <Field name={name}>
                  {({ field }) => {
                    const Component = inputTypes[type] || inputTypes["*"];
                    return (
                      <Component
                        key={name}
                        type={type}
                        {...field}
                        {...inputProps}
                        onChange={(value) => setFieldValue(name, value)}
                        error={touched[name] && errors[name]}
                      />
                    );
                  }}
                </Field>
              </div>
            ))}
          </div>
          {children(values)}
          <Button
            className={classNames(styles.submitBtn, config.btnClassName)}
            type="submit"
            disabled={loading}
          >
            <span style={{ visibility: loading ? "hidden" : "visible" }}>
              {config.btnLabel || "Submit"}
            </span>
            {loading && (
              <div
                className={styles.loader}
                style={{
                  position: "absolute",
                  top: 10,
                  left: "calc(50% - 10px)",
                }}
              >
                <RingLoader
                  size={20}
                  color={getComputedStyle(
                    document.documentElement
                  ).getPropertyValue("--color-text-white")}
                />
              </div>
            )}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormRenderer;
