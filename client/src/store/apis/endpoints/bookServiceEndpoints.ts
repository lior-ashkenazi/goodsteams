import { apiSlice } from "../apiSlice";
import {
  GetBookByIdRequest,
  GetBookByIdResponse,
  GetBooksByGenreRequest,
  GetBooksByGenreResponse,
  GetBooksByTitleRequest,
  GetBooksByTitleResponse,
} from "../../../types/endpoints/bookServiceEndpoints";

export const profileServiceEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookById: builder.query<GetBookByIdResponse, GetBookByIdRequest>({
      query: (id) => `book/${id}`,
    }),
    getBooksByTitle: builder.query<
      GetBooksByTitleResponse,
      GetBooksByTitleRequest
    >({
      query: ({ title, page = 0, size = 10, sort = "title,asc" }) => {
        return `book/search?title=${title}&page=${page}&size=${size}&sort=${sort}`;
      },
    }),
    getBooksByGenre: builder.query<
      GetBooksByGenreResponse,
      GetBooksByGenreRequest
    >({
      query: (genreName, page = 0, size = 10) =>
        `book/genre/${genreName}?page=${page}&size=${size}`,
    }),
  }),
});
