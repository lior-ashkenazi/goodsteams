import { AxiosResponse } from "axios";
import { Page } from "../models/misc/Page";
import { Review } from "../models/review/Review";
import { ReviewVote } from "../models/review/ReviewVote";
import { ReviewVoteBundledReview } from "../models/review/ReviewVoteBundledReview";
import { StarCounts } from "../models/review/StarCounts";

export type GetReviewsRequest = {
  bookId: number;
  search?: string;
  page?: number;
  size?: number;
  sort?: string;
  rating?: number;
};
export type GetReviewsResponse = AxiosResponse<Page<Review>>;

export type GetReviewsAuthenticatedRequest = {
  bookId: number;
  search?: string;
  page?: number;
  size?: number;
  sort?: string;
  rating?: number;
};
export type GetReviewsAuthenticatedResponse = AxiosResponse<
  Page<ReviewVoteBundledReview>
>;

export type GetUserReviewRequest = { bookId: number; userId: number };
export type GetUserReviewResponse = AxiosResponse<Review | null>;

export type GetStarCountsRequest = number;
export type GetStarCountsResponse = AxiosResponse<StarCounts>;

export type PostReviewRequest = {
  bookId: number;
  userId: number;
  rating: number;
  bodyText: string;
};
export type PostReviewResponse = AxiosResponse<Review>;

export type UpdateReviewRequest = {
  bookId: number;
  userId: number;
  rating: number;
  bodyText: string;
};
export type UpdateReviewResponse = AxiosResponse<Review>;

export type DeleteReviewRequest = number;
export type DeleteReviewResponse = AxiosResponse<Review>;

export type AddReviewVoteRequest = {
  bookId: number;
  reviewId: number;
  userId: number;
  voteType: string;
};
export type AddReviewVoteResponse = AxiosResponse<ReviewVote>;

export type ChangeReviewVoteRequest = {
  bookId: number;
  reviewId: number;
  userId: number;
  voteType: string;
};
export type ChangeReviewVoteResponse = AxiosResponse<ReviewVote>;

export type DeleteReviewVoteRequest = {
  bookId: number;
  reviewId: number;
  userId: number;
};
export type DeleteReviewVoteResponse = AxiosResponse<ReviewVote>;
