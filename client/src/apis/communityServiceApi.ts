import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import apiClient from "./apiClient";

import {
  DeleteCommentRequest,
  DeleteCommentResponse,
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

const DUMMY_BASE_URL = "https://dummy";

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

export const useGetCommunityQuery = ({
  bookId,
  search = "",
  page = 0,
  size = 15,
}: GetCommunityPageRequest) => {
  return useQuery<GetCommunityPageResponse, Error>({
    queryKey: ["Community", bookId, search, page, size],
    queryFn: () => {
      const url = new URL(`community/${bookId}`, DUMMY_BASE_URL);

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

      const pathWithQuery = `${url.pathname}${url.search}`;

      return apiClient.get(pathWithQuery);
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

export const usePostDiscussionMutation = () => {
  return useMutation<PostDiscussionResponse, Error, PostDiscussionRequest>({
    mutationFn: ({ bookId, ...discussionDto }) =>
      apiClient.post(`community/${bookId}`, discussionDto),
    onSuccess: (_, { bookId }) => {
      queryClient.invalidateQueries({
        queryKey: ["Community", bookId],
      });
    },
  });
};

export const useDeleteDiscussionMutation = () => {
  return useMutation<DeleteDiscussionResponse, Error, DeleteDiscussionRequest>({
    mutationFn: ({ bookId, discussionId }) =>
      apiClient.post(`community/${bookId}?discussionid=${discussionId}`),
    onSuccess: (_, { bookId }) => {
      queryClient.invalidateQueries({ queryKey: ["Community", bookId] });
    },
  });
};

export const usePostCommentMutation = () => {
  return useMutation<PostCommentResponse, Error, PostCommentRequest>({
    mutationFn: ({ bookId, discussionId, ...commentDto }) =>
      apiClient.post(`community/${bookId}/${discussionId}`, commentDto),
    onSuccess: (_, { bookId, discussionId }) => {
      queryClient.invalidateQueries({
        queryKey: ["Discussion", bookId, discussionId],
      });
    },
  });
};

export const useEditCommentMutation = () => {
  return useMutation<EditCommentResponse, Error, EditCommentRequest>({
    mutationFn: ({ bookId, discussionId, commentId, ...commentDto }) =>
      apiClient.post(
        `community/${bookId}/${discussionId}?commentid=${commentId}`,
        commentDto,
      ),
    onSuccess: (_, { bookId, discussionId }) => {
      queryClient.invalidateQueries({
        queryKey: ["Discussion", bookId, discussionId],
      });
    },
  });
};

export const useDeleteCommentMutation = () => {
  return useMutation<DeleteCommentResponse, Error, DeleteCommentRequest>({
    mutationFn: ({ bookId, discussionId, commentId }) =>
      apiClient.post(
        `community/${bookId}/${discussionId}?commentid=${commentId}`,
      ),
    onSuccess: (_, { bookId, discussionId }) => {
      queryClient.invalidateQueries({
        queryKey: ["Discussion", bookId, discussionId],
      });
    },
  });
};
