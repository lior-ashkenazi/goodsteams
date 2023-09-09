import { useParams } from "react-router-dom";
import { useGetBookByIdQuery } from "../../../store";

const BookPage = () => {
  let { bookId } = useParams();
  bookId ||= "0";

  const { data: book, isFetching } = useGetBookByIdQuery(bookId);

  return (
    <div className="mb-8 flex w-full flex-col rounded-sm bg-green-200 text-green-900">
      {!isFetching && book ? (
        <section className="m-12 grid grid-cols-2 gap-8">
          <span className="col-span-2 p-4 text-center">
            <h1 className="text-5xl">{book.title}</h1>
          </span>
          <img
            src={book.coverImageUrl}
            className="col-span-1 w-80 rounded-sm"
            aria-label="book-cover-image"
          />
          <div className="flex flex-col">
            <span></span>
          </div>
        </section>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default BookPage;
