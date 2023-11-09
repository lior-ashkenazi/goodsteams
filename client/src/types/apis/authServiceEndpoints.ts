import { User } from "../models/auth/User";

export type RegisterUserRequest = {
  username: string;
  password: string;
};
export type RegisterUserResponse = {
  user: User;
  token: string;
};

export type LoginUserRequest = { username: string; password: string };
export type LoginUserResponse = {
  user: User;
  token: string;
};

export type AuthUserRequest = void;
export type AuthUserResponse = {
  user: User;
  token: string;
};

export type LogoutUserRequest = void;
export type LogoutUserResponse = { message: string };
