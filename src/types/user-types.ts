import { Dispatch, SetStateAction } from "react";
export interface IUser {
  name: string;
  username: string;
  password: string;
  email: string;
  quacks: number;
  reQuacks: number;
  userFriends: IUser[];
  userBlocked: IUser[];
}
export interface IUserState {
  userData: IUser;
  setUserData: Dispatch<SetStateAction<IUser>>;
}