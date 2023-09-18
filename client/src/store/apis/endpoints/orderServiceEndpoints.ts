import { apiSlice } from "../apiSlice";

import {
  GetCartRequest,
  GetCartResponse,
  AddCartItemRequest,
  AddCartItemResponse,
  DeleteCartItemRequest,
  DeleteCartItemResponse,
  CreatePaymentIntentRequest,
  CreatePaymentIntentResponse,
  SubmitPaymentRequest,
  SubmitPaymentResponse,
} from "../../../types/endpoints/orderServiceEndpoints";

export const orderServiceEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<GetCartResponse, GetCartRequest>({
      query: () => `order/cart/`,
      providesTags: ["Cart"],
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
    createPaymentIntent: builder.mutation<
      CreatePaymentIntentResponse,
      CreatePaymentIntentRequest
    >({
      query: () => ({
        url: `order/payment/payment-intent`,
        method: "POST",
      }),
    }),
    submitPayment: builder.mutation<
      SubmitPaymentResponse,
      SubmitPaymentRequest
    >({
      query: (cart) => ({
        url: `order/payment/payment-complete`,
        method: "POST",
        body: cart,
      }),
      invalidatesTags: ["Cart", "Library"],
    }),
  }),
});