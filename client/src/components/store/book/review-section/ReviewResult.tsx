import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Divider, Rating, Button } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

import { Review, isReview } from "../../../../types/models/review/Review";
import {
  ReviewVoteBundledReview,
  isReviewVoteBundledReview,
} from "../../../../types/models/review/ReviewVoteBundledReview";
import { ReviewVote } from "../../../../types/models/review/ReviewVote";
import { RootState, useGetProfilePublicQuery } from "../../../../store";
import {
  useChangeReviewVoteMutation,
  useDeleteReviewVoteMutation,
} from "../../../../apis/reviewServiceApi";
import { formatDate } from "../../../../utils/dateUtils";
import { highlightText } from "../../../../utils/highlightUtils";
import { Book } from "../../../../types/models/book/Book";

interface ReviewResultProps {
  data: Review | ReviewVoteBundledReview;
  book: Book;
  search: string;
}

const ReviewResult = ({ data, book, search }: ReviewResultProps) => {
  const navigate = useNavigate();

  const review: Review = isReview(data) ? data : data.review;
  const reviewVote: ReviewVote | null = isReviewVoteBundledReview(data)
    ? data.reviewVote
    : null;

  const { data: profile } = useGetProfilePublicQuery(review.userId.toString());

  const deleteReviewVote = useDeleteReviewVoteMutation();
  const changeReviewVote = useChangeReviewVoteMutation();

  const userId: number | null = useSelector(
    (state: RootState) => state.profile.userId,
  );

  const [isBodyTextExpanded, setIsBodyTextExpanded] = useState<boolean>(false);
  const [isBodyTextOverflow, setIsBodyTextOverflow] = useState<boolean>(false);
  const bodyTextRef = useRef<HTMLDivElement | null>(null);

  const [reviewHelpfulCount, setReviewHelpfulCount] = useState<number>(0);
  const [reviewFunnyCount, setReviewFunnyCount] = useState<number>(0);
  const [reviewVoteType, setReviewVoteType] = useState<string>("");

  useEffect(() => {
    const checkOverflow = () => {
      if (bodyTextRef.current) {
        setIsBodyTextOverflow(
          bodyTextRef.current.scrollHeight > bodyTextRef.current.clientHeight,
        );
      }
    };
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [bodyTextRef]);

  useEffect(() => {
    setReviewHelpfulCount(review.helpfulCount);
    setReviewFunnyCount(review.funnyCount);
    setReviewVoteType(reviewVote?.voteType ?? "");
  }, [review, reviewVote]);

  const handleReviewVoteClick = async (voteType: string) => {
    if (!userId) return;

    switch (voteType) {
      case "helpful":
        setReviewHelpfulCount(
          (prevReviewHelpfulCount) => prevReviewHelpfulCount - 1,
        );
        break;
      case "funny":
        setReviewFunnyCount((prevReviewFunnyCount) => prevReviewFunnyCount - 1);
        break;
    }

    const reviewId = review.reviewId;

    const bookId = book.bookId;
    if (voteType === reviewVoteType) {
      const requestBody = {
        bookId,
        reviewId,
        userId,
      };
      await deleteReviewVote.mutateAsync(requestBody);
      setReviewVoteType("");
    } else {
      const requestBody = {
        bookId,
        reviewId,
        userId,
        voteType,
      };
      await changeReviewVote.mutateAsync(requestBody);
      setReviewVoteType(voteType);
    }
  };

  return profile ? (
    <div className="flex rounded-sm bg-yellow-100 p-2">
      <div className="mr-16 flex gap-x-2">
        <img src={profile.avatarUrl} className="h-12" />
        <span>
          <Button
            variant="text"
            className="truncate p-0 text-base normal-case text-current hover:bg-transparent"
            disableRipple
          >
            {profile.username}
          </Button>
        </span>
      </div>
      <div className="flex flex-grow flex-col gap-y-2">
        <span className="flex w-full items-center rounded-sm bg-yellow-200 p-1">
          <Rating
            className="mr-4 text-4xl"
            value={review.rating}
            precision={1}
            readOnly
          />
          <span className="text-xl">{review.rating}/5 Stars</span>
        </span>
        <div className="flex flex-col">
          <span className="text-sm text-yellow-500">
            {`${
              review.createdAt === review.updatedAt ? "POSTED:" : "EDITED:"
            } ${formatDate(review.updatedAt)}`}
          </span>
          <span className="relative">
            <p
              ref={bodyTextRef}
              className={`overflow-hidden ${
                isBodyTextExpanded ? "" : "max-h-36"
              }`}
            >
              {highlightText(review.bodyText, search)}
            </p>
            {isBodyTextOverflow && (
              <div className="absolute top-32 h-6 w-full bg-gradient-to-b from-transparent to-yellow-100 to-60% opacity-90"></div>
            )}
          </span>
          {isBodyTextOverflow && (
            <Button
              variant="text"
              onClick={() => setIsBodyTextExpanded(!isBodyTextExpanded)}
              className="self-end p-0 text-xs text-green-400 hover:bg-transparent"
              disableRipple
            >
              {isBodyTextExpanded ? "Read Less" : "Read More"}
            </Button>
          )}
        </div>
        <Divider />
        <div className="flex flex-col gap-y-2 text-sm text-yellow-500">
          <span>Was this review helpful?</span>
          <span className="flex gap-x-2">
            <Button
              size="small"
              variant="contained"
              disableElevation
              disableRipple
              className={`normal-case ${
                reviewVoteType === "helpful"
                  ? "bg-green-300 text-green-500"
                  : "bg-green-200 text-green-400"
              }`}
              startIcon={<ThumbUpIcon />}
              onClick={() => handleReviewVoteClick("helpful")}
            >
              Yes
            </Button>
            <Button
              size="small"
              variant="contained"
              disableElevation
              disableRipple
              className={`normal-case ${
                reviewVoteType === "not_helpful"
                  ? "bg-green-300 text-green-500"
                  : "bg-green-200 text-green-400"
              }`}
              startIcon={<ThumbDownIcon />}
              onClick={() => handleReviewVoteClick("not_helpful")}
            >
              No
            </Button>
            <Button
              size="small"
              variant="contained"
              disableElevation
              disableRipple
              className={`normal-case ${
                reviewVoteType === "funny"
                  ? "bg-green-300 text-green-500"
                  : "bg-green-200 text-green-400"
              }`}
              startIcon={<EmojiEmotionsIcon />}
              onClick={() => handleReviewVoteClick("funny")}
            >
              Funny
            </Button>
          </span>
          <span>
            {reviewHelpfulCount > 0 && (
              <span>
                {reviewHelpfulCount}{" "}
                {`${reviewHelpfulCount === 1 ? "person" : "people"}`} found this
                review helpful
              </span>
            )}
            <span className="flex flex-col">
              {reviewFunnyCount > 0 && (
                <span>
                  {reviewFunnyCount}{" "}
                  {`${reviewFunnyCount === 1 ? "person" : "people"}`} found this
                  review funny
                </span>
              )}
            </span>
          </span>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default ReviewResult;
