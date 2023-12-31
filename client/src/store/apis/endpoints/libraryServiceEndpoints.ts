import { reduxApiSlice } from "../reduxApiSlice";

import {
  GetLibraryRequest,
  GetLibraryResponse,
} from "../../../types/apis/libraryServiceEndpoints";

export const libraryServiceEndpoints = reduxApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLibrary: builder.query<GetLibraryResponse, GetLibraryRequest>({
      query: () => `library/`,
      providesTags: ["Library"],
    }),
  }),
});
