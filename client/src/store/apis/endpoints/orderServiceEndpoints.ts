import { apiSlice } from "../apiSlice";

import {
  GetCartRequest,
  GetCartResponse,
  AddCartItemRequest,
  AddCartItemResponse,
  DeleteCartItemRequest,
  DeleteCartItemResponse,
} from "../../../types/endpoints/orderServiceEndpoints";

export const orderServiceEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<GetCartResponse, GetCartRequest>({
      query: () => `order/cart`,
    }),
    addCartItem: builder.mutation<AddCartItemResponse, AddCartItemRequest>({
      query: (cartItem) => ({
        url: "order/cart/cart-item",
        method: "POST",
        body: cartItem,
      }),
    }),
    deleteCartItem: builder.mutation<
      DeleteCartItemResponse,
      DeleteCartItemRequest
    >({
      query: (cartItemId) => ({
        url: `order/cart/cart-item/${cartItemId}`,
        method: "DELETE",
      }),
    }),
  }),
});
