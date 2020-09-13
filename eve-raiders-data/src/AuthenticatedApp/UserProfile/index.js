import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, FieldArray } from "formik";
import PageHeader from "components/PageHeader";
import Button from "components/inputs/Button";
import Input from "components/inputs/Input";
import Fieldset from "components/inputs/Fieldset";
import Notification from "components/Notification";
import PilotNames from "./PilotNames";
import { useQuery } from "react-query";
import { getCurrentUser, updateCurrentUser } from "api/users";
import styles from "./UserProfile.module.scss";

const UserProfileSchema = Yup.object().shape({
  resources: Yup.array().of(
    Yup.object().shape({
      username: Yup.string(),
      discordUser: Yup.string()
        .required("Discord User is required")
        .matches(/^((.+?)#\d{4})/, "Must be a valid Discord username"),
      pilotNames: Yup.array(),
      approved: Yup.boolean(),
      superAdmin: Yup.boolean(),
    })
  ),
});

const UserProfile = () => {
  const [results, setResults] = useState();
  const { data: currentUser } = useQuery("currentUser", getCurrentUser);

  return (
    <div className={styles.userProfile}>
      <PageHeader>Profile</PageHeader>
      {currentUser && (
        <Formik
          validationSchema={UserProfileSchema}
          initialValues={{
            id: currentUser?.id,
            username: currentUser?.username ?? "",
            discordUser: currentUser?.discordUser ?? "",
            pilotNames:
              currentUser?.pilotNames.map((x) => ({ ...x, saved: true })) ?? [],
            approved: currentUser?.approved ?? false,
            superAdmin: currentUser?.superAdmin ?? false,
          }}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            const newValues = {
              ...values,
              pilotNames: values.pilotNames.filter((x) => x.name),
            };
            updateCurrentUser(newValues)
              .then(() => {
                setResults({ type: "success", message: "Saved" });
              })
              .catch((e) => {
                setResults({
                  type: "error",
                  message:
                    "And error occured while attempting to update the profile",
                });
              })
              .finally(() => {
                setSubmitting(false);
                resetForm({ values: newValues });
              });
          }}
        >
          {({
            values,
            errors,
            touched,
            dirty,
            setFieldValue,
            isSubmitting,
          }) => (
            <Form className={styles.form} onChange={setResults}>
              <div className={styles.fields}>
                <div className={styles.account}>
                  <Fieldset label={"Account"}>
                    <Field name={"username"}>
                      {({ field }) => (
                        <Input
                          className={styles.field}
                          label={"username"}
                          {...field}
                          error={touched["username"] && errors["username"]}
                          readOnly={"readonly"}
                        />
                      )}
                    </Field>
                    <Field name={"discordUser"}>
                      {({ field }) => (
                        <Input
                          className={styles.field}
                          label={"Discord User"}
                          {...field}
                          error={
                            touched["discordUser"] && errors["discordUser"]
                          }
                        />
                      )}
                    </Field>
                  </Fieldset>
                </div>
                <div className={styles.pilotNames}>
                  <PilotNames />
                </div>
              </div>
              <Button
                className={styles.submitBtn}
                type="submit"
                loading={isSubmitting}
              >
                Submit
              </Button>
              {results && !dirty && (
                <Notification type={results.type}>
                  {results.message}
                </Notification>
              )}
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default UserProfile;
