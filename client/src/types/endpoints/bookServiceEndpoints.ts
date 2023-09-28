import { Page } from "../models/misc/Page";
import { Book } from "../models/book/Book";

export type GetBookByIdRequest = string;
export type GetBookByIdResponse = Book;

export type GetBooksByTermRequest = {
  term: string;
  type?: string;
  page?: number;
  size?: number;
  sort?: string;
};
export type GetBooksByTermResponse = Page<Book>;

export type GetBooksByGenreRequest = {
  genreName: string;
  page?: number;
  size?: number;
};
export type GetBooksByGenreResponse = Page<Book>;
