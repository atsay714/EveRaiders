import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, FieldArray } from "formik";
import Button from "../../components/inputs/Button";
import Input from "../../components/inputs/Input";
import InputArray from "../../components/inputs/InputArray";
import { useQuery } from "react-query";

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
          {({ values, errors, touched, setFieldValue }) => (
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
                  <InputArray
                    btnLabel={"Add a pilot name"}
                    handleRemove={(i) => arrayHelpers.remove(i)}
                    handleAdd={() => arrayHelpers.push("")}
                  >
                    {values.pilotNames.map((value, index) => (
                      <Field key={index} name={"pilotName"}>
                        {({ field }) => (
                          <Input
                            label="Pilot Name"
                            placeholder="name"
                            className={styles.field}
                            {...field}
                            value={values["pilotNames"]?.[index].name || ""}
                            onChange={(e) =>
                              setFieldValue(`pilotNames[${index}]`, {
                                ...values["pilotNames"]?.[index],
                                name: e.currentTarget.value,
                              })
                            }
                            error={errors["pilotNames"]?.[index]}
                          />
                        )}
                      </Field>
                    ))}
                  </InputArray>
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
