import React, { useState, useContext, useEffect } from "react";
import Input from "../../components/inputs/Input";
import Button from "../../components/inputs/Button";
import Password from "../../components/inputs/Password";
import { Formik, Form, Field } from "formik";
import { useHistory, useLocation, NavLink, Redirect } from "react-router-dom";
import * as Yup from "yup";
import { MdErrorOutline } from "react-icons/md";
import useAuth from "../../context/auth";
import styles from "./LoginForm.module.scss";

const LoginForm = ({ onBack }) => {
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState();

  const { login } = useAuth();

  let handleLogin = async ({ username, password }) => {
    setLoading(true);
    const { success, error } = await login({ username, password });
    setLoading(false);

    if (success) {
    } else if (error) {
      setLoginError(error);
    } else {
      setLoginError("Unable to login");
    }
  };

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <Formik
      validationSchema={LoginSchema}
      initialValues={{
        username: "",
        password: "",
      }}
      onSubmit={handleLogin}
    >
      {({ errors, touched }) => (
        <Form className={styles.form}>
          <Button className={styles.button} onClick={onBack}>
            Create Account
          </Button>
          <div className={styles.or}>- or -</div>
          {loginError && (
            <div className={styles.errorMessage}>
              <MdErrorOutline style={{ marginRight: 5, minWidth: "1em" }} />
              {loginError}
            </div>
          )}
          <Field name={"username"}>
            {({ field }) => {
              return (
                <Input
                  className={styles.field}
                  label={"Username"}
                  type={"text"}
                  error={touched["username"] && errors["username"]}
                  {...field}
                />
              );
            }}
          </Field>
          <Field name={"password"}>
            {({ field }) => {
              return (
                <Password
                  className={styles.field}
                  label={"Password"}
                  error={touched["password"] && errors["password"]}
                  {...field}
                />
              );
            }}
          </Field>
          <div className={styles.buttons}>
            <Button className={styles.button} type="submit" loading={loading}>
              Log in
            </Button>
            <NavLink className={styles.forgotPassword} to="/forgot-password">
              Forgot Password?
            </NavLink>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
