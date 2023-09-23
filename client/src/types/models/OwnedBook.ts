import { Book } from "./Book";

export type OwnedBook = Book & {
  ownedBookId: number;
};
