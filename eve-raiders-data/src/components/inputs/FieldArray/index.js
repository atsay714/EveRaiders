import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import classNames from "classnames";
import styles from "./FieldArray.module.scss";
import {
  useFormikContext,
  Field,
  FieldArray as FieldArrayFormik,
} from "formik";
import inputTypes from "../../FormRenderer/inputTypes";

const FieldArray = ({ fields = [], name, Label }) => {
  const { values, touched, errors, setFieldValue } = useFormikContext();

  console.log(values);

  return (
    <div className={styles.fieldArray}>
      <FieldArrayFormik name={name}>
        {(arrayHelpers) => (
          <div className={styles.fields}>
            {values[name].map((val, index) => (
              <Record
                rootName={name}
                values={values[name]}
                key={index}
                index={index}
                fields={fields}
                label={<Label value={values[name][index]} />}
                touched={touched}
                errors={errors}
                setFieldValue={setFieldValue}
                arrayHelpers={arrayHelpers}
                removeable={values[name][index]?.resourceType}
              />
            ))}
            {(values[name][values[name].length - 1]?.resourceType ||
              values[name].length === 0) && (
              <Record
                rootName={name}
                values={values[name][values[name].length]}
                index={values[name].length}
                label={<Label />}
                fields={fields}
                touched={touched}
                errors={errors}
                setFieldValue={setFieldValue}
                arrayHelpers={arrayHelpers}
              />
            )}
          </div>
        )}
      </FieldArrayFormik>
    </div>
  );
};

export default FieldArray;

const Record = ({
  rootName,
  values,
  fields,
  index,
  label,
  touched,
  errors,
  setFieldValue,
  arrayHelpers,
  removeable,
}) => {
  return (
    <div className={styles.record}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      ></div>
      {fields.map(({ className, name, type, initialValue, ...inputProps }) => (
        <div className={classNames(styles.field, className)} key={name}>
          <Field name={`${rootName}[${index}].${name}`}>
            {({ field }) => {
              const Component = inputTypes[type] || inputTypes["*"];
              return (
                <Component
                  key={name}
                  type={type}
                  {...field}
                  {...inputProps}
                  onChange={(value) => {
                    console.log(
                      "setValue:",
                      `${rootName}[${index}].${name}`,
                      value
                    );
                    setFieldValue(`${rootName}[${index}].${name}`, value);
                  }}
                  value={values?.[index]?.[name] ?? initialValue}
                  error={touched[name] && errors[name]}
                />
              );
            }}
          </Field>
        </div>
      ))}
      <div className={styles.label}>{label}</div>
      <div
        className={classNames(styles.remove, {
          [styles.removeable]: removeable,
        })}
        onClick={() => arrayHelpers.remove(index)}
      >
        <FaTrashAlt />
      </div>
    </div>
  );
};
