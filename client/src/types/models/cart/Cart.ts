import { CartItem } from "./CartItem";

export type Cart = {
  cartId: number;
  userId: number;
  cartItems: CartItem[];
};
