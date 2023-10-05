import { apiSlice } from "../apiSlice";
import {
  GetReviewsRequest,
  GetReviewsResponse,
  GetReviewsAuthenticatedRequest,
  GetReviewsAuthenticatedResponse,
  GetUserReviewResponse,
  GetUserReviewRequest,
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
      query: ({
        bookId,
        search = "",
        page = 0,
        size = 10,
        sort = "popular",
        rating,
      }) =>
        `review/${bookId}?search=${search}&page=${page}&size=${size}&sort=${sort}${
          rating ? `&rating=${rating}` : ""
        }`,
      providesTags: ["Review"],
    }),
    getReviewsAuthenticated: builder.query<
      GetReviewsAuthenticatedResponse,
      GetReviewsAuthenticatedRequest
    >({
      query: ({
        bookId,
        search = "",
        page = 0,
        size = 10,
        sort = "popular",
        rating,
      }) =>
        `review/${bookId}?search=${search}&page=${page}&size=${size}&sort=${sort}${
          rating ? `&rating=${rating}` : ""
        }`,
      providesTags: ["Review"],
    }),
    getUserReview: builder.query<GetUserReviewResponse, GetUserReviewRequest>({
      query: ({ bookId, userId }) => `review/${bookId}/${userId}`,
      providesTags: ["Review"],
    }),
    getStarCounts: builder.query<GetStarCountsResponse, GetStarCountsRequest>({
      query: (bookId) => `review/${bookId}/starcounts`,
      providesTags: ["Review"],
    }),
    postReview: builder.mutation<PostReviewResponse, PostReviewRequest>({
      query: ({ bookId, ...reviewDTO }) => ({
        url: `review/${bookId}`,
        method: "POST",
        body: reviewDTO,
      }),
      invalidatesTags: (_result, _error, { bookId }) => [
        "Review",
        { type: "Book", id: bookId },
      ],
    }),
    updateReview: builder.mutation<UpdateReviewResponse, UpdateReviewRequest>({
      query: ({ bookId, ...reviewDTO }) => ({
        url: `review/${bookId}`,
        method: "PUT",
        body: reviewDTO,
      }),
      invalidatesTags: (_result, _error, { bookId }) => [
        "Review",
        { type: "Book", id: bookId },
      ],
    }),
    deleteReview: builder.mutation<DeleteReviewResponse, DeleteReviewRequest>({
      query: (bookId) => ({
        url: `review/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, bookId) => [
        "Review",
        { type: "Book", id: bookId },
      ],
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
