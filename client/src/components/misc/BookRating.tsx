import { Rating } from "@mui/material";
import { Book } from "../../types/models/book/Book";

interface BookRatingProps {
  book: Book;
}

const BookRating = ({ book }: BookRatingProps) => {
  return (
    <span className="flex items-center gap-x-4">
      <Rating
        className="text-5xl"
        value={book.averageRating}
        precision={0.5}
        readOnly
      />
      {book.ratingCount > 0 && (
        <span className="text-3xl font-semibold">{book.averageRating}</span>
      )}
    </span>
  );
};

export default BookRating;
