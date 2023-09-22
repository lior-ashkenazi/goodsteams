import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { authServiceEndpoints } from "../apis/endpoints/authServiceEndpoints";
import { profileServiceEndpoints } from "../apis/endpoints/profileServiceEndpoints";

type ProfileState = {
  userId: number | null;
  username: string | null;
  avatarUrl: string | null;
};

const initialState: ProfileState = {
  userId: null,
  username: null,
  avatarUrl: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (
      state,
      action: PayloadAction<{
        userId: number;
        username: string;
        avatarUrl: string;
      }>,
    ) => {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.avatarUrl = action.payload.avatarUrl;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        profileServiceEndpoints.endpoints.getProfileSecure.matchFulfilled,
        (state, action) => {
          state.userId = action.payload.userId;
          state.username = action.payload.username;
          state.avatarUrl = action.payload.avatarUrl;
        },
      )
      .addMatcher(
        profileServiceEndpoints.endpoints.updateProfile.matchFulfilled,
        (state, action) => {
          state.avatarUrl = action.payload.avatarUrl;
        },
      )
      .addMatcher(
        authServiceEndpoints.endpoints.logoutUser.matchFulfilled,
        (state) => {
          state.userId = null;
          state.username = null;
          state.avatarUrl = null;
        },
      );
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
