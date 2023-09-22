import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Wishlist } from "../../types/models/Wishlist";
import { wishlistServiceEndpoints } from "../apis/endpoints/wishlistServiceEndpoints";

type WishlistState = {
  wishlist: Wishlist | null;
};

const initialState: WishlistState = {
  wishlist: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (
      state,
      action: PayloadAction<{
        wishlist: Wishlist;
      }>,
    ) => {
      state.wishlist = action.payload.wishlist;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        wishlistServiceEndpoints.endpoints.getWishlist.matchFulfilled,
        (state, action) => {
          state.wishlist = action.payload;
        },
      )
      .addMatcher(
        wishlistServiceEndpoints.endpoints.addWishlistItem.matchFulfilled,
        (state, action) => {
          state.wishlist = action.payload;
        },
      )
      .addMatcher(
        wishlistServiceEndpoints.endpoints.deleteWishlistItem.matchFulfilled,
        (state, action) => {
          state.wishlist = action.payload;
        },
      );
  },
});

export const { setWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
