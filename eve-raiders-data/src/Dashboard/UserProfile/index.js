import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, FieldArray } from "formik";
import Button from "../../components/inputs/Button";
import Input from "../../components/inputs/Input";
import PilotName from "./PilotName";
import { useQuery } from "react-query";
import { MdAdd } from "react-icons/md";
import { getCurrentUser, updateCurrentUser } from "../../api/users";
import styles from "./UserProfile.module.scss";

const UserProfileSchema = Yup.object().shape({
  resources: Yup.array().of(
    Yup.object().shape({
      username: Yup.string(),
      discordUser: Yup.string().required("Discord Username is required"),
      pilotNames: Yup.array(),
      approved: Yup.boolean(),
      superAdmin: Yup.boolean(),
    })
  ),
});

const UserProfile = ({ handleSubmit }) => {
  const { loading, error, data: currentUser } = useQuery(
    "currentUser",
    getCurrentUser
  );

  return (
    <>
      <h1>User Profile</h1>
      {currentUser && (
        <Formik
          validationSchema={UserProfileSchema}
          initialValues={currentUser}
          onSubmit={updateCurrentUser}
        >
          {({ values, errors, touched }) => (
            <Form className={styles.form}>
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
                    error={touched["discordUser"] && errors["discordUser"]}
                  />
                )}
              </Field>
              <FieldArray name={"pilotNames"}>
                {(arrayHelpers) => (
                  <>
                    <div>
                      {values.pilotNames.map((value, i) => (
                        <PilotName
                          key={i}
                          handleAdd={() => arrayHelpers.push("")}
                          handleRemove={() => arrayHelpers.remove(i)}
                          index={i}
                          addable={i === values.pilotNames.length - 1}
                        />
                      ))}
                    </div>
                    <Button
                      className={styles.add}
                      variant={"text"}
                      onClick={() => arrayHelpers.push("")}
                    >
                      <MdAdd /> Add a pilot name
                    </Button>
                  </>
                )}
              </FieldArray>
              <Button
                className={styles.submitBtn}
                type="submit"
                disabled={loading}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default UserProfile;
