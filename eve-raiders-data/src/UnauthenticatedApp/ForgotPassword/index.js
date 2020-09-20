import React, { useState } from "react";
import { forgotPassword } from "api/auth";
import { InputField } from "components/inputs";
import Button from "components/inputs/Button";
import { Formik, Form } from "formik";
import { MdErrorOutline } from "react-icons/md";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import styles from "./ForgotPassword.module.scss";

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();

  const handleForgotPassword = async (values, { setSubmitting }) => {
    const { success, error } = await forgotPassword(values);
    if (success) setEmailSent(true);
    if (error) setErrorMessage(error);
    setSubmitting(false);
  };

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
  });

  return (
    <Formik
      validationSchema={ForgotPasswordSchema}
      initialValues={{
        email: "",
      }}
      onSubmit={handleForgotPassword}
    >
      {({ values, isSubmitting }) => (
        <Form className={styles.form}>
          <h3 className={styles.header}>Forgot Password</h3>
          {!emailSent && (
            <InputField
              name={"email"}
              className={styles.field}
              label={"Email"}
              type={"email"}
            />
          )}
          {emailSent && (
            <p>
              A recovery link has been sent to your email at{" "}
              <span className={styles.email}>{values.email}</span>
            </p>
          )}
          <div className={styles.buttons}>
            <Button
              className={styles.button}
              variant={!emailSent && "outlined"}
              onClick={() => history.push("/login")}
            >
              Back to login
            </Button>
            {!emailSent && (
              <Button
                className={styles.button}
                type="submit"
                loading={isSubmitting}
              >
                Send Email
              </Button>
            )}
          </div>
          {errorMessage && (
            <div className={styles.errorMessage}>
              <MdErrorOutline style={{ marginRight: 5, minWidth: "1em" }} />{" "}
              {errorMessage}
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default ForgotPassword;
