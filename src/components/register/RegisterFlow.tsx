import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { SignUpForm } from "./SignUpForm";
import { ConfirmSignUpForm } from "./ConfirmSignUpForm";
import { SignInForm } from "./SignInForm";
import { FormInputState } from "./@types";
import styled from "styled-components";
import { CognitoUserAmplify } from "@aws-amplify/ui";

const initialFormValues: FormInputState = {
  password: "",
  email: "",
  verificationCode: "",
};

type FormState = "signedIn" | "signIn" | "confirmSignUp" | "signUp";

export const RegisterFlow: React.FC = ({ children }) => {
  useEffect(() => {
    Auth.currentAuthenticatedUser().then((user: CognitoUserAmplify) => {
      if (user.username) {
        setFormState("signedIn");
        setUser(user);
      } else {
        setUser(null);
        setFormState("signIn");
      }
    });
  }, []);
  const [formState, setFormState] = useState<FormState>("signIn");
  const [user, setUser] = useState<CognitoUserAmplify | null>(null);
  const [formInputState, setFormInputState] =
    useState<FormInputState>(initialFormValues);
  const [formErrors, setFormErrors] = useState([]);

  const signup = async () => {
    try {
      await Auth.signUp({
        username: formInputState.email,
        password: formInputState.password,
        attributes: {
          email: formInputState.email,
        },
      });
      setFormInputState({ ...formInputState });
      setFormState("confirmSignUp");
    } catch (err) {
      console.error(`Error siging up: ${{ err }}`);
    }
  };
  const confirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(
        formInputState.email,
        formInputState.verificationCode,
      );
      setFormInputState(initialFormValues);
      setFormState("signIn");
    } catch (err) {
      console.error(`Error confirming sign up: ${{ err }}`);
    }
  };

  const signin = async () => {
    Auth.signIn({
      username: formInputState.email,
      password: formInputState.password,
    }).then(() => {
      setFormState("signedIn");
    });
  };
  const signout = async () => {
    Auth.signOut().then(() => setFormState("signIn"));
  };
  const formStateComponents = {
    signUp: (
      <SignUpForm
        formInputState={formInputState}
        setFormInputState={setFormInputState}
        formSubmit={signup}
      />
    ),
    signIn: (
      <SignInForm
        formInputState={formInputState}
        setFormInputState={setFormInputState}
        formSubmit={signin}
      />
    ),
    confirmSignUp: (
      <ConfirmSignUpForm
        formInputState={formInputState}
        setFormInputState={setFormInputState}
        formSubmit={confirmSignUp}
      />
    ),
    signedIn: (
      <div>
        <h3>
          Hello, <span>{user?.attributes.email}</span>
        </h3>
        <button onClick={signout}>Sign Out</button>
        <div className="register-children">{children}</div>
      </div>
    ),
  };

  return (
    <div className="mt-4">
      <ErrorContaier
        sm={8}
        className={`error-container ${formErrors.length > 0 ? "show" : null}`}
      >
        {formErrors.map((error: string, index) => (
          <ErrorMessage key={`error_${index}`}>{error}</ErrorMessage>
        ))}
      </ErrorContaier>
      {formStateComponents[formState]}
    </div>
  );
};

const ErrorContaier = styled.div`
  display: none;
  justify-content: flex-start;
  &.show {
    display: flex;
  }
`;
const ErrorMessage = styled.div`
  color: #ff000090;
  max-width: 500px;
  padding: 8px;
  margin-bottom: 1rem;
  border-radius: 4px;
  font-weight: 600;
  border: 1px solid red;
  background-color: #ff000030;
`;
