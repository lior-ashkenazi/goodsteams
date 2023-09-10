import { Genre } from "./Genre";

export type Book = {
  id: number;
  title: string;
  author: string;
  synopsis: string;
  coverImageUrl: string;
  price: number;
  discountPercent: number;
  releaseDate: string;
  averageRating: number;
  ratingCount: number;
  reviewCount: number;
  purchaseCount: number;
  publisher: string;
  pageCount: number;
  language: string;
  ISBN: string;
  genres: Genre[];
};
