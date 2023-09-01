import { apiSlice } from "../apiSlice";
import {
  RegisterUserRequest,
  RegisterUserResponse,
  LoginUserRequest,
  LoginUserResponse,
  AuthUserRequest,
  AuthUserResponse,
  LogoutUserRequest,
  LogoutUserResponse,
} from "../../../types/endpoints/authEndpoints";

export const authEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<RegisterUserResponse, RegisterUserRequest>({
      query: (userCredentials) => ({
        url: "auth",
        method: "POST",
        body: userCredentials,
      }),
    }),
    loginUser: builder.mutation<LoginUserResponse, LoginUserRequest>({
      query: (userCredentials) => ({
        url: "auth/login",
        method: "POST",
        body: userCredentials,
      }),
    }),
    authUser: builder.query<AuthUserResponse, AuthUserRequest>({
      query: () => "auth/",
    }),
    logoutUser: builder.mutation<LogoutUserResponse, LogoutUserRequest>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
  }),
});
