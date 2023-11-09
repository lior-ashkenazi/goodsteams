import { reduxApiSlice } from "../reduxApiSlice";
import {
  RegisterUserRequest,
  RegisterUserResponse,
  LoginUserRequest,
  LoginUserResponse,
  AuthUserRequest,
  AuthUserResponse,
  LogoutUserRequest,
  LogoutUserResponse,
} from "../../../types/apis/authServiceEndpoints";

export const authServiceEndpoints = reduxApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<RegisterUserResponse, RegisterUserRequest>({
      query: (userCredentials) => ({
        url: "auth/register",
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
