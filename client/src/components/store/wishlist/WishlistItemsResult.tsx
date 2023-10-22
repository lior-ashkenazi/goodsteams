import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Rating } from "@mui/material";

import {
  useAddCartItemMutation,
  useDeleteWishlistItemMutation,
} from "../../../store";
import { WishlistItem } from "../../../types/models/wishlist/WishlistItem";
import AddToCartComponent from "../../misc/AddToCartComponent";
import { formatDate } from "../../../utils/dateUtils";
import { Cart } from "../../../types/models/cart/Cart";

interface WishlistItemsResultProps {
  cart: Cart;
  wishlistItem: WishlistItem;
}

const WishlistItemsResult = ({
  cart,
  wishlistItem,
}: WishlistItemsResultProps) => {
  const navigate = useNavigate();

  const [addCartItem] = useAddCartItemMutation();
  const [deleteWishlistItem] = useDeleteWishlistItemMutation();

  const [wishlistItemInCart, setWishlistItemInCart] = useState<boolean>(false);

  useEffect(() => {
    setWishlistItemInCart(
      cart.cartItems.some(
        (cartItem) => cartItem.bookId === wishlistItem.bookId,
      ),
    );
  }, [cart, wishlistItem]);

  const handleAddCartItem = async () => {
    if (wishlistItemInCart) navigate("/store/cart");
    else {
      const addCartItemDTO = {
        cartId: cart.cartId,
        bookId: wishlistItem.bookId,
      };

      await addCartItem(addCartItemDTO).unwrap;
      navigate("/store/cart");
    }
  };

  const handleDeleteWishlistItem = async () => {
    await deleteWishlistItem(wishlistItem.wishlistItemId.toString()).unwrap();
  };

  return (
    <li className="flex justify-between bg-green-400 p-4">
      <div className="flex">
        <button onClick={() => navigate(`/store/book/${wishlistItem.bookId}`)}>
          <img
            src={wishlistItem.coverImageUrl}
            aria-label="wishlist-item-book-cover"
            className="mr-8 w-32 rounded-sm"
          />
        </button>
        <div className="flex flex-col">
          <Button
            variant="text"
            className="mb-4 w-[32rem] justify-start truncate p-0 text-left text-2xl font-medium normal-case text-green-50 hover:bg-green-400"
            disableRipple
            onClick={() => navigate(`/store/book/${wishlistItem.bookId}`)}
          >
            {wishlistItem.title}
          </Button>
          <div className="grid w-[24rem] grid-cols-2 justify-items-start gap-x-8 text-sm uppercase text-green-200">
            <span className="col-span-1">Overall reviews:</span>
            <span className="col-span-1">
              <span className="flex items-center gap-x-4">
                <Rating
                  value={wishlistItem.averageRating}
                  precision={0.5}
                  readOnly
                />
                {wishlistItem.averageRating > 0 && (
                  <span>{wishlistItem.averageRating}</span>
                )}
              </span>
            </span>
            <span className="col-span-1">Release Date:</span>
            <span className="col-span-1 ml-1">
              {formatDate(wishlistItem.releaseDate, "concise")}
            </span>
          </div>
        </div>
      </div>
      <div className="relative flex w-[20rem] items-center justify-end">
        <AddToCartComponent
          item={wishlistItem}
          itemInCart={wishlistItemInCart}
          handleAddCartItem={handleAddCartItem}
        />
        <span className="absolute bottom-0 right-0 text-green-600">
          {`Added on ${formatDate(wishlistItem.addedDate)} `}
          <button onClick={handleDeleteWishlistItem}>(remove)</button>
        </span>
      </div>
    </li>
  );
};

export default WishlistItemsResult;
