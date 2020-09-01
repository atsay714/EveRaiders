import React, { useState } from "react";
import * as Yup from "yup";
import ConfirmOreBuybackModal from "./ConfirmOreBuybackModal";
import { Formik, Form, FieldArray } from "formik";
import Button from "../../../components/inputs/Button";
import Record from "./Record";
import GrandTotal from "./GrandTotal";
import styles from "./OreBuybackForm.module.scss";

const oreBuybackSchema = Yup.object().shape({
  resources: Yup.array().of(
    Yup.object().shape({
      resourceName: Yup.object().required("Resource name is required"),
      quantity: Yup.string().required("Quantity is required"),
    })
  ),
});

const OreBuybackForm = ({ handleSubmit, loading }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <Formik
        validationSchema={oreBuybackSchema}
        initialValues={{
          resources: [
            {
              resourceName: "",
              quantity: "0",
            },
          ],
        }}
        onSubmit={() => setModalIsOpen(true)}
      >
        {({ values }) => (
          <Form className={styles.form}>
            <FieldArray name={"resources"}>
              {(arrayHelpers) => (
                <div>
                  {values.resources.map((value, i) => (
                    <Record
                      key={i}
                      handleRemove={() => arrayHelpers.remove(i)}
                      index={i}
                    />
                  ))}
                </div>
              )}
            </FieldArray>
            {(values["resources"][values["resources"].length - 1]
              ?.resourceName ||
              values["resources"].length === 0) && (
              <Record index={values.resources.length} />
            )}
            <GrandTotal values={values} />
            <Button
              className={styles.submitBtn}
              type="submit"
              disabled={loading}
            >
              Submit
            </Button>
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
    </>
  );
};

export default OreBuybackForm;
