import { Book } from "./Book";

export type WishlistItem = Book & {
  wishlistItemId: number;
  addedDate: string;
};
