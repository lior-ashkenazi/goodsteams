import { apiSlice } from "../apiSlice";
import {
  GetProfileSecureRequest,
  GetProfileSecureResponse,
  GetProfilePublicRequest,
  GetProfilePublicResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from "../../../types/endpoints/profileServiceEndpoints";

export const profileServiceEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfileSecure: builder.query<
      GetProfileSecureResponse,
      GetProfileSecureRequest
    >({
      query: () => "profile/secure",
      providesTags: ["Profile"],
    }),
    getProfilePublic: builder.query<
      GetProfilePublicResponse,
      GetProfilePublicRequest
    >({
      query: (userId) => `profile/public/${userId}`,
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
