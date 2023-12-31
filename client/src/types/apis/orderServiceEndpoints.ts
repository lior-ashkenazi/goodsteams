import { Cart } from "../models/cart/Cart";
import { CartItem } from "../models/cart/CartItem";

export type GetCartRequest = void;
export type GetCartResponse = Cart;

export type AddCartItemRequest = {
  cartId: number;
  bookId: number;
};
export type AddCartItemResponse = Cart;

export type DeleteCartItemRequest = string;
export type DeleteCartItemResponse = Cart;

export type CreatePaymentIntentRequest = void;
export type CreatePaymentIntentResponse = string;

export type SubmitPaymentRequest = CartItem[];
export type SubmitPaymentResponse = string;
