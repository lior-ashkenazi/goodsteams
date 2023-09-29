import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
  useAddWishlistItemMutation,
  useDeleteWishlistItemMutation,
} from "../../../../store";
import { Book } from "../../../../types/models/book/Book";
import { Library } from "../../../../types/models/library/Library";
import { Wishlist } from "../../../../types/models/wishlist/Wishlist";
import { formatDate } from "../../../../utils/dateUtils";

interface BookDescriptionProps {
  book: Book;
}

const BookDescription = ({ book }: BookDescriptionProps) => {
  const navigate = useNavigate();

  const isAuthenticated: boolean | null = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const library: Library | null = useSelector(
    (state: RootState) => state.library.library,
  );

  const wishlist: Wishlist | null = useSelector(
    (state: RootState) => state.wishlist.wishlist,
  );

  const [addWishlistItem] = useAddWishlistItemMutation();
  const [deleteWishlistItem] = useDeleteWishlistItemMutation();

  const [bookInLibrary, setBookInLibrary] = useState<boolean>(false);
  const [bookInWishlist, setBookInWishlist] = useState<boolean>(false);

  const [openWishlistMenu, setOpenWishlistMenu] = useState<boolean>(false);
  const wishlistDropMenuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (library && wishlist && book) {
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
  }, [library, wishlist, book]);

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
                      placement === "bottom-start" ? "left top" : "left bottom",
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
            <span className="text-3xl font-semibold">{book.averageRating}</span>
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
                  onClick={() => navigate(`/store/genre/${genre.genreName}`)}
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
    </>
  );
};

export default BookDescription;
