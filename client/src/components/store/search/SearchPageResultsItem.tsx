import { useNavigate } from "react-router-dom";

import { Book } from "../../../types/models/Book";
import { Rating, Typography } from "@mui/material";

import { renderRatingTypography } from "../../../utils/ratingUtils";
import { convertDate } from "../../../utils/dateUtils";

interface SearchPageResultsItemProps {
  book: Book;
}

const SearchPageResultsItem = ({ book }: SearchPageResultsItemProps) => {
  const navigate = useNavigate();

  return (
    <button
      key={book.id}
      className="mb-2 flex w-full items-center justify-between bg-yellow-100 transition-colors hover:bg-yellow-200 active:bg-yellow-300"
      onClick={() => navigate(`/store/book/${book.id}`)}
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
          <div className="mb-6 text-sm">
            by <span>{book.author}</span>
          </div>
          <div className="truncate text-sm">
            <Typography
              component="legend"
              className={`${book.averageRating === 0 && "text-transparent"}`}
            >
              {renderRatingTypography(book.averageRating)}
            </Typography>
            <span className="flex items-center gap-x-1">
              <Rating value={book.averageRating} precision={0.5} readOnly />
              <span
                className={`${book.averageRating === 0 && "text-transparent"}`}
              >
                <span>- {book.averageRating} avg rating </span>
                <span>- {book.reviewCount} ratings</span>
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="m-6 flex w-[24rem] items-center justify-between">
        <span>{convertDate(book.releaseDate)}</span>
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
                {(
                  book.price -
                  (book.discountPercent / 100) * book.price
                ).toFixed(2)}
                $
              </span>
            </span>
          </div>
        )}
      </div>
    </button>
  );
};

export default SearchPageResultsItem;
