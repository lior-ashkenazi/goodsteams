import { reduxApiSlice } from "../reduxApiSlice";

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
} from "../../../types/apis/orderServiceEndpoints";

export const orderServiceEndpoints = reduxApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<GetCartResponse, GetCartRequest>({
      query: () => `order/cart/`,
      providesTags: ["Cart"],
    }),
    addCartItem: builder.mutation<AddCartItemResponse, AddCartItemRequest>({
      query: (cartItemDTO) => ({
        url: "order/cart/cart-item",
        method: "POST",
        body: cartItemDTO,
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
      invalidatesTags: ["Cart", "Library", "Wishlist"],
    }),
  }),
});
