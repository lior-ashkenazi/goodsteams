import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import { AppDispatch, clearToast, RootState } from "../../../store";
import { Cart } from "../../../types/models/Cart";
import { CartItem } from "../../../types/models/CartItem";
import { calculatePriceAfterDiscount } from "../../../utils/priceUtils";

const CartComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const cart: Cart | null = useSelector((state: RootState) => state.cart.cart);

  const toastMessage: string | null = useSelector(
    (state: RootState) => state.cart.toastMessage,
  );

  const showToast: boolean | null = useSelector(
    (state: RootState) => state.cart.showToast,
  );

  useEffect(() => {
    return () => {
      dispatch(clearToast());
    };
  }, [dispatch]);

  const renderToastMessage = () => {
    let background = "bg-red-500";
    if (toastMessage?.startsWith("Added")) {
      background = "bg-green-500";
    } else if (toastMessage?.startsWith("Removed")) {
      background = "bg-yellow-500";
    }

    return (
      <span className={`p-2 ${background} w-max text-white`}>
        {toastMessage}
      </span>
    );
  };

  return (
    <>
      {cart ? (
        <div className="flex flex-col gap-y-8">
          {showToast && toastMessage && renderToastMessage()}
          <h1 className="text-6xl font-medium tracking-tight">Shopping Cart</h1>
          <ul className="flex flex-col gap-y-3">
            {cart.cartItems.map((cartItem: CartItem, index: number) => (
              <li key={index} className="flex justify-between">
                <div className="flex">
                  <img
                    src={cartItem.coverImageUrl}
                    className="w-20 rounded-sm"
                    aria-label={`${cartItem.title} cover image`}
                  />
                  <span className="flex flex-col p-2">
                    <button
                      className="truncate text-lg"
                      onClick={() => navigate(`/store/book/${cartItem.bookId}`)}
                    >
                      {cartItem.title}
                    </button>
                    <span className="truncate text-lg">
                      by {cartItem.author}
                    </span>
                  </span>
                </div>
                <div className="flex flex-col items-center p-2">
                  {cartItem.discountPercent > 0 ? (
                    <span className="flex flex-col text-right">
                      <span className="text-xs text-green-600 line-through">
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
                    className="text-xs text-green-700 underline"
                    disableRipple
                  >
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <Button
            variant="contained"
            className="w-max self-end bg-gradient-to-tl from-yellow-500 to-yellow-400 text-lg normal-case text-yellow-50 shadow-none"
            disableRipple
          >
            Proceed To Purchase
          </Button>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default CartComponent;
