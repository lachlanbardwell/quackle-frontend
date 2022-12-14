import React, { useContext } from "react";
import { Alert, Group, TextInput } from "@mantine/core";
import { QuackleContext } from "../../context/user-context";
import { ISignUp } from "../../types/signup-types";
import "./signup-form.css";

export const SignUpForm: React.FC<ISignUp> = (props) => {
  const { userData, setUserInfo } = useContext(QuackleContext);

  return (
    <form className="signup-form">
      <TextInput
        label="Name"
        placeholder="Name"
        onChange={(e) => setUserInfo(e, "name")}
        value={userData.name}
        withAsterisk
        error={props.error.noName && "Enter your name"}
      />
      <TextInput
        label="Username"
        placeholder="Username"
        onChange={(e) => setUserInfo(e, "username")}
        value={userData.username}
        withAsterisk
        error={props.error.noUser && "Choose a username"}
      />
      <Group>
        <TextInput
          label="Enter Password"
          autoComplete="off"
          type="password"
          placeholder="Minimum 7 characters"
          onChange={(e) => props.handleConfirm(e, "pass")}
          value={props.pass}
          withAsterisk
          error={props.error.noPass && "Password must be at least 7 characters"}
        />
        <TextInput
          label="Confirm Password"
          autoComplete="off"
          type="password"
          placeholder="Minimum 7 characters"
          onChange={(e) => props.handleConfirm(e, "confirm")}
          value={props.confirmPass}
          withAsterisk
          error={props.error.noMatch && "Must match password"}
        />
      </Group>
      <TextInput
        label="Date of birth"
        type="date"
        placeholder="D.O.B."
        onChange={(e) => setUserInfo(e, "dateOfBirth")}
        value={userData.dateOfBirth.toISOString().slice(0, 10)}
        withAsterisk
      />
      <TextInput
        label="Email Address"
        type="email"
        placeholder="Email"
        onChange={(e) => setUserInfo(e, "email")}
        value={userData.email}
        withAsterisk
        error={props.error.noEmail && "Enter a valid email address"}
      />
      {props.error.usernameDup && (
        <Alert color="red">Username is already registered.</Alert>
      )}
      {props.error.network && <Alert color="red">Network Error</Alert>}
    </form>
  );
};
