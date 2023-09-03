import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { profileServiceEndpoints } from "../apis/endpoints/profileServiceEndpoints";

type ProfileState = {
  username: string | null;
  avatarUrl: string | null;
};

const initialState: ProfileState = {
  username: null,
  avatarUrl: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (
      state,
      action: PayloadAction<{ username: string; avatarUrl: string }>,
    ) => {
      state.username = action.payload.username;
      state.avatarUrl = action.payload.avatarUrl;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        profileServiceEndpoints.endpoints.createProfile.matchFulfilled,
        (state, action) => {
          const username = action.payload.profile.username;
          const avatarUrl = action.payload.profile.avatarUrl;
          state.username = username;
          state.avatarUrl = avatarUrl;
        },
      )
      .addMatcher(
        profileServiceEndpoints.endpoints.getProfile.matchFulfilled,
        (state, action) => {
          const username = action.payload.profile.username;
          const avatarUrl = action.payload.profile.avatarUrl;
          state.username = username;
          state.avatarUrl = avatarUrl;
        },
      )
      .addMatcher(
        profileServiceEndpoints.endpoints.updateProfile.matchFulfilled,
        (state, action) => {
          const username = action.payload.profile.username;
          const avatarUrl = action.payload.profile.avatarUrl;
          state.username = username;
          state.avatarUrl = avatarUrl;
        },
      );
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
