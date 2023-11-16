import { useNavigate } from "react-router-dom";

import { Book } from "../../../types/models/book/Book";

import { calculatePriceAfterDiscount } from "../../../utils/priceUtils";

interface StoreHomeTabResultProps {
  book: Book;
}

const StoreHomeTabResult = ({ book }: StoreHomeTabResultProps) => {
  const navigate = useNavigate();

  return (
    <button
      className="flex items-center justify-between rounded-sm bg-green-600 bg-opacity-80 text-green-50 transition-colors hover:bg-green-500 active:bg-green-400"
      onClick={() => navigate(`/store/book/${book.bookId}`)}
    >
      <div className="flex">
        <img
          className="w-20"
          src={book.coverImageUrl}
          aria-label="store-home-tab-book-cover-image"
        />
        <div className="flex flex-col gap-y-2 truncate p-4">
          <span className="self-start">{book.title}</span>
          <span className="self-start text-sm italic">by {book.author}</span>
          <span className="self-start text-sm">
            {book.genres.map((genre) => genre.genreName).join(", ")}
          </span>
        </div>
      </div>
      {book.discountPercent === 0 ? (
        <span className="mr-4">{book.price}$</span>
      ) : (
        <div className="mr-4 flex items-center gap-x-10">
          <span className="h-auto rounded-sm bg-yellow-100 p-1 text-green-500">
            -{book.discountPercent}%
          </span>
          <span className="flex flex-col items-end">
            <span className="block text-xs text-gray-300 line-through">
              {book.price}$
            </span>
            <span className="block text-yellow-100">
              {calculatePriceAfterDiscount(book.price, book.discountPercent)}$
            </span>
          </span>
        </div>
      )}
    </button>
  );
};

export default StoreHomeTabResult;
