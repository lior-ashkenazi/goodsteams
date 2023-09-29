import { Book } from "../../../../types/models/book/Book";

interface BookSynopsisProps {
  book: Book;
}

const BookSynopsis = ({ book }: BookSynopsisProps) => {
  return (
    <div className="col-span-2 m-2 break-words rounded-sm bg-yellow-100 p-8 text-yellow-950">
      <h2 className="mb-8 text-4xl font-bold underline">Synopsis</h2>
      <p className="text-lg italic">{book.synopsis}</p>
    </div>
  );
};

export default BookSynopsis;
