import { useNavigate } from "react-router-dom";

import { Book } from "../../../types/models/book/Book";
import { Rating } from "@mui/material";

import { formatDate } from "../../../utils/dateUtils";
import { calculatePriceAfterDiscount } from "../../../utils/priceUtils";

interface SearchPageResultsItemProps {
  book: Book;
}

const SearchPageResultsItem = ({ book }: SearchPageResultsItemProps) => {
  const navigate = useNavigate();

  return (
    <button
      key={book.bookId}
      className="mb-2 flex w-full items-center justify-between bg-yellow-100 transition-colors hover:bg-yellow-200 active:bg-yellow-300"
      onClick={() => navigate(`/store/book/${book.bookId}`)}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <img
            className="col-span-1 row-span-3 h-48 w-32"
            src={book.coverImageUrl}
            aria-label={`${book.title} cover image`}
          />
        </div>
        <div className="m-6 w-[24rem] text-left">
          <div className="mb-6 truncate text-lg font-medium">
            <span className="truncate">{book.title}</span>
          </div>
          <div className="mb-6 text-sm italic">
            by <span>{book.author}</span>
          </div>
          <div className="truncate text-sm">
            <span className="flex items-center gap-x-1">
              <Rating value={book.averageRating} precision={0.5} readOnly />
              <span
                className={`${book.ratingCount === 0 && "text-transparent"}`}
              >
                {book.averageRating.toFixed(2)} avg rating{" "}
              </span>
              <span
                className={`${book.ratingCount === 0 && "text-transparent"}`}
              >
                - {book.ratingCount} ratings
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="m-6 flex w-[24rem] items-center justify-between">
        <span>{formatDate(book.releaseDate)}</span>
        {book.discountPercent === 0 ? (
          <span className="mr-10">{book.price}$</span>
        ) : (
          <div className="mr-10 flex items-center gap-x-10">
            <span className="h-auto rounded-sm bg-green-300 p-1 text-yellow-50">
              -{book.discountPercent}%
            </span>
            <span>
              <span className="block text-xs text-gray-400 line-through">
                {book.price}$
              </span>
              <span className="block text-green-300">
                {calculatePriceAfterDiscount(book.price, book.discountPercent)}$
              </span>
            </span>
          </div>
        )}
      </div>
    </button>
  );
};

export default SearchPageResultsItem;
