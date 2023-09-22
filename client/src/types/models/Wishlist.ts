import { WishlistItem } from "./WishlistItem";

export type Wishlist = {
  wishlistId: number;
  userId: number;
  wishlistItems: WishlistItem[];
};
