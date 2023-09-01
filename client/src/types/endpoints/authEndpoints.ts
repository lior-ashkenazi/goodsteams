export type RegisterUserRequest = {
  username: string;
  email: string;
  password: string;
};
export type RegisterUserResponse = {
  message: string;
  token: string;
};

export type LoginUserRequest = { username: string; password: string };
export type LoginUserResponse = {
  message: string;
  token: string;
};

export type AuthUserRequest = void;
export type AuthUserResponse = {
  message: string;
  token: string;
};

export type LogoutUserRequest = void;
export type LogoutUserResponse = { message: string };
