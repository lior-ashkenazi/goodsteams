import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";

import { useDeleteCartItemMutation } from "../../../store";
import { CartItem } from "../../../types/models/cart/CartItem";
import { calculatePriceAfterDiscount } from "../../../utils/priceUtils";

interface CartComponentItemProps {
  cartItem: CartItem;
}

const CartComponentItem = ({ cartItem }: CartComponentItemProps) => {
  const navigate = useNavigate();

  const [deleteCartItem] = useDeleteCartItemMutation();

  const handleDeleteCartItem = async (cartItemId: number) => {
    await deleteCartItem(cartItemId.toString()).unwrap;
    navigate("/store/cart");
  };

  return (
    <li className="flex items-center justify-between rounded-sm bg-green-400">
      <div className="flex items-center">
        <button onClick={() => navigate(`/store/book/${cartItem.bookId}`)}>
          <img
            src={cartItem.coverImageUrl}
            className="w-20 rounded-sm"
            aria-label={`${cartItem.title} cover image`}
          />
        </button>
        <span className="flex flex-col p-2 text-green-50">
          <button
            className="truncate text-lg"
            onClick={() => navigate(`/store/book/${cartItem.bookId}`)}
          >
            {cartItem.title}
          </button>
          <span className="truncate text-base italic">
            by {cartItem.author}
          </span>
        </span>
      </div>
      <div className="flex flex-col items-center p-2">
        {cartItem.discountPercent > 0 ? (
          <span className="flex flex-col text-right">
            <span className="text-xs text-green-700 line-through">
              {cartItem.price}$
            </span>
            <span>
              {calculatePriceAfterDiscount(
                cartItem.price,
                cartItem.discountPercent,
              )}
              $
            </span>
          </span>
        ) : (
          <span>{cartItem.price}$</span>
        )}
        <Button
          variant="text"
          className="bg-transparent text-xs text-green-700 underline"
          disableRipple
          onClick={() => handleDeleteCartItem(cartItem.cartItemId)}
        >
          Remove
        </Button>
      </div>
    </li>
  );
};

export default CartComponentItem;
