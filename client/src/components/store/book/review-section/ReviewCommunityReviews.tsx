import { LinearProgress, ThemeProvider, createTheme } from "@mui/material";

import { useGetStarCountsQuery } from "../../../../apis/reviewServiceApi";
import { Book } from "../../../../types/models/book/Book";
import BookRating from "../../../misc/BookRating";

interface ReviewCommunityReviewsProps {
  book: Book;
  rating: number | null;
  setRating: React.Dispatch<React.SetStateAction<number | null>>;
}

const LinearProgressTheme = createTheme({
  palette: {
    primary: {
      main: "#15803d",
    },
  },
});

const ReviewCommunityReviews = ({
  book,
  rating,
  setRating,
}: ReviewCommunityReviewsProps) => {
  const { data } = useGetStarCountsQuery(book.bookId, {
    enabled: !!book,
  });

  const starCounts = data?.data;

  const onClickLinearProgress = (key: string) => {
    const prevRating: number = +key;
    if (rating == prevRating) setRating(null);
    else setRating(+key);
  };

  const renderStarCounts = () => {
    const ratingCount = book?.ratingCount ? book.ratingCount : 1;
    return Object.entries(starCounts!)
      .reverse()
      .map(([key, value]) => {
        const percentage = (value / ratingCount) * 100;

        return (
          <span className="flex items-center justify-between gap-x-4" key={key}>
            <span className="font-semibold underline">{key} stars</span>
            <span>
              <button
                className={`flex h-16 w-[52rem] items-center justify-center rounded-full transition-colors hover:bg-green-400 ${
                  rating && rating === +key && "bg-green-400"
                }`}
                onClick={() => onClickLinearProgress(key)}
              >
                <ThemeProvider theme={LinearProgressTheme}>
                  <LinearProgress
                    variant="determinate"
                    className="h-4 w-[50rem] rounded-full"
                    value={percentage}
                  />
                </ThemeProvider>
              </button>
            </span>
            <span className="w-16 text-center">
              {value}{" "}
              {`(${percentage >= 1 ? `${percentage.toFixed(2)}` : "<1"}%)`}
            </span>
          </span>
        );
      });
  };

  return (
    <div className="flex flex-col gap-y-4">
      <h3 className="text-4xl font-semibold tracking-tight">
        Community Reviews
      </h3>
      <span className="flex items-center gap-x-4">
        <BookRating book={book} />
        {book.ratingCount > 0 && (
          <span>
            <span>{book.ratingCount} ratings </span>
            <span>&middot; {book.ratingCount} reviews</span>
          </span>
        )}
      </span>
      {starCounts ? <div>{renderStarCounts()}</div> : <div></div>}
    </div>
  );
};

export default ReviewCommunityReviews;
