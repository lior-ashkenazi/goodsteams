import { Cart } from "../models/Cart";

export type GetCartRequest = void;
export type GetCartResponse = Cart;

export type AddCartItemRequest = {
  cartId: number;
  bookId: number;
  title: string;
  author: string;
  coverImageUrl: string;
  price: number;
  discountPercent: number;
};
export type AddCartItemResponse = Cart;

export type DeleteCartItemRequest = string;
export type DeleteCartItemResponse = Cart;
