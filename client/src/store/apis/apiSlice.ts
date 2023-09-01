import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../index";

const BASE_URL: string = import.meta.env.VITE_BASE_URL as string;

export const apiSlice = createApi({
  reducerPath: "api",
  //   tagTypes: ["Users", "Messages", "Chats", "Profile"],
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
  endpoints: () => ({}),
});
