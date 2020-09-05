import React, { useState } from "react";
import * as Yup from "yup";
import ConfirmOreBuybackModal from "./ConfirmOreBuybackModal";
import { Formik, Form, Field, FieldArray } from "formik";
import Button from "../../../components/inputs/Button";
import Select from "../../../components/inputs/Select";
import InputArray from "../../../components/inputs/InputArray";
import Record from "./Record";
import GrandTotal from "./GrandTotal";
import { useQuery } from "react-query";
import { getCurrentUser } from "../../../api/users";
import styles from "./OreBuybackForm.module.scss";

const oreBuybackSchema = Yup.object().shape({
  resources: Yup.array().of(
    Yup.object().shape({
      resource: Yup.object().required("Resource is required"),
      quantity: Yup.string().required("Quantity is required"),
    })
  ),
  pilotName: Yup.object().required("Pilot Name is required"),
});

const OreBuybackForm = ({ handleSubmit, loading }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { loading: loadingUser, error, data: currentUser } = useQuery(
    "currentUser",
    getCurrentUser
  );

  return (
    <>
      {currentUser && (
        <Formik
          validationSchema={oreBuybackSchema}
          initialValues={{
            resources: [
              {
                resource: "",
                quantity: "0",
              },
            ],
            pilotName: currentUser?.pilotNames[0] || {},
          }}
          onSubmit={() => setModalIsOpen(true)}
        >
          {({ values, setFieldValue }) => (
            <Form className={styles.form}>
              <FieldArray name={"resources"}>
                {(arrayHelpers) => (
                  <InputArray
                    className={styles.resources}
                    btnLabel={"Add a resource"}
                    handleRemove={(i) => arrayHelpers.remove(i)}
                    handleAdd={() =>
                      arrayHelpers.push({ resource: "", quantity: "0" })
                    }
                  >
                    {values.resources.map((value, i) => (
                      <Record key={i} index={i} />
                    ))}
                  </InputArray>
                )}
              </FieldArray>
              <GrandTotal values={values} />
              <div className={styles.submitRow}>
                <Field name={"pilotName"}>
                  {({ field }) => (
                    <Select
                      label={"Pilot Name"}
                      className={styles.pilotName}
                      items={
                        currentUser.pilotNames.map(({ name }) => name) || []
                      }
                      {...field}
                      value={values.pilotName.name}
                      onChange={(value) => {
                        setFieldValue(
                          "pilotName",
                          currentUser.pilotNames.find(
                            (pilot) => pilot.name === value
                          )
                        );
                      }}
                    />
                  )}
                </Field>
                <Button
                  className={styles.submitBtn}
                  type="submit"
                  disabled={loading}
                >
                  Submit
                </Button>
              </div>

              {modalIsOpen && (
                <ConfirmOreBuybackModal
                  values={values}
                  onClose={() => setModalIsOpen(false)}
                  onSubmit={() => {
                    setModalIsOpen(false);
                    handleSubmit(values);
                  }}
                />
              )}
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default OreBuybackForm;
