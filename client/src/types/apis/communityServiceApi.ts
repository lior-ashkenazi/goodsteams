import { AxiosResponse } from "axios";

import { Page } from "../models/misc/Page";
import { Community } from "../models/community/Community";
import { Discussion } from "../models/community/Discussion";
import { Comment } from "../models/community/Comment";

export type GetCommunitiesRequest = {
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
export type GetDiscussionResponse = AxiosResponse<{
  discussion: Discussion;
  comments: Page<Comment>;
}>;

export type PostDiscussionRequest = {
  bookId: number;
  title: string;
  content: string;
};
export type PostDiscussionResponse = AxiosResponse<{
  discussion: Discussion;
  comments: Page<Comment>;
}>;

export type DeleteDiscussionRequest = {
  bookId: number;
  discussionId: number;
};
export type DeleteDiscussionResponse = AxiosResponse<{
  discussion: Discussion;
  comments: Page<Comment>;
}>;

export type PostCommentRequest = {
  bookId: number;
  discussionId: number;
  content: string;
};
export type PostCommentResponse = AxiosResponse<Comment>;

export type EditCommentRequest = {
  bookId: number;
  discussionId: number;
  commentId: number;
  content: string;
};
export type EditCommentResponse = AxiosResponse<Comment>;

export type DeleteCommentRequest = {
  bookId: number;
  discussionId: number;
  commentId: number;
};
export type DeleteCommentResponse = AxiosResponse<Comment>;
