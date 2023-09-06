import { Genre } from "./Genre";

export type Book = {
  id: number;
  title: string;
  author: string;
  description: string;
  coverImageUrl: string;
  price: number;
  discountPercent: number;
  releaseDate: string;
  averageRating: number;
  reviewCount: number;
  purchaseCount: number;
  publisher: string;
  pageCount: number;
  language: string;
  ISBN: string;
  genres: Genre[];
};
