import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import PageHeader from "components/PageHeader";
import Button from "components/inputs/Button";
import { InputField } from "components/inputs/";
import Fieldset from "components/inputs/Fieldset";
import Notification from "components/Notification";
import PilotNames from "./PilotNames";
import { useQuery, useMutation, queryCache } from "react-query";
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

  const [mutate] = useMutation(updateCurrentUser, {
    onSuccess: (updatedUser) =>
      queryCache.setQueryData("currentUser", updatedUser),
  });

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
            mutate(newValues)
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
          {({ dirty, isSubmitting }) => (
            <Form className={styles.form} onChange={setResults}>
              <div className={styles.fields}>
                <div className={styles.account}>
                  <Fieldset label={"Account"}>
                    <InputField
                      name={"username"}
                      className={styles.field}
                      label={"username"}
                      readOnly={"readonly"}
                    />
                    <InputField
                      name={"discordUser"}
                      className={styles.field}
                      label={"Discord User"}
                    />
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
