import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import apiClient from "./apiClient";

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
} from "../types/apis/reviewServiceApi";

const queryClient = new QueryClient();

export const useGetReviewsQuery = (
  {
    bookId,
    search = "",
    page = 0,
    size = 10,
    sort = "popular",
    rating,
  }: GetReviewsRequest,
  { enabled }: { enabled: boolean },
) => {
  return useQuery<GetReviewsResponse, Error>({
    queryKey: ["Review", bookId, search, page, size, sort, rating],
    queryFn: () =>
      apiClient.get(
        `review/${bookId}?search=${search}&page=${page}&size=${size}&sort=${sort}${
          rating ? `&rating=${rating}` : ""
        }`,
      ),
    enabled,
  });
};

export const useGetReviewsAuthenticatedQuery = (
  {
    bookId,
    search = "",
    page = 0,
    size = 10,
    sort = "popular",
    rating,
  }: GetReviewsAuthenticatedRequest,
  { enabled }: { enabled: boolean },
) => {
  return useQuery<GetReviewsAuthenticatedResponse, Error>({
    queryKey: ["Review", bookId, search, page, size, sort, rating],
    queryFn: () =>
      apiClient.get(
        `review/${bookId}?search=${search}&page=${page}&size=${size}&sort=${sort}${
          rating ? `&rating=${rating}` : ""
        }`,
      ),
    enabled,
  });
};

export const useGetUserReviewQuery = (
  { bookId, userId }: GetUserReviewRequest,
  { enabled }: { enabled: boolean },
) => {
  return useQuery<GetUserReviewResponse, Error>({
    queryKey: ["Review", bookId, userId],
    queryFn: () => apiClient.get(`review/${bookId}/${userId}`),
    enabled,
  });
};

export const useGetStarCountsQuery = (
  bookId: GetStarCountsRequest,
  { enabled }: { enabled: boolean },
) => {
  return useQuery<GetStarCountsResponse, Error>({
    queryKey: ["Review", bookId, "StarCounts"],
    queryFn: () => apiClient.get(`review/${bookId}/starcounts`),
    enabled,
  });
};

export const usePostReviewMutation = () => {
  return useMutation<PostReviewResponse, Error, PostReviewRequest>({
    mutationFn: ({ bookId, ...reviewDto }) =>
      apiClient.post(`review/${bookId}`, reviewDto),
    onSuccess: (_, { bookId }) => {
      queryClient.invalidateQueries({ queryKey: ["Review", bookId] });
      queryClient.invalidateQueries({ queryKey: ["Book", bookId] });
    },
  });
};

export const useUpdateReviewMutation = () => {
  return useMutation<UpdateReviewResponse, Error, UpdateReviewRequest>({
    mutationFn: ({ bookId, ...reviewDto }) =>
      apiClient.put(`review/${bookId}`, reviewDto),
    onSuccess: (_, { bookId }) => {
      queryClient.invalidateQueries({ queryKey: ["Review", bookId] });
      queryClient.invalidateQueries({ queryKey: ["Book", bookId] });
    },
  });
};

export const useDeleteReviewMutation = () => {
  return useMutation<DeleteReviewResponse, Error, DeleteReviewRequest>({
    mutationFn: (bookId) => apiClient.delete(`review/${bookId}`),
    onSuccess: (_, bookId) => {
      queryClient.invalidateQueries({ queryKey: ["Review", bookId] });
      queryClient.invalidateQueries({ queryKey: ["Book", bookId] });
    },
  });
};

export const useAddReviewVoteMutation = () => {
  return useMutation<AddReviewVoteResponse, Error, AddReviewVoteRequest>({
    mutationFn: ({ bookId, reviewId, ...reviewVoteDto }) =>
      apiClient.post(`review/${bookId}/${reviewId}/vote`, reviewVoteDto),
  });
};

export const useChangeReviewVoteMutation = () => {
  return useMutation<ChangeReviewVoteResponse, Error, ChangeReviewVoteRequest>({
    mutationFn: ({ bookId, reviewId, ...reviewVoteDto }) =>
      apiClient.put(`review/${bookId}/${reviewId}/vote`, reviewVoteDto),
  });
};

export const useDeleteReviewVoteMutation = () => {
  return useMutation<DeleteReviewVoteResponse, Error, DeleteReviewVoteRequest>({
    mutationFn: ({ bookId, reviewId, userId }) =>
      apiClient.delete(`review/${bookId}/${reviewId}/vote?userid=${userId}`),
  });
};
