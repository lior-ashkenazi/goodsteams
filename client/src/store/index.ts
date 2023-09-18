import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import cartReducer from "./slices/cartSlice";
import libraryReducer from "./slices/librarySlice";

import { apiSlice } from "./apis/apiSlice";
import { authServiceEndpoints } from "./apis/endpoints/authServiceEndpoints";
import { profileServiceEndpoints } from "./apis/endpoints/profileServiceEndpoints";
import { bookServiceEndpoints } from "./apis/endpoints/bookServiceEndpoints";
import { orderServiceEndpoints } from "./apis/endpoints/orderServiceEndpoints";
import { libraryServiceEndpoints } from "./apis/endpoints/libraryServiceEndpoints";

const NODE_ENV = import.meta.env.VITE_NODE_ENV as string;

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    library: libraryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
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
  useUpdateProfileMutation,
} = profileServiceEndpoints;

export const {
  useGetBooksByTermQuery,
  useGetBooksByGenreQuery,
  useGetBookByIdQuery,
} = bookServiceEndpoints;

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

export { clearToast } from "./slices/cartSlice";
