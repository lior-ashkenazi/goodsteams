import { Review } from "./Review";
import { ReviewVote } from "./ReviewVote";

export type ReviewVoteBundledReview = {
  review: Review;
  reviewVote: ReviewVote | null;
};
