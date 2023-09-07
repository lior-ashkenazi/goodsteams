import { Book } from "../../../types/models/Book";
import { Rating, Typography } from "@mui/material";

import { renderRatingTypography } from "../../../utils/ratingUtils";
import { convertDate } from "../../../utils/dateUtils";

interface SearchPageResultsItemProps {
  book: Book;
}

const SearchPageResultsItem = ({ book }: SearchPageResultsItemProps) => {
  return (
    <div
      key={book.id}
      className="mb-2 flex items-center justify-between bg-yellow-100 transition-colors hover:bg-yellow-200"
      style={{ cursor: "pointer" }}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <img
            className="col-span-1 row-span-3 h-48 w-32"
            src={book.coverImageUrl}
            aria-label={`${book.title} cover image`}
          />
        </div>
        <div className="m-6 w-[24rem]">
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
      <span>{convertDate(book.releaseDate)}</span>
      <span className="mr-10">{book.price}$</span>
    </div>
  );
};

export default SearchPageResultsItem;
