import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { profileServiceEndpoints } from "../apis/endpoints/profileServiceEndpoints";
import { authServiceEndpoints } from "../apis/endpoints/authServiceEndpoints";

type ProfileState = {
  profileId: number | null;
  username: string | null;
  avatarUrl: string | null;
};

const initialState: ProfileState = {
  profileId: null,
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
        profileId: number;
        username: string;
        avatarUrl: string;
      }>,
    ) => {
      state.profileId = action.payload.profileId;
      state.username = action.payload.username;
      state.avatarUrl = action.payload.avatarUrl;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        profileServiceEndpoints.endpoints.createProfile.matchFulfilled,
        (state, action) => {
          state.profileId = action.payload.profile.profileId;
          state.username = action.payload.profile.username;
          state.avatarUrl = action.payload.profile.avatarUrl;
        },
      )
      .addMatcher(
        profileServiceEndpoints.endpoints.getProfile.matchFulfilled,
        (state, action) => {
          state.profileId = action.payload.profile.profileId;
          state.username = action.payload.profile.username;
          state.avatarUrl = action.payload.profile.avatarUrl;
        },
      )
      .addMatcher(
        authServiceEndpoints.endpoints.authUser.matchRejected,
        (state) => {
          state.profileId = null;
          state.username = null;
          state.avatarUrl = null;
        },
      )
      .addMatcher(
        profileServiceEndpoints.endpoints.getProfile.matchRejected,
        (state) => {
          state.profileId = null;
          state.username = null;
          state.avatarUrl = null;
        },
      )
      .addMatcher(
        profileServiceEndpoints.endpoints.updateProfile.matchFulfilled,
        (state, action) => {
          state.avatarUrl = action.payload.profile.avatarUrl;
        },
      );
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
