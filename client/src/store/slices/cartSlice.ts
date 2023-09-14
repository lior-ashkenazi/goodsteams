import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Cart } from "../../types/models/Cart";
import { orderServiceEndpoints } from "../apis/endpoints/orderServiceEndpoints";

type CartState = {
  cart: Cart | null;
};

const initialState: CartState = {
  cart: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (
      state,
      action: PayloadAction<{
        cart: Cart;
      }>,
    ) => {
      state.cart = action.payload.cart;
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
        },
      )
      .addMatcher(
        orderServiceEndpoints.endpoints.deleteCartItem.matchFulfilled,
        (state, action) => {
          state.cart = action.payload;
        },
      );
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
