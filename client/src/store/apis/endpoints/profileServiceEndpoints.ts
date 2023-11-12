import { reduxApiSlice } from "../reduxApiSlice";
import {
  GetProfileSecureRequest,
  GetProfileSecureResponse,
  GetProfilePublicRequest,
  GetProfilePublicResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from "../../../types/apis/profileServiceEndpoints";

export const profileServiceEndpoints = reduxApiSlice.injectEndpoints({
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
        url: "profile/secure",
        method: "PUT",
        body: profile,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});
