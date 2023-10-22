import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../index";

export const reduxApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api`,
    prepareHeaders: (headers, { getState }) => {
      const token: string | null = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Profile", "Book", "Cart", "Library", "Wishlist", "Review"],
  endpoints: () => ({}),
});
