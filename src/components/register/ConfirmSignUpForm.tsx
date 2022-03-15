import React, { ChangeEvent } from "react";
import { Formik, Form, Field } from "formik";
import { object, string } from "yup";
import { RegisterFormProps } from "./@types";
import { ValidatedFormField } from "../../components/shared/ValidatedFormField";

export const ConfirmSignUpForm = ({
  formInputState,
  setFormInputState,
  formSubmit,
}: RegisterFormProps) => {
  const ConfirmationFormSchema = object().shape({
    verificationCode: string().min(6).max(6),
  });
  const onChangeStateUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInputState({ ...formInputState, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div>
        <h1>Confirm Signup Here</h1>
        <Formik
          enableReinitialize
          initialValues={{
            verificationCode: formInputState.verificationCode,
          }}
          validationSchema={ConfirmationFormSchema}
          onSubmit={async (values, { setSubmitting }) => {
            formSubmit();
            setSubmitting(false);
          }}
        >
          {({ handleChange }) => {
            return (
              <Form style={{ maxWidth: "500px" }}>
                <div
                  className="form-group"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: 0,
                  }}
                >
                  <ValidatedFormField
                    id="verificationCode"
                    type="text"
                    name="verificationCode"
                    value={formInputState.verificationCode}
                    placeholder="Verification Code"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(event);
                      onChangeStateUpdate(event);
                    }}
                    style={{ margin: "6px 0", width: "100%" }}
                  />
                </div>
                <button type="submit" className="mt-4">
                  Sumbit
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
