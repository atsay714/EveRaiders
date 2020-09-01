import React, { useState, useContext, useEffect } from "react";
import { login } from "../api/auth";
import Input from "../components/inputs/Input";
import Button from "../components/inputs/Button";
import Password from "../components/inputs/Password";
import { Formik, Form, Field } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { MdErrorOutline } from "react-icons/md";
import { TokenContext } from "../contexts";
import styles from "./Login.module.scss";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState();
  let history = useHistory();
  let location = useLocation();

  const [token, setToken] = useContext(TokenContext);

  let { from } = location.state || { from: { pathname: "/" } };

  let handleLogin = async ({ username, password }) => {
    setLoading(true);
    const { success, error, data } = await login({ username, password });
    setLoading(false);

    if (success) {
      setToken(data);
      history.replace(from || "/");
    } else if (error) {
      setLoginError(error);
    } else {
      setLoginError("Unable to login");
    }
  };

  useEffect(() => {
    if (token) return history.replace(from);
  }, [token]);

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <div className={styles.login}>
      <h1 className={styles.title}>Raiders EVE Echoes Tools</h1>
      <div className={styles.formContainer}>
        <img className={styles.logo} src="/logo.png" alt="raiders logo"></img>
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
                <Button
                  className={styles.button}
                  type="button"
                  onClick={() => history.push("register")}
                >
                  Register
                </Button>
                <Button
                  className={styles.button}
                  type="submit"
                  loading={loading}
                >
                  Login
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
