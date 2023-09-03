import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authServiceEndpoints } from "../apis/endpoints/authServiceEndpoints";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem("goodsteams-jwt"),
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    removeToken: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authServiceEndpoints.endpoints.registerUser.matchFulfilled,
        (state, action) => {
          const token = action.payload.token;
          state.token = token;
          state.isAuthenticated = true;
          localStorage.setItem("goodsteams-jwt", token);
        },
      )
      .addMatcher(
        authServiceEndpoints.endpoints.loginUser.matchFulfilled,
        (state, action) => {
          const token = action.payload.token;
          state.token = token;
          state.isAuthenticated = true;
          localStorage.setItem("goodsteams-jwt", token);
        },
      )
      .addMatcher(
        authServiceEndpoints.endpoints.authUser.matchFulfilled,
        (state) => {
          state.isAuthenticated = true;
        },
      )
      .addMatcher(
        authServiceEndpoints.endpoints.logoutUser.matchFulfilled,
        (state) => {
          state.token = null;
          state.isAuthenticated = false;
          localStorage.removeItem("goodsteams-jwt");
        },
      );
  },
});

export const { setToken, removeToken } = authSlice.actions;

export default authSlice.reducer;
