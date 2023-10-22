import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import cartReducer from "./slices/cartSlice";
import libraryReducer from "./slices/librarySlice";
import wishlistReducer from "./slices/wishlistSlice";

import { reduxApiSlice } from "./apis/reduxApiSlice";
import { authServiceEndpoints } from "./apis/endpoints/authServiceEndpoints";
import { profileServiceEndpoints } from "./apis/endpoints/profileServiceEndpoints";
import { orderServiceEndpoints } from "./apis/endpoints/orderServiceEndpoints";
import { libraryServiceEndpoints } from "./apis/endpoints/libraryServiceEndpoints";
import { wishlistServiceEndpoints } from "./apis/endpoints/wishlistServiceEndpoints";

const NODE_ENV = import.meta.env.VITE_NODE_ENV as string;

const store = configureStore({
  reducer: {
    [reduxApiSlice.reducerPath]: reduxApiSlice.reducer,
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    library: libraryReducer,
    wishlist: wishlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxApiSlice.middleware),
  devTools: NODE_ENV === "development",
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLazyAuthUserQuery,
  useAuthUserQuery,
  useLogoutUserMutation,
} = authServiceEndpoints;

export const {
  useGetProfileSecureQuery,
  useLazyGetProfileSecureQuery,
  useGetProfilePublicQuery,
  useUpdateProfileMutation,
} = profileServiceEndpoints;

export const {
  useGetCartQuery,
  useLazyGetCartQuery,
  useAddCartItemMutation,
  useDeleteCartItemMutation,
  useCreatePaymentIntentMutation,
  useSubmitPaymentMutation,
} = orderServiceEndpoints;

export const { useGetLibraryQuery, useLazyGetLibraryQuery } =
  libraryServiceEndpoints;

export const {
  useGetWishlistQuery,
  useLazyGetWishlistQuery,
  useAddWishlistItemMutation,
  useDeleteWishlistItemMutation,
} = wishlistServiceEndpoints;

export { clearToast } from "./slices/cartSlice";
