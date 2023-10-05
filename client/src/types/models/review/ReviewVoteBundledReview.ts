import { Review, isReview } from "./Review";
import { ReviewVote, isReviewVote } from "./ReviewVote";

export type ReviewVoteBundledReview = {
  review: Review;
  reviewVote: ReviewVote | null;
};

export function isReviewVoteBundledReview(
  obj: unknown,
): obj is ReviewVoteBundledReview {
  const reviewVoteBundledReviewObj = obj as ReviewVoteBundledReview;

  return (
    !!obj &&
    isReview(reviewVoteBundledReviewObj.review) && // using the isReview Type Guard
    (reviewVoteBundledReviewObj.reviewVote === null ||
      isReviewVote(reviewVoteBundledReviewObj.reviewVote))
  );
}
