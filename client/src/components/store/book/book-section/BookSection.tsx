import { Book } from "../../../../types/models/book/Book";

import BookDescription from "./BookDescription";
import BookSynopsis from "./BookSynopsis";
import BookAddToCart from "./BookAddToCart";
import { useNavigate } from "react-router-dom";

interface BookSectionProps {
  isFetching: boolean;
  book: Book | undefined;
}

const BookSection = ({ isFetching, book }: BookSectionProps) => {
  const navigate = useNavigate();

  return (
    <>
      {!isFetching && book ? (
        <section className="mx-6 my-12 grid grid-cols-2 gap-y-8">
          <button
            className="absolute -top-12 right-0 rounded-sm bg-gradient-to-l from-green-200 to-yellow-100 px-3 py-2 text-green-600 transition-colors hover:from-green-100 hover:to-yellow-50 hover:text-green-500"
            onClick={() => navigate(`/community/book/${book.bookId}`)}
          >
            Community Hub
          </button>
          <span className="col-span-2 p-4 text-center">
            <h1 className="break-normal text-6xl font-semibold tracking-tighter">
              {book.title}
            </h1>
          </span>
          <BookDescription book={book} />
          <BookSynopsis book={book} />
          <BookAddToCart book={book} />
        </section>
      ) : (
        <section></section>
      )}
    </>
  );
};

export default BookSection;
