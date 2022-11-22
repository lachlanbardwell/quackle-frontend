import { createContext } from "react";
import { IUserContext } from "../types/user-context";
import { IUser } from "../types/user-types";

export const initialUserData: IUser = {
  id: "",
  displayPic: "",
  name: "",
  username: "",
  email: "",
  dateOfBirth: new Date(),
  createdAt: new Date(),
  tagline: "",
  quacks: [],
  reQuacks: 0,
  friends: [],
  usersBlocked: [],
};

export const QuackleContext = createContext<IUserContext>({
  userData: initialUserData,
  setUserData: () => initialUserData,
  setUserInfo: () => null,
  initiateQuack: false,
  setInitiateQuack: () => null,
});
