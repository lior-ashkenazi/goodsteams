import { useNavigate } from "react-router-dom";

import { LinearProgress, ThemeProvider, createTheme } from "@mui/material";

import { useGetStarCountsQuery } from "../../../../store";
import { Book } from "../../../../types/models/book/Book";
import BookRating from "../../../misc/BookRating";

interface ReviewsSectionProps {
  isFetching: boolean;
  book: Book | undefined;
}

const LinearProgressTheme = createTheme({
  palette: {
    primary: {
      main: "#15803d",
    },
  },
});

const ReviewsSection = ({ isFetching, book }: ReviewsSectionProps) => {
  const navigate = useNavigate();

  const { data: starCounts } = useGetStarCountsQuery(
    book ? book.bookId.toString() : "0",
  );

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
              <button className="flex h-16 w-[52rem] items-center justify-center rounded-full transition-colors hover:bg-green-400">
                <ThemeProvider theme={LinearProgressTheme}>
                  <LinearProgress
                    variant="determinate"
                    className="h-4 w-[50rem] rounded-full"
                    value={percentage}
                  />
                </ThemeProvider>
              </button>
            </span>
            <span>
              {value} {`(${percentage >= 1 ? `${percentage}` : "<1"}%)`}
            </span>
          </span>
        );
      });
  };

  return (
    <>
      {!isFetching && book ? (
        <section className="mx-6 my-12 flex flex-col gap-y-8">
          <h2 className="text-5xl font-semibold tracking-tight">
            Ratings & Reviews
          </h2>
          <form>Here will be a form</form>
          <div className="gap flex flex-col gap-y-4">
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
        </section>
      ) : (
        <section></section>
      )}
    </>
  );
};

export default ReviewsSection;
