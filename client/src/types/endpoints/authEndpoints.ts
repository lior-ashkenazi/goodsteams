export type RegisterUserRequest = {
  username: string;
  email: string;
  password: string;
};
export type RegisterUserResponse = {
  token: string;
};

export type LoginUserRequest = { username: string; password: string };
export type LoginUserResponse = {
  token: string;
};

export type LogoutUserRequest = void;
export type LogoutUserResponse = { message: string };
