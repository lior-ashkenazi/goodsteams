import { Book } from "../../../types/models/Book";

interface GenreBookBoxProps {
  book: Book;
}

const GenreBookBox = ({ book }: GenreBookBoxProps) => {
  return (
    <button className="active:bg-yellow-yellow-300 flex w-72 flex-col items-center gap-4 rounded-sm border border-yellow-400 bg-yellow-100 transition-colors hover:bg-yellow-200 active:bg-yellow-300">
      <img
        className="rounded-sm"
        src={book.coverImageUrl}
        aria-label="book-cover-image"
      />
      <div className="p-4 pb-6">
        <h2 className="mb-2 text-center text-xl font-medium">{book.title}</h2>
        <h3 className="text-lg italic">by {book.author}</h3>
      </div>
    </button>
  );
};

export default GenreBookBox;
