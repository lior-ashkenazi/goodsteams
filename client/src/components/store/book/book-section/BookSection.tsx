import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Rating,
  Button,
  IconButton,
  Popper,
  Grow,
  Paper,
  MenuItem,
  MenuList,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import {
  RootState,
  useAddCartItemMutation,
  useAddWishlistItemMutation,
  useDeleteWishlistItemMutation,
} from "../../../../store";
import { Book } from "../../../../types/models/book/Book";
import { Cart } from "../../../../types/models/cart/Cart";
import { Library } from "../../../../types/models/library/Library";
import { Wishlist } from "../../../../types/models/wishlist/Wishlist";

import { formatDate } from "../../../../utils/dateUtils";
import AddToCartComponent from "../../../misc/AddToCartComponent";

interface BookSectionProps {
  isFetching: boolean;
  book: Book | undefined;
}

const BookSection = ({ isFetching, book }: BookSectionProps) => {
  const navigate = useNavigate();

  const isAuthenticated: boolean | null = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const cart: Cart | null = useSelector((state: RootState) => state.cart.cart);

  const library: Library | null = useSelector(
    (state: RootState) => state.library.library,
  );

  const wishlist: Wishlist | null = useSelector(
    (state: RootState) => state.wishlist.wishlist,
  );

  const [addWishlistItem] = useAddWishlistItemMutation();
  const [deleteWishlistItem] = useDeleteWishlistItemMutation();
  const [addCartItem] = useAddCartItemMutation();

  const [bookInLibrary, setBookInLibrary] = useState<boolean>(false);
  const [bookInCart, setBookInCart] = useState<boolean>(false);
  const [bookInWishlist, setBookInWishlist] = useState<boolean>(false);

  const [openWishlistMenu, setOpenWishlistMenu] = useState<boolean>(false);

  const wishlistDropMenuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (library && wishlist && cart && book) {
      setBookInCart(
        cart.cartItems.some((cartItem) => cartItem.bookId === book.bookId),
      );
      setBookInLibrary(
        library.ownedBooks.some(
          (ownedBook) => ownedBook.bookId === book.bookId,
        ),
      );
      setBookInWishlist(
        wishlist.wishlistItems.some(
          (wishlistItem) => wishlistItem.bookId === book.bookId,
        ),
      );
    }
  }, [library, wishlist, cart, book]);

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

  const handleWishlistButton = async () => {
    if (!isAuthenticated) navigate("/login");
    else if (!wishlist || !book) return;
    else if (!bookInWishlist) {
      const addWishlistItemDTO = {
        wishlistId: wishlist.wishlistId,
        bookId: book.bookId,
      };

      await addWishlistItem(addWishlistItemDTO).unwrap;
    } else {
      handleDeleteWishlistItem();
    }
  };

  const handleDeleteWishlistItem = async () => {
    if (!wishlist || !book) return;

    // Necessarily not undefined because bookInWishlist === true
    const wishlistItem = wishlist.wishlistItems.find(
      (wishlistItem) => wishlistItem.bookId === book.bookId,
    );

    await deleteWishlistItem(wishlistItem!.wishlistItemId.toString()).unwrap();
  };

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
          <div className="col-span-1 flex flex-col items-center">
            <img
              src={book.coverImageUrl}
              className="mb-8 w-80 rounded-sm shadow-md"
              aria-label="book-cover-image"
            />
            {!bookInLibrary && (
              <div>
                <Button
                  variant="contained"
                  className="bg-gradient-to-tl from-green-400 to-green-300 px-3 py-2 normal-case text-green-50 shadow-none transition-colors hover:from-green-500 hover:to-green-400 active:from-green-600 active:to-green-500"
                  disableRipple
                  onClick={handleWishlistButton}
                  {...(bookInWishlist ? { startIcon: <CheckIcon /> } : {})}
                >
                  {bookInWishlist ? "On Wishlist" : "Add to Wishlist"}
                </Button>
                <IconButton
                  ref={wishlistDropMenuButtonRef}
                  aria-label="wishlist-drop-menu"
                  className="ml-0.5 w-2 rounded bg-gradient-to-tl from-green-400 to-green-300 px-3 py-2 normal-case text-green-50 shadow-none transition-colors hover:from-green-500 hover:to-green-400 active:from-green-600 active:to-green-500"
                  onMouseEnter={() => setOpenWishlistMenu(true)}
                  onMouseLeave={() => setOpenWishlistMenu(false)}
                  disableRipple
                >
                  <ArrowDropDownIcon />
                </IconButton>
                <Popper
                  open={openWishlistMenu}
                  anchorEl={wishlistDropMenuButtonRef.current}
                  role={undefined}
                  placement="bottom-start"
                  transition
                  disablePortal
                  onMouseEnter={() => setOpenWishlistMenu(true)}
                  onMouseLeave={() => setOpenWishlistMenu(false)}
                  className="z-10 w-64"
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom-start"
                            ? "left top"
                            : "left bottom",
                      }}
                    >
                      <Paper>
                        <MenuList>
                          <MenuItem
                            onClick={() => {
                              if (!isAuthenticated) navigate("/login");
                              else navigate("/store/wishlist");
                            }}
                            disableRipple
                          >
                            Manage your wishlist
                          </MenuItem>
                        </MenuList>
                        <MenuList>
                          <MenuItem
                            onClick={handleDeleteWishlistItem}
                            disableRipple
                            disabled={!bookInWishlist}
                          >
                            Remove from your wishlist
                          </MenuItem>
                        </MenuList>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>
            )}
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
                <span>&middot; {book.ratingCount} reviews</span>
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
              Published in {formatDate(book.releaseDate, "verbose")} by{" "}
              {book.publisher}
            </span>
          </div>
          <div className="col-span-2 m-2 break-words rounded-sm bg-yellow-100 p-8 text-yellow-950">
            <h2 className="mb-8 text-4xl font-bold underline">Synopsis</h2>
            <p className="text-lg italic">{book.synopsis}</p>
          </div>
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
        </section>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default BookSection;
