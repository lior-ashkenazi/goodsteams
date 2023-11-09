import { AxiosResponse } from "axios";
import { Page } from "../models/misc/Page";
import { Book } from "../models/book/Book";

export type GetBookByIdRequest = string;
export type GetBookByIdResponse = AxiosResponse<Book>;

export type GetBooksByTermRequest = {
  term: string;
  type?: string;
  page?: number;
  size?: number;
  sort?: string;
  enabled?: boolean;
};
export type GetBooksByTermResponse = AxiosResponse<Page<Book>>;

export type GetBooksByGenreRequest = {
  genreName: string;
  page?: number;
  size?: number;
};
export type GetBooksByGenreResponse = AxiosResponse<Page<Book>>;
