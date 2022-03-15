import { SetStateAction } from "react";

export type FormState = 'signUp' | 'confirmSignUp' | 'signIn' | 'signedIn'
export type FormInputState = {
  email: string,
  password: string,
  verificationCode: string,
}
export type RegisterFormProps = {
  formInputState: {
    email: string;
    password: string;
    verificationCode: string;
  };
  setFormInputState: Dispatch<
    SetStateAction<FormInputState>
  >;
  setFormState: Dispatch<SetStateAction<FormState>>;
  formSubmit: () => void,
}