import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";

import { useGetCartQuery, AppDispatch, clearToast } from "../../store";

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: cart, isFetching } = useGetCartQuery();

  useEffect(() => {
    return () => {
      dispatch(clearToast());
    };
  }, [dispatch]);

  return (
    <div className="mb-8 mt-10 flex w-full flex-col gap-y-8 rounded-sm bg-green-300 p-6 text-green-900">
      <h1 className="text-6xl font-medium tracking-tight">Shopping Cart</h1>
      <ul className="flex flex-col gap-y-3">
        <li className="flex justify-between">
          <div className="flex">
            <img
              src="/book-covers/book1.png"
              className="w-20 rounded-sm"
              aria-label="Cart item cover image"
            />
            <span className="truncate p-2 text-lg">book name</span>
          </div>
          <div className="flex flex-col items-center p-2">
            <span>12.34$</span>
            <Button
              variant="text"
              className="text-xs text-green-700 underline"
              disableRipple
            >
              Remove
            </Button>
          </div>
        </li>

        <li className="flex justify-between gap-y-2">
          <div className="flex">
            <img
              src="/book-covers/book1.png"
              className="w-20 rounded-sm"
              aria-label="Cart item cover image"
            />
            <span className="truncate p-2 text-lg">book name</span>
          </div>
          <div className="flex flex-col items-center p-2">
            <span>12.34$</span>
            <Button
              variant="text"
              className="text-xs text-green-700 underline"
              disableRipple
            >
              Remove
            </Button>
          </div>
        </li>

        <li>afsdasdfsafd</li>
        <li>afsdasdfsafd</li>
      </ul>
      <Button
        variant="contained"
        className="w-max self-end bg-gradient-to-tl from-yellow-500 to-yellow-400 normal-case text-yellow-50 shadow-none"
        disableRipple
      >
        Proceed To Purchase
      </Button>
    </div>
  );
};

export default CartPage;
