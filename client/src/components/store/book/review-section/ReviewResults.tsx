import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Divider, Chip } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { RootState } from "../../../../store";
import {
  useGetReviewsQuery,
  useGetReviewsAuthenticatedQuery,
} from "../../../../apis/reviewServiceApi";
import { Review } from "../../../../types/models/review/Review";
import { ReviewVoteBundledReview } from "../../../../types/models/review/ReviewVoteBundledReview";
import ReviewResult from "./ReviewResult";
import { Book } from "../../../../types/models/book/Book";

interface ReviewResultsProps {
  book: Book;
  rating: number | null;
  search: string;
  sort: string;
}

const ReviewResults = ({ book, rating, search, sort }: ReviewResultsProps) => {
  const [reviews, setReviews] = useState<Review[] | ReviewVoteBundledReview[]>(
    [],
  );
  const [page, setPage] = useState<number>(0);
  const size = 2;

  const isAuthenticated: boolean | null = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const bookId = book.bookId;

  const requestBody = {
    bookId,
    search,
    page,
    size,
    sort,
    ...(rating != null && { rating }),
  };

  const { data: fetchedUserReviewsResponse } = useGetReviewsAuthenticatedQuery(
    requestBody,
    {
      enabled: isAuthenticated,
    },
  );

  const { data: fetchedGuestReviewsResponse } = useGetReviewsQuery(
    requestBody,
    {
      enabled: !isAuthenticated,
    },
  );

  const fetchedData = isAuthenticated
    ? fetchedUserReviewsResponse?.data
    : fetchedGuestReviewsResponse?.data;

  console.log("reviews");
  console.log(reviews);
  console.log();

  useEffect(() => {
    setPage(0);
  }, [search, sort, rating]);

  useEffect(() => {
    if (!fetchedData) return;

    if (
      fetchedData.content &&
      fetchedData.content.length === 0 &&
      fetchedData.pageable.pageNumber === 0
    )
      setReviews([]);
    else if (fetchedData.pageable.pageNumber != page) return;
    else {
      if (+page === 0) {
        setReviews(fetchedData.content as Review[] | ReviewVoteBundledReview[]);
      } else {
        setReviews(
          (prevReviews) =>
            [...prevReviews, ...fetchedData.content] as
              | Review[]
              | ReviewVoteBundledReview[],
        );
      }
    }
  }, [fetchedData, page]);

  const onClickShowMoreReviews = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="flex flex-col gap-y-6 text-yellow-900">
      {reviews && reviews.length > 0 ? (
        reviews.map((review, index) => (
          <ReviewResult key={index} data={review} book={book} />
        ))
      ) : (
        <span className="self-center text-green-900">
          There are no results for this query
        </span>
      )}
      {fetchedData && reviews.length < fetchedData?.totalElements && (
        <Divider>
          <Chip
            label="Show more reviews"
            variant="outlined"
            className="border-green-900 bg-green-100 text-green-900"
            icon={<ExpandMoreIcon className="text-green-900" />}
            clickable
            onClick={onClickShowMoreReviews}
          />
        </Divider>
      )}
    </div>
  );
};

export default ReviewResults;
