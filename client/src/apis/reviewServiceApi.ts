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

export const usePostReviewMutation = ({
  bookId,
  ...reviewDto
}: PostReviewRequest) => {
  return useMutation<PostReviewResponse, Error>({
    mutationFn: () => apiClient.post(`review/${bookId}`, reviewDto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Review", bookId] });
      queryClient.invalidateQueries({ queryKey: ["Book", bookId] });
    },
  });
};

export const useUpdateReviewMutation = ({
  bookId,
  ...reviewDto
}: UpdateReviewRequest) => {
  return useMutation<UpdateReviewResponse, Error>({
    mutationFn: () => apiClient.put(`review/${bookId}`, reviewDto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Review", bookId] });
      queryClient.invalidateQueries({ queryKey: ["Book", bookId] });
    },
  });
};

export const useDeleteReviewMutation = (bookId: DeleteReviewRequest) => {
  return useMutation<DeleteReviewResponse, Error>({
    mutationFn: () => apiClient.delete(`review/${bookId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Review", bookId] });
      queryClient.invalidateQueries({ queryKey: ["Book", bookId] });
    },
  });
};

export const useAddReviewVoteMutation = ({
  bookId,
  reviewId,
  ...reviewVoteDTO
}: AddReviewVoteRequest) => {
  return useMutation<AddReviewVoteResponse, Error>({
    mutationFn: () =>
      apiClient.post(`review/${bookId}/${reviewId}/vote`, reviewVoteDTO),
  });
};

export const useChangeReviewVoteMutation = ({
  bookId,
  reviewId,
  ...reviewVoteDTO
}: ChangeReviewVoteRequest) => {
  return useMutation<ChangeReviewVoteResponse, Error>({
    mutationFn: () =>
      apiClient.put(`review/${bookId}/${reviewId}/vote`, reviewVoteDTO),
  });
};

export const useDeleteReviewVoteMutation = ({
  bookId,
  reviewId,
  userId,
}: DeleteReviewVoteRequest) => {
  return useMutation<DeleteReviewVoteResponse, Error>({
    mutationFn: () =>
      apiClient.delete(`review/${bookId}/${reviewId}/vote?userid=${userId}`),
  });
};
