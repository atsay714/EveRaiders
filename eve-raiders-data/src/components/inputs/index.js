import React from "react";
import Input from "./Input";
import Password from "./Password";
import { useField } from "formik";

const FormikField = ({ component: Component, ...props }) => {
  const [field, meta] = useField(props);
  return <Component {...field} error={meta.touched && meta.error} {...props} />;
};

export const InputField = (props) => (
  <FormikField component={Input} {...props} />
);

export const PasswordField = (props) => (
  <FormikField component={Password} {...props} />
);
