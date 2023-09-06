import { Page } from "../models/Page";
import { Book } from "../models/Book";

export type GetBookByIdRequest = number;
export type GetBookByIdResponse = Book;

export type GetBooksByTitleRequest = {
  term: string;
  page?: number;
  size?: number;
  sort?: string;
};
export type GetBooksByTitleResponse = Page<Book>;

export type GetBooksByGenreRequest = {
  genreName: string;
  page?: number;
  size?: number;
};
export type GetBooksByGenreResponse = Page<Book>;
