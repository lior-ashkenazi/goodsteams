import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import {
  AppDispatch,
  clearToast,
  RootState,
  useDeleteCartItemMutation,
} from "../../../store";
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

  const [deleteCartItem] = useDeleteCartItemMutation();

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

  const handleDeleteCartItem = async (cartItemId: number) => {
    await deleteCartItem(cartItemId.toString()).unwrap;
    navigate("/store/cart");
  };

  return (
    <>
      {cart ? (
        <div className="flex flex-col gap-y-8">
          <button
            className="absolute -top-12 right-0 rounded-sm bg-gradient-to-l from-green-200 to-yellow-100 px-3 py-2 text-green-600 transition-colors hover:from-green-100 hover:to-yellow-50 hover:text-green-500"
            onClick={() => navigate("/store")}
          >
            Continue Shopping
          </button>
          <h1 className="mb-4 text-6xl font-medium tracking-tight">
            Shopping Cart
          </h1>
          {showToast && toastMessage && renderToastMessage()}
          <ul className="flex flex-col gap-y-2">
            {cart.cartItems
              .slice()
              .sort((a, b) => {
                return a.addedDate.localeCompare(b.addedDate);
              })
              .map((cartItem: CartItem, index: number) => (
                <li
                  key={index}
                  className="flex justify-between rounded-sm bg-green-400"
                >
                  <div className="flex">
                    <img
                      src={cartItem.coverImageUrl}
                      className="w-20 rounded-sm"
                      aria-label={`${cartItem.title} cover image`}
                    />
                    <span className="flex flex-col p-2">
                      <button
                        className="truncate text-lg"
                        onClick={() =>
                          navigate(`/store/book/${cartItem.bookId}`)
                        }
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
              ))}
          </ul>
          <div className="flex flex-col rounded-sm bg-green-400 p-4 font-medium">
            <span className="mb-10 flex justify-between text-lg text-green-50">
              <span>Estimated Total</span>
              <span>
                {cart.cartItems
                  .reduce((acc, cartItem) => {
                    return (
                      acc +
                      Number(
                        calculatePriceAfterDiscount(
                          cartItem.price,
                          cartItem.discountPercent,
                        ),
                      )
                    );
                  }, 0)
                  .toFixed(2)}
                $
              </span>
            </span>
            <Button
              variant="contained"
              className="w-max self-end bg-gradient-to-tl from-yellow-500 to-yellow-400 text-lg normal-case text-yellow-50 shadow-none"
              disableRipple
              disabled={cart && cart.cartItems && cart.cartItems.length === 0}
              onClick={() => navigate("/store/payment")}
            >
              Proceed To Payment
            </Button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default CartComponent;
