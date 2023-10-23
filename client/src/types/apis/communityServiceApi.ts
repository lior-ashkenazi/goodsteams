import { AxiosResponse } from "axios";

import { Community } from "../models/community/Community";
import { Discussion } from "../models/community/Discussion";
import { Page } from "../models/misc/Page";

export type GetCommunitiesRequest = {
  search?: string;
  bookIds?: number[];
};
export type GetCommunitiesResponse = AxiosResponse<Community[]>;

export type GetCommunityPageRequest = {
  bookId: number;
  search?: string;
  page?: number;
  size?: number;
};
export type GetCommunityPageResponse = AxiosResponse<Page<Discussion>>;

export type GetDiscussionRequest = {
  bookId: number;
  discussionId: number;
  search?: string;
  page?: number;
  size?: number;
};
export type GetDiscussionResponse = AxiosResponse<Page<Comment>>;

export type PostDiscussionRequest = {
  bookId: string;
  title: string;
  userId: number;
  content: string;
};
export type PostDiscussionResponse = AxiosResponse<Discussion>;

export type DeleteDiscussionRequest = {
  bookId: number;
  discussionId: number;
};
export type DeleteDiscussionResponse = AxiosResponse<Discussion>;

export type PostCommentRequest = {
  bookId: number;
  discussionId: number;
  userId: string;
  content: string;
};
export type PostCommentResponse = AxiosResponse<Comment>;

export type EditCommentRequest = {
  bookId: number;
  discussionId: number;
  commentId: number;
  userId: number;
  content: string;
};
export type EditCommentResponse = AxiosResponse<Comment>;

export type DeleteCommentRequest = {
  bookId: number;
  discussionId: number;
  commentId: number;
};
export type DeleteCommentResponse = AxiosResponse<Comment>;
