import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import cartReducer from "./slices/cartSlice";

import { apiSlice } from "./apis/apiSlice";
import { authServiceEndpoints } from "./apis/endpoints/authServiceEndpoints";
import { profileServiceEndpoints } from "./apis/endpoints/profileServiceEndpoints";
import { bookServiceEndpoints } from "./apis/endpoints/bookServiceEndpoints";
import { orderServiceEndpoints } from "./apis/endpoints/orderServiceEndpoints";

const NODE_ENV = import.meta.env.VITE_NODE_ENV as string;

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
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
  useLazyGetProfileSecureQuery,
  useGetProfileSecureQuery,
  useUpdateProfileMutation,
} = profileServiceEndpoints;

export const {
  useGetBooksByTermQuery,
  useGetBooksByGenreQuery,
  useGetBookByIdQuery,
} = bookServiceEndpoints;

export const { useGetCartQuery, useLazyGetCartQuery } = orderServiceEndpoints;
