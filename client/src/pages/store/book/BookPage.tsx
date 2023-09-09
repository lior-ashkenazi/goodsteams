import { useParams } from "react-router-dom";
import { Rating, Typography } from "@mui/material";
import { useGetBookByIdQuery } from "../../../store";
import { renderRatingTypography } from "../../../utils/ratingUtils";

const BookPage = () => {
  let { bookId } = useParams();
  bookId ||= "0";

  const { data: book, isFetching } = useGetBookByIdQuery(bookId);

  return (
    <div className="mb-8 flex w-full flex-col rounded-sm bg-green-200 text-green-900">
      {!isFetching && book ? (
        <section className="mx-6 my-12 grid grid-cols-2 gap-y-8">
          <span className="col-span-2 p-4 text-center">
            <h1 className="text-5xl font-semibold">{book.title}</h1>
          </span>
          <div className="flex justify-center">
            <img
              src={book.coverImageUrl}
              className="col-span-1 w-80 rounded-sm"
              aria-label="book-cover-image"
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="mb-8 text-4xl font-medium italic">
              {book.author}
            </span>
            <span className="mb-4 flex items-center gap-x-4">
              <Rating
                className="text-5xl"
                value={book.averageRating}
                precision={0.5}
                readOnly
              />
              <span className="text-3xl font-semibold">
                {/* {renderRatingTypography(book.averageRating)} */}
                4.35
              </span>
            </span>
            <span>
              <span
                className={`${book.averageRating > 0 && "text-transparent"}`}
              >
                - {book.averageRating} avg rating{" "}
              </span>
              <span
                className={`${book.averageRating > 0 && "text-transparent"}`}
              >
                - {book.reviewCount} ratings
              </span>
            </span>
          </div>
        </section>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default BookPage;
