import React, { SetStateAction, useContext } from "react";
import { TextInput } from "@mantine/core";
import { QuackleContext } from "../../context/user-context";
import "./login-form.css";

interface ILoginForm {
  setPass: React.Dispatch<SetStateAction<string>>;
  pass: string;
  noUser: boolean;
  noPass: boolean;
}

export const LoginForm: React.FC<ILoginForm> = (props) => {
  const { userData, setUserInfo } = useContext(QuackleContext);

  return (
    <form className="login-form">
      <TextInput
        label="Username"
        placeholder="Username"
        onChange={(e) => setUserInfo(e, "username")}
        value={userData.username}
        error={props.noUser && "Enter username"}
      />
      <TextInput
        label="Password"
        placeholder="Password"
        autoComplete="off"
        onChange={(e) => props.setPass(e.target.value)}
        type="password"
        value={props.pass}
        error={props.noPass && "Enter password"}
      />
    </form>
  );
};
