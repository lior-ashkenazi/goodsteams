import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Cart } from "../../types/models/cart/Cart";
import { authServiceEndpoints } from "../apis/endpoints/authServiceEndpoints";
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
        orderServiceEndpoints.endpoints.addCartItem.matchRejected,
        (state) => {
          state.toastMessage = "Could not add item to cart";
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
      )
      .addMatcher(
        orderServiceEndpoints.endpoints.deleteCartItem.matchRejected,
        (state) => {
          state.toastMessage = "Could not remove item from cart";
          state.showToast = true;
        },
      )
      .addMatcher(
        authServiceEndpoints.endpoints.logoutUser.matchFulfilled,
        (state) => {
          state.cart = null;
          state.toastMessage = null;
          state.showToast = null;
        },
      );
  },
});

export const { setCart, clearToast } = cartSlice.actions;
export default cartSlice.reducer;
