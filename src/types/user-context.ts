import { IFollowerData, IFollowingData } from "./follow-types";
import { IUser } from "./user-types";

export interface IReplyData {
  quackId: string;
  username: string;
}
export interface IUserContext {
  userData: IUser;
  setUserData: React.Dispatch<React.SetStateAction<IUser>>;
  setUserInfo: (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => void;
  initiateQuack: boolean;
  setInitiateQuack: React.Dispatch<React.SetStateAction<boolean>>;
  followUser: (
    followingData: IFollowingData,
    followerData: IFollowerData,
  ) => void;
  unFollowUser: (followingUser: string) => void;
  deleteQuack: (quackId: string) => void;
  likeQuack: (username: string, quackId: string, likesUsers: string[]) => void;
  loggedIn?: string;
  reqLoad: boolean;
  replyToQuack: (quackId: string, username: string) => void;
  replyData: IReplyData;
  setReplyData: React.Dispatch<React.SetStateAction<IReplyData>>;
}
