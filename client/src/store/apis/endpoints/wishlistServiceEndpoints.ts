import {
  GetWishlistRequest,
  GetWishlistResponse,
  AddWishlistItemRequest,
  AddWishlistItemResponse,
  DeleteWishlistItemResponse,
  DeleteWishlistItemRequest,
} from "../../../types/endpoints/wishlistServiceEndpoints";
import { apiSlice } from "../apiSlice";

export const wishlistServiceEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query<GetWishlistResponse, GetWishlistRequest>({
      query: () => `wishlist/`,
      providesTags: ["Wishlist"],
    }),
    addWishlistItem: builder.mutation<
      AddWishlistItemResponse,
      AddWishlistItemRequest
    >({
      query: (wishlistItemDTO) => ({
        url: "wishlist/wishlist-item",
        method: "POST",
        body: wishlistItemDTO,
      }),
    }),
    deleteWishlistItem: builder.mutation<
      DeleteWishlistItemResponse,
      DeleteWishlistItemRequest
    >({
      query: (wishlistItemId) => ({
        url: `wishlist/wishlist-item/${wishlistItemId}`,
        method: "DELETE",
      }),
    }),
  }),
});
