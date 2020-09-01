import React, { useState } from "react";
import { register } from "../api/auth";
import Input from "../components/inputs/Input";
import Password from "../components/inputs/Password";
import Button from "../components/inputs/Button";
import { Formik, Form, Field } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import styles from "./Register.module.scss";

const Register = () => {
  const [registerErrors, setRegisterErrors] = useState([]);
  let history = useHistory();
  let location = useLocation();

  const handleRegister = async (values) => {
    const { success, errors: errs } = await register(values);

    if (errs) return setRegisterErrors(errs);

    if (success) {
      history.push("/login");
    }
  };

  const RegisterSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .matches(
        /^([a-zA-Z])[a-zA-Z_-]*[\w_-]*[\S]$|^([a-zA-Z])[0-9_-]*[\S]$|^[a-zA-Z]*[\S]$/,
        "Username can only be a comination of alphanumeric characters, underscores, and hyphens. (Examples: 'user123', 'user-123', 'user_123)'"
      ),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be 8 or more characters")
      .matches(
        /(?=.*[a-z])/,
        "Password must contain at least one lowercase letter"
      )
      .matches(
        /(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter"
      )
      .matches(/(?=.*\d)/, "Password must contain at least one digit")
      .matches(
        /(?=.*\W)/,
        "Password must contain at least one non alphanumeric character (!@#$% etc.)"
      ),
    discordUser: Yup.string().required("Discord User is required"),
  });

  return (
    <div className={styles.register}>
      <h1 className={styles.title}>Raiders EVE Echoes Tools</h1>
      <div className={styles.formContainer}>
        <img className={styles.logo} src="/logo.png" alt="raiders logo"></img>
        <Formik
          validationSchema={RegisterSchema}
          initialValues={{
            username: "",
            email: "",
            password: "",
            discordUser: "",
          }}
          onSubmit={handleRegister}
        >
          {({ errors, touched }) => (
            <Form className={styles.form}>
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
              <Field name={"email"}>
                {({ field }) => {
                  return (
                    <Input
                      className={styles.field}
                      label={"Email"}
                      type={"email"}
                      error={touched["email"] && errors["email"]}
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
              <Field name={"discordUser"}>
                {({ field }) => {
                  return (
                    <Input
                      className={styles.field}
                      label={"Discord User"}
                      type={"text"}
                      error={touched["discordUser"] && errors["discordUser"]}
                      {...field}
                    />
                  );
                }}
              </Field>
              <div className={styles.buttons}>
                <Button
                  className={styles.button}
                  type="button"
                  onClick={() => history.push("login")}
                >
                  Back to login
                </Button>
                <Button className={styles.button} type="submit">
                  Register
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
