import React, { useState } from "react";
import { resetPassword } from "../api/auth";
import Password from "../components/inputs/Password";
import Button from "../components/inputs/Button";
import { Formik, Form, Field } from "formik";
import { MdErrorOutline } from "react-icons/md";
import * as Yup from "yup";
import { useHistory } from "react-router";
import styles from "./ResetPassword.module.scss";

const ResetPassword = () => {
  const [registerError, setRegisterError] = useState();
  const history = useHistory();

  const { token } = new Url(window.location.href).query;

  const handleResetPassword = async ({ password }) => {
    const { success, error } = await resetPassword({
      token,
      password,
    });

    if (error) return setRegisterError(error);
  };

  const ResetPasswordSchema = Yup.object().shape({
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
  });

  return (
    <Formik
      validationSchema={ResetPasswordSchema}
      initialValues={{
        password: "",
      }}
      onSubmit={handleResetPassword}
    >
      {({ errors, touched }) => (
        <Form className={styles.form}>
          {registerError && (
            <div className={styles.errorMessage}>
              <MdErrorOutline style={{ marginRight: 5, minWidth: "1em" }} />{" "}
              {registerError}
            </div>
          )}
          <h3 className={styles.header}>Change Password</h3>
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
              variant={"outlined"}
              onClick={() => history.push("/login")}
            >
              Back to login
            </Button>
            <Button className={styles.button} type="submit">
              Change Password
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPassword;

class Url {
  constructor(url = null) {
    if (!url) {
      return false;
    }
    this.url = String(url);
    return Url.get(url);
  }

  static get(url) {
    const sUrl = url.toString();

    const parserRe = /^((\w+?):)?((\/\/)?(([^@]+)@)?(\[[0-9a-f:]+\]|[^/|:]+)(:(\d+))?)?([^?#]+)?(\?[^#]*)?(#(.+)?)?$/;
    const [
      href,
      protocol,
      scheme,
      authority,
      ,
      ,
      userinfo,
      host,
      ,
      port,
      pathname,
      search,
      hash,
    ] = parserRe.exec(sUrl);
    const [username, password] = (userinfo && userinfo.split(":")) || [];
    const [, , locale] = /^\/(ibe\/)?([a-zA-Z]{2,2})\//.exec(pathname) || [];

    // 0: "https://username:pass@htte:80/qsmdk/qsdqsd?query=a&b=%20c&d=true&e#hashe"
    // 1: "https:"
    // 2: "https"
    // 3: "//username:pass@htte:80"
    // 4: "username:pass@"
    // 5: "username:pass"
    // 6: "htte"
    // 7: ":80"
    // 8: "80"
    // 9: "/qsmdk/qsdqsd"
    // 10: "?query=a&b=%20c&d=true&e"
    // 11: "#hashe"
    // 12: "hashe"

    return {
      authority,
      hash,
      host,
      href,
      locale,
      pathname,
      port,
      protocol,
      query: Url.getSearchParams(search),
      scheme,
      search,
      username,
      password,
    };
  }

  static getSearchParams(querystring) {
    if (!querystring) {
      return undefined;
    }
    const getSearchParams = {};

    querystring.replace(
      /(?:\?|&(?:amp;)?)([^=&#]+)(?:=?([^&#]*))/g,
      (fullPattern, key, value) =>
        Object.assign(getSearchParams, {
          [key]: decodeURIComponent(value),
        })
    );
    return getSearchParams;
  }
}
