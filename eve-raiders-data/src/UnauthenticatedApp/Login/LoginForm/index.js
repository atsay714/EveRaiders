import React, { useState } from "react";
import { InputField, PasswordField } from "components/inputs";
import Button from "components/inputs/Button";
import { Formik, Form } from "formik";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { MdErrorOutline } from "react-icons/md";
import useAuth from "context/auth";
import styles from "./LoginForm.module.scss";
import { queryCache } from "react-query";

const LoginForm = ({ onBack }) => {
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState();

  const { login } = useAuth();

  let handleLogin = async ({ username, password }) => {
    setLoading(true);
    const { success, error } = await login({ username, password });
    setLoading(false);

    if (success) {
      queryCache.clear();
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
        <InputField
          name={"username"}
          className={styles.field}
          label={"Username"}
          type={"text"}
        />
        <PasswordField
          name={"password"}
          className={styles.field}
          label={"Password"}
        />
        <div className={styles.buttons}>
          <Button className={styles.button} type="submit" loading={loading}>
            Log in
          </Button>
          <NavLink className={styles.forgotPassword} to="/forgot-password">
            Forgot Password?
          </NavLink>
        </div>
      </Form>
    </Formik>
  );
};

export default LoginForm;
