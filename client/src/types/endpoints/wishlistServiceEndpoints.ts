import { Wishlist } from "../models/Wishlist";

export type GetWishlistRequest = void;
export type GetWishlistResponse = Wishlist;

export type AddWishlistItemRequest = {
  wishlistId: number;
  bookId: number;
  title: string;
  author: string;
  coverImageUrl: string;
  price: number;
  discountPercent: number;
  releaseDate: string;
  averageRating: number;
  purchaseCount: number;
};
export type AddWishlistItemResponse = Wishlist;

export type DeleteWishlistItemRequest = string;
export type DeleteWishlistItemResponse = Wishlist;
