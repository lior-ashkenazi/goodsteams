import { apiSlice } from "../apiSlice";
import {
  CreateProfileRequest,
  CreateProfileResponse,
  GetProfileRequest,
  GetProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from "../../../types/endpoints/profileServiceEndpoints";

export const profileServiceEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProfile: builder.mutation<
      CreateProfileResponse,
      CreateProfileRequest
    >({
      query: () => ({
        url: "profile/",
        method: "POST",
      }),
    }),
    getProfile: builder.query<GetProfileResponse, GetProfileRequest>({
      query: () => "profile/",
    }),
    updateProfile: builder.mutation<
      UpdateProfileResponse,
      UpdateProfileRequest
    >({
      query: (profile) => ({
        url: "profile/",
        method: "PUT",
        body: profile,
      }),
    }),
  }),
});
