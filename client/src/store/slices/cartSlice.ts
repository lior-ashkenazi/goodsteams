import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Cart } from "../../types/models/Cart";
import { orderServiceEndpoints } from "../apis/endpoints/orderServiceEndpoints";

type CartState = {
  cart: Cart | null;
  toastMessage: string | null;
  showToast: boolean | null;
};

const initialState: CartState = {
  cart: null,
  toastMessage: null,
  showToast: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (
      state,
      action: PayloadAction<{
        cart: Cart;
        toastMessage: string;
        showToast: boolean;
      }>,
    ) => {
      state.cart = action.payload.cart;
      state.toastMessage = action.payload.toastMessage;
      state.showToast = action.payload.showToast;
    },
    clearToast: (state) => {
      state.toastMessage = "";
      state.showToast = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        orderServiceEndpoints.endpoints.getCart.matchFulfilled,
        (state, action) => {
          state.cart = action.payload;
        },
      )
      .addMatcher(
        orderServiceEndpoints.endpoints.addCartItem.matchFulfilled,
        (state, action) => {
          state.cart = action.payload;
          state.toastMessage = "Added item to the cart";
          state.showToast = true;
        },
      )
      .addMatcher(
        orderServiceEndpoints.endpoints.deleteCartItem.matchFulfilled,
        (state, action) => {
          state.cart = action.payload;
          state.toastMessage = "Removed item from the cart";
          state.showToast = true;
        },
      );
  },
});

export const { setCart, clearToast } = cartSlice.actions;
export default cartSlice.reducer;
