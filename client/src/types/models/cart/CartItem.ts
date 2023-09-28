import { Book } from "./book/Book";

export type CartItem = Book & {
  cartItemId: number;
  addedDate: string;
};
