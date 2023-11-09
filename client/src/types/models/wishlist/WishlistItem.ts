import { Book } from "../book/Book";

export type WishlistItem = Book & {
  wishlistItemId: number;
  addedDate: string;
};
