import { createContext } from "react";
import { IUserContext } from "../types/user-context";
import { IUser } from "../types/user-types";

export const initialUserData: IUser = {
  id: "",
  avatar: undefined,
  name: "",
  username: "",
  email: "",
  dateOfBirth: new Date("1989-09-13"),
  createdAt: new Date(),
  tagline: "",
  banner: undefined,
  location: "",
  quacks: 0,
  reQuacks: 0,
  likedQuacks: [],
  following: [],
  followers: [],
  usersBlocked: [],
};

export const QuackleContext = createContext<IUserContext>({
  userData: initialUserData,
  setUserData: () => initialUserData,
  setUserInfo: () => null,
  initiateQuack: false,
  setInitiateQuack: () => null,
  followUser: () => null,
  unFollowUser: () => null,
  deleteQuack: () => null,
  likeQuack: () => null,
});
