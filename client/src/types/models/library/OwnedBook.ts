import { Book } from "../book/Book";

export type OwnedBook = Book & {
  ownedBookId: number;
};
