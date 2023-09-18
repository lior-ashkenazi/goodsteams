import { apiSlice } from "../apiSlice";

import {
  GetLibraryRequest,
  GetLibraryResponse,
} from "../../../types/endpoints/libraryServiceEndpoints";

export const libraryServiceEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLibrary: builder.query<GetLibraryResponse, GetLibraryRequest>({
      query: () => `library/`,
      providesTags: ["Library"],
    }),
  }),
});
