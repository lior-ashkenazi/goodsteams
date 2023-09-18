import { OwnedBook } from "./OwnedBook";

export type Library = {
  libraryId: number;
  userId: number;
  ownedBooks: OwnedBook[];
};
