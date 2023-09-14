import { useNavigate } from "react-router-dom";
import { Rating, Button } from "@mui/material";

import { Book } from "../../../types/models/Book";
import { convertDate } from "../../../utils/dateUtils";
import { calculatePriceAfterDiscount } from "../../../utils/priceUtils";

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
          <button className="absolute -top-12 right-0 rounded-sm bg-gradient-to-l from-green-200 to-yellow-100 px-3 py-2 text-green-600 transition-colors hover:from-green-100 hover:to-yellow-50 hover:text-green-500">
            Community Hub
          </button>
          <span className="col-span-2 p-4 text-center">
            <h1 className="text-6xl font-semibold">{book.title}</h1>
          </span>
          <div className="col-span-1 flex justify-center">
            <img
              src={book.coverImageUrl}
              className="w-80 rounded-sm"
              aria-label="book-cover-image"
            />
          </div>
          <div className="flex flex-col items-center gap-y-8 p-4">
            <span className="text-4xl font-medium italic">{book.author}</span>
            <span className="flex items-center gap-x-4">
              <Rating
                className="text-5xl"
                value={book.averageRating}
                precision={0.5}
                readOnly
              />
              {book.ratingCount > 0 && (
                <span className="text-3xl font-semibold">
                  {book.averageRating}
                </span>
              )}
            </span>
            {book.ratingCount > 0 && (
              <span>
                <span>{book.ratingCount} ratings </span>
                <span>&middot; {book.reviewCount} ratings</span>
              </span>
            )}
            <div className="flex">
              <span className="mr-4 font-medium">Genres: </span>
              <div className="grid grid-flow-row grid-cols-3 gap-4">
                {book.genres.map((genre, index) => {
                  return (
                    <button
                      key={index}
                      className="col-auto flex items-start justify-center"
                      onClick={() =>
                        navigate(`/store/genre/${genre.genreName}`)
                      }
                    >
                      <span className="border-b-4 border-green-600 pb-0.5 hover:border-green-700 active:border-green-800">
                        {genre.genreName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            <span>{book.pageCount} pages, Kindle Edition</span>
            <span>
              Published in {convertDate(book.releaseDate)} by {book.publisher}
            </span>
          </div>
          <div className="col-span-2 m-2 break-words rounded-sm bg-yellow-100 p-8 text-yellow-950">
            <h2 className="mb-8 text-4xl font-medium underline">Synopsis</h2>
            <p className="text-lg">{book.synopsis}</p>
          </div>
          <div className="relative col-span-2 m-2 rounded-sm bg-gradient-to-r from-green-500 to-yellow-100 p-4">
            <div className="w-[32rem]">
              <span className="break-words text-2xl font-medium text-yellow-50">
                Buy {book.title}
              </span>
            </div>
            <div className="absolute -bottom-5 right-10 flex flex-row-reverse items-center bg-yellow-300 p-1">
              <Button
                variant="contained"
                className="bg-gradient-to-tl from-green-400 to-green-300 p-3 text-green-50 shadow-none transition-colors hover:from-green-500 hover:to-green-400 active:from-green-600 active:to-green-500"
                disableRipple
              >
                Add to Cart
              </Button>
              <div
                className={`mr-1 bg-yellow-200 ${
                  book.discountPercent > 0 ? "px-4 py-1.5" : "px-4 py-3"
                }`}
              >
                {book.discountPercent > 0 ? (
                  <span className="flex flex-col text-right">
                    <span className="text-xs text-yellow-600 line-through">
                      {book.price}$
                    </span>
                    <span className="text-sm text-green-500">
                      {calculatePriceAfterDiscount(
                        book.price,
                        book.discountPercent,
                      )}
                      $
                    </span>
                  </span>
                ) : (
                  <span className="text-sm text-green-800">{book.price}$</span>
                )}
              </div>
              {book.discountPercent > 0 && (
                <span className="bg-green-400 px-3 py-2 text-2xl font-bold text-green-50">
                  -{book.discountPercent}%
                </span>
              )}
            </div>
          </div>
        </section>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default BookSection;
