import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import apiClient from "./apiClient";

import {
  DeleteDiscussionRequest,
  DeleteDiscussionResponse,
  EditCommentRequest,
  EditCommentResponse,
  GetCommunitiesRequest,
  GetCommunitiesResponse,
  GetCommunityPageRequest,
  GetCommunityPageResponse,
  GetDiscussionRequest,
  GetDiscussionResponse,
  PostCommentRequest,
  PostCommentResponse,
  PostDiscussionRequest,
  PostDiscussionResponse,
} from "../types/apis/communityServiceApi";

const queryClient = new QueryClient();

export const useGetCommunitiesQuery = ({
  search = "",
  bookIds = [],
}: GetCommunitiesRequest) => {
  return useQuery<GetCommunitiesResponse, Error>({
    queryKey: ["Community", search, ...bookIds],
    queryFn: () => {
      const url = new URL("community");

      const params = new URLSearchParams();

      if (search) {
        params.append("search", search);
      }

      for (const bookId of bookIds) {
        params.append("book", bookId.toString());
      }

      url.search = params.toString();

      return apiClient.get(url.toString());
    },
  });
};

export const useGetCommunityPageQuery = ({
  bookId,
  search,
  page,
  size,
}: GetCommunityPageRequest) => {
  return useQuery<GetCommunityPageResponse, Error>({
    queryKey: ["Community", bookId, search, page],
    queryFn: () => {
      const url = new URL("community");

      const params = new URLSearchParams();

      if (search) {
        params.append("search", search);
      }

      if (page) {
        params.append("page", page.toString());
      }

      if (size) {
        params.append("size", size.toString());
      }

      url.search = params.toString();

      return apiClient.get(url.toString());
    },
  });
};

export const useGetDiscussionQuery = ({
  bookId,
  discussionId,
  search,
  page,
  size,
}: GetDiscussionRequest) => {
  return useQuery<GetDiscussionResponse, Error>({
    queryKey: ["Discussion", bookId, discussionId, search, page],
    queryFn: () => {
      const url = new URL("community");

      const params = new URLSearchParams();

      if (search) {
        params.append("search", search);
      }

      if (page) {
        params.append("page", page.toString());
      }

      if (size) {
        params.append("size", size.toString());
      }

      url.search = params.toString();

      return apiClient.get(url.toString());
    },
  });
};

export const usePostDiscussionMutation = ({
  bookId,
  ...discussionDto
}: PostDiscussionRequest) => {
  return useMutation<PostDiscussionResponse, Error>({
    mutationFn: () => apiClient.post(`community/${bookId}`, discussionDto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Community", bookId] });
    },
  });
};

export const useDeleteDiscussionMutation = ({
  bookId,
  discussionId,
}: DeleteDiscussionRequest) => {
  return useMutation<DeleteDiscussionResponse, Error>({
    mutationFn: () =>
      apiClient.post(`community/${bookId}?discussionid=${discussionId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Community", bookId] });
    },
  });
};

export const usePostCommentMutation = ({
  bookId,
  discussionId,
  ...commentDto
}: PostCommentRequest) => {
  return useMutation<PostCommentResponse, Error>({
    mutationFn: () =>
      apiClient.post(`community/${bookId}/${discussionId}`, commentDto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Discussion", bookId, discussionId],
      });
    },
  });
};

export const useEditCommentMutation = ({
  bookId,
  discussionId,
  ...commentDto
}: EditCommentRequest) => {
  return useMutation<EditCommentResponse, Error>({
    mutationFn: () =>
      apiClient.post(`community/${bookId}/${discussionId}`, commentDto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Discussion", bookId, discussionId],
      });
    },
  });
};
