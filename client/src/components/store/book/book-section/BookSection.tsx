import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState, useAddCartItemMutation } from "../../../../store";
import { Book } from "../../../../types/models/book/Book";
import { Cart } from "../../../../types/models/cart/Cart";
import { Library } from "../../../../types/models/library/Library";

import AddToCartComponent from "../../../misc/AddToCartComponent";
import BookDescription from "./BookDescription";
import BookSynopsis from "./BookSynopsis";
import BookAddToCart from "./BookAddToCart";

interface BookSectionProps {
  isFetching: boolean;
  book: Book | undefined;
}

const BookSection = ({ isFetching, book }: BookSectionProps) => {
  return (
    <>
      {!isFetching && book ? (
        <section className="mx-6 mt-12 grid grid-cols-2 gap-y-8">
          <button className="absolute -top-12 right-0 rounded-sm bg-gradient-to-l from-green-200 to-yellow-100 px-3 py-2 text-green-600 transition-colors hover:from-green-100 hover:to-yellow-50 hover:text-green-500">
            Community Hub
          </button>
          <span className="col-span-2 p-4 text-center">
            <h1 className="text-6xl font-semibold">{book.title}</h1>
          </span>
          <BookDescription book={book} />
          <BookSynopsis book={book} />
          <BookAddToCart book={book} />
        </section>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default BookSection;
