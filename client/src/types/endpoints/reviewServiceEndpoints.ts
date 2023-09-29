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
export type GetReviewsResponse = Page<Review>;

export type GetReviewsAuthenticatedRequest = {
  bookId: number;
  search?: string;
  page?: number;
  size?: number;
  sort?: string;
  rating?: number;
};
export type GetReviewsAuthenticatedResponse = Page<ReviewVoteBundledReview>;

export type GetStarCountsRequest = string;
export type GetStarCountsResponse = StarCounts;

export type PostReviewRequest = {
  bookId: number;
  userId: number;
  rating: number;
  bodyText: string;
};
export type PostReviewResponse = Review;

export type UpdateReviewRequest = {
  bookId: number;
  userId: number;
  rating: number;
  bodyText: string;
};
export type UpdateReviewResponse = Review;

export type DeleteReviewRequest = string;
export type DeleteReviewResponse = Review;

export type AddReviewVoteRequest = {
  bookId: number;
  reviewId: number;
  userId: number;
  voteType: string;
};
export type AddReviewVoteResponse = ReviewVote;

export type ChangeReviewVoteRequest = {
  bookId: number;
  reviewId: number;
  userId: number;
  voteType: string;
};
export type ChangeReviewVoteResponse = ReviewVote;

export type DeleteReviewVoteRequest = {
  bookId: number;
  reviewId: number;
  userId: number;
};
export type DeleteReviewVoteResponse = ReviewVote;
