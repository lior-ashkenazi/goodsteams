import { apiSlice } from "../apiSlice";
import {
  GetBookByIdRequest,
  GetBookByIdResponse,
  GetBooksByGenreRequest,
  GetBooksByGenreResponse,
  GetBooksByTermRequest,
  GetBooksByTermResponse as GetBooksByTermResponse,
} from "../../../types/endpoints/bookServiceEndpoints";

export const bookServiceEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookById: builder.query<GetBookByIdResponse, GetBookByIdRequest>({
      query: (bookId) => `book/${bookId}`,
      providesTags: (_result, _error, bookId) => [{ type: "Book", id: bookId }],
    }),
    getBooksByTerm: builder.query<
      GetBooksByTermResponse,
      GetBooksByTermRequest
    >({
      query: ({ term, page = 0, size = 10, sort = "title,asc" }) => {
        return `book/search?term=${term}&page=${page}&size=${size}&sort=${sort}`;
      },
    }),
    getBooksByGenre: builder.query<
      GetBooksByGenreResponse,
      GetBooksByGenreRequest
    >({
      query: ({ genreName, page = 0, size = 9 }) =>
        `book/genre/${genreName}?page=${page}&size=${size}`,
    }),
  }),
});
