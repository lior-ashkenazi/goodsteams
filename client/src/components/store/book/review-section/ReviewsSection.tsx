import { useState } from "react";

import { Book } from "../../../../types/models/book/Book";
import ReviewCommunityReviews from "./ReviewCommunityReviews";
import ReviewResults from "./ReviewResults";
import ReviewSearchBar from "./ReviewSearchBar";
import ReviewUserReview from "./ReviewUserReview";

interface ReviewsSectionProps {
  isFetching: boolean;
  book: Book | undefined;
}

const ReviewsSection = ({ isFetching, book }: ReviewsSectionProps) => {
  const [rating, setRating] = useState<number | null>(null);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("popular");

  return (
    <>
      {!isFetching && book ? (
        <section className="mx-6 my-12 flex flex-col gap-y-8">
          <h2 className="text-5xl font-semibold tracking-tight">
            Ratings & Reviews
          </h2>
          <ReviewUserReview book={book} />
          <ReviewCommunityReviews
            book={book}
            rating={rating}
            setRating={setRating}
          />
          <ReviewSearchBar
            search={search}
            setSearch={setSearch}
            sort={sort}
            setSort={setSort}
          />
          <ReviewResults
            book={book}
            rating={rating}
            search={search}
            sort={sort}
          />
        </section>
      ) : (
        <section></section>
      )}
    </>
  );
};

export default ReviewsSection;
