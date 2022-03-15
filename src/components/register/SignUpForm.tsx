import React, { ChangeEvent } from "react";
import { RegisterFormProps } from "./@types";
import { Formik, Form, Field } from "formik";
import { object, string } from "yup";
import { ValidatedFormField } from "../../components/shared/ValidatedFormField";

export const SignUpForm = ({
  formInputState,
  setFormInputState,
  formSubmit,
  setFormState,
}: RegisterFormProps) => {
  const SignUpFormSchema = object().shape({
    email: string().email("Invalid email address format").required("Required"),
    password: string()
      .min(8, "Password must be 8 characters at least")
      .required("Required"),
  });

  const onChangeStateUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInputState({ ...formInputState, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div>
        <h1>Sign Up</h1>
        <Formik
          enableReinitialize
          initialValues={{
            email: "",
            username: "",
            password: "",
            status: "idle",
          }}
          validationSchema={SignUpFormSchema}
          onSubmit={async (values, { setSubmitting }) => {
            formSubmit();
            setSubmitting(false);
          }}
        >
          {({ handleChange }) => {
            return (
              <Form style={{ maxWidth: "500px" }}>
                <div>
                  <ValidatedFormField
                    type="email"
                    id="email"
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
                    id="password"
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
                    Sign Up
                  </button>
                  <button
                    onClick={() => setFormState("signIn")}
                    type="button"
                    className="mt-4"
                  >
                    Wait, go back
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
