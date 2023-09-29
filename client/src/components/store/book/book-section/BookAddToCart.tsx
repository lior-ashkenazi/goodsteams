import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState, useAddCartItemMutation } from "../../../../store";
import { Book } from "../../../../types/models/book/Book";
import { Library } from "../../../../types/models/library/Library";
import { Cart } from "../../../../types/models/cart/Cart";
import AddToCartComponent from "../../../misc/AddToCartComponent";

interface BookAddToCartProps {
  book: Book;
}

const BookAddToCart = ({ book }: BookAddToCartProps) => {
  const navigate = useNavigate();

  const isAuthenticated: boolean | null = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const library: Library | null = useSelector(
    (state: RootState) => state.library.library,
  );

  const cart: Cart | null = useSelector((state: RootState) => state.cart.cart);

  const [addCartItem] = useAddCartItemMutation();

  const [bookInLibrary, setBookInLibrary] = useState<boolean>(false);
  const [bookInCart, setBookInCart] = useState<boolean>(false);

  useEffect(() => {
    if (library && cart && book) {
      setBookInCart(
        cart.cartItems.some((cartItem) => cartItem.bookId === book.bookId),
      );
      setBookInLibrary(
        library.ownedBooks.some(
          (ownedBook) => ownedBook.bookId === book.bookId,
        ),
      );
    }
  }, [library, cart, book]);

  const handleAddCartItem = async () => {
    if (!isAuthenticated) navigate("/login");
    if (!cart || !book) return;
    else if (bookInCart) navigate("/store/cart");
    else {
      const addCartItemDTO = {
        cartId: cart.cartId,
        bookId: book.bookId,
      };

      await addCartItem(addCartItemDTO).unwrap;
      navigate("/store/cart");
    }
  };

  return (
    <div className="relative col-span-2 m-2 rounded-sm bg-gradient-to-r from-green-500 to-yellow-100 p-4">
      <div className="w-[32rem]">
        <span className="break-words text-2xl font-medium text-yellow-50">
          Buy {book.title}
        </span>
      </div>
      <div className="absolute -bottom-5 right-10">
        <AddToCartComponent
          item={book}
          itemInLibrary={bookInLibrary}
          itemInCart={bookInCart}
          handleAddCartItem={handleAddCartItem}
        />
      </div>
    </div>
  );
};

export default BookAddToCart;
