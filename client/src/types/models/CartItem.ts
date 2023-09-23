import { Book } from "./Book";

export type CartItem = Book & {
  cartItemId: number;
  addedDate: string;
};
