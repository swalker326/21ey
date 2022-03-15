import React, { ChangeEvent } from "react";
import { RegisterFormProps } from "./@types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";
import { ValidatedFormField } from "../../components/shared/ValidatedFormField";

export const SignInForm = ({
  setFormInputState,
  formSubmit,
  formInputState,
  setFormState
}: RegisterFormProps) => {
  const SignUpFormSchema = object().shape({
    email: string().email("Invalid email address format").required("Required"),
    password: string().required("Required"),
  });
  const onChangeStateUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInputState({ ...formInputState, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div>
        <h1>Sign In</h1>
        <Formik
          enableReinitialize
          initialValues={{
            email: "",
            password: "",
            status: "idle",
          }}
          validationSchema={SignUpFormSchema}
          onSubmit={async (values, { setSubmitting }) => {
            formSubmit();
            setSubmitting(false);
          }}
        >
          {({ handleChange, touched, errors }) => {
            return (
              <Form style={{ maxWidth: "500px" }}>
                <div>
                  <ValidatedFormField
                    label="email"
                    name="email"
                    value={formInputState.email}
                    placeholder="Enter email"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(event);
                      onChangeStateUpdate(event);
                    }}
                    style={{ margin: "6px 0", width: "100%" }}
                  />

                  <ValidatedFormField
                    label=""
                    type="password"
                    name="password"
                    value={formInputState.password}
                    placeholder="Enter password"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(event);
                      onChangeStateUpdate(event);
                    }}
                    style={{ margin: "6px 0", width: "100%" }}
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <button type="submit" className="mt-4">
                    Sign In
                  </button>
                  <button
                    onClick={() => setFormState("signUp")}
                    type="button"
                    className="mt-4"
                  >
                    Create Account
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
