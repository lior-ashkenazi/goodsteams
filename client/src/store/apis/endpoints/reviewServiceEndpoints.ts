import { apiSlice } from "../apiSlice";
import {
  GetReviewsRequest,
  GetReviewsResponse,
  GetReviewsAuthenticatedRequest,
  GetReviewsAuthenticatedResponse,
  GetStarCountsRequest,
  GetStarCountsResponse,
  PostReviewRequest,
  PostReviewResponse,
  UpdateReviewRequest,
  UpdateReviewResponse,
  DeleteReviewRequest,
  DeleteReviewResponse,
  AddReviewVoteRequest,
  AddReviewVoteResponse,
  ChangeReviewVoteRequest,
  ChangeReviewVoteResponse,
  DeleteReviewVoteRequest,
  DeleteReviewVoteResponse,
} from "../../../types/endpoints/reviewServiceEndpoints";

export const reviewServiceEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query<GetReviewsResponse, GetReviewsRequest>({
      query: ({ bookId, search = "", page = 0, size = 10, sort = "popular" }) =>
        `review/${bookId}?search=${search}&page=${page}&size=${size}&sort=${sort}`,
      providesTags: ["Review"],
    }),
    getReviewsAuthenticated: builder.query<
      GetReviewsAuthenticatedResponse,
      GetReviewsAuthenticatedRequest
    >({
      query: ({ bookId, search = "", page = 0, size = 10, sort = "popular" }) =>
        `review/${bookId}?search=${search}&page=${page}&size=${size}&sort=${sort}`,
      providesTags: ["Review"],
    }),
    getStarCounts: builder.query<GetStarCountsResponse, GetStarCountsRequest>({
      query: (bookId) => `review/${bookId}`,
      providesTags: ["Review"],
    }),
    postReview: builder.mutation<PostReviewResponse, PostReviewRequest>({
      query: ({ bookId, ...reviewDTO }) => ({
        url: `review/${bookId}`,
        method: "POST",
        body: reviewDTO,
      }),
    }),
    updateReview: builder.mutation<UpdateReviewResponse, UpdateReviewRequest>({
      query: ({ bookId, ...reviewDTO }) => ({
        url: `review/${bookId}`,
        method: "PUT",
        body: reviewDTO,
      }),
    }),
    deleteReview: builder.mutation<DeleteReviewResponse, DeleteReviewRequest>({
      query: (bookId) => ({
        url: `review/${bookId}`,
        method: "DELETE",
      }),
    }),
    addReviewVote: builder.mutation<
      AddReviewVoteResponse,
      AddReviewVoteRequest
    >({
      query: ({ bookId, reviewId, ...reviewVoteDTO }) => ({
        url: `review/${bookId}/${reviewId}/vote`,
        method: "POST",
        body: reviewVoteDTO,
      }),
    }),
    changeReviewVote: builder.mutation<
      ChangeReviewVoteResponse,
      ChangeReviewVoteRequest
    >({
      query: ({ bookId, reviewId, ...reviewVoteDTO }) => ({
        url: `review/${bookId}/${reviewId}/vote`,
        method: "PUT",
        body: reviewVoteDTO,
      }),
    }),
    deleteReviewVote: builder.mutation<
      DeleteReviewVoteResponse,
      DeleteReviewVoteRequest
    >({
      query: ({ bookId, reviewId, ...reviewVoteDTO }) => ({
        url: `review/${bookId}/${reviewId}/vote`,
        method: "PUT",
        body: reviewVoteDTO,
      }),
    }),
  }),
});
