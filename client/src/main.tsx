import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App.tsx";
import StorePage from "./pages/store/StorePage.tsx";
import "./index.css";
import { StyledEngineProvider } from "@mui/material";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import LoginPage from "./pages/login/LoginPage.tsx";
import RegisterPage from "./pages/register/RegisterPage.tsx";
import StoreHomePage from "./pages/store/home/StoreHomePage.tsx";
import SearchPage from "./pages/store/search/SearchPage.tsx";
import GenrePage from "./pages/store/genre/GenrePage.tsx";
import BookPage from "./pages/store/book/BookPage.tsx";
import CartPage from "./pages/store/cart/CartPage.tsx";
import WishlistPage from "./pages/store/wishlist/WishlistPage.tsx";
import PaymentPage from "./pages/store/payment/PaymentPage.tsx";
import PostPaymentPage from "./pages/store/payment/PostPaymentPage.tsx";
import CommunityPage from "./pages/community/CommunityPage.tsx";
import CommunityHomePage from "./pages/community/home/CommunityHomePage.tsx";
import BookCommunityOutlet from "./components/community/book/BookCommunityOutlet.tsx";
import BookCommunityPage from "./pages/community/book/book-community/BookCommunityPage.tsx";
import BookDiscussionPage from "./pages/community/book/book-discussion/BookDiscussionPage.tsx";
import ProfilePage from "./pages/profile/ProfilePage.tsx";
import ProfilePublicPage from "./pages/profile/public/ProfilePublicPage.tsx";
import ProtectedRoute from "./pages/ProtectedRoute.tsx";
import ProfileEditPage from "./pages/profile/edit/ProfileEditPage.tsx";

const NODE_ENV = import.meta.env.VITE_NODE_ENV as string;

if (NODE_ENV === "production") disableReactDevTools();

const router = createMemoryRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Navigate replace to="/store" />} />
      <Route path="profile" element={<ProfilePage />}>
        <Route path=":userId" element={<ProfilePublicPage />} />
        <Route
          path="edit"
          element={
            <ProtectedRoute>
              <ProfileEditPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="store" element={<StorePage />}>
        <Route index element={<StoreHomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="book/:bookId" element={<BookPage />} />
        <Route path="genre/:genreName" element={<GenrePage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="payment" element={<PaymentPage />} />
        <Route path="post-payment" element={<PostPaymentPage />} />
      </Route>
      <Route path="community" element={<CommunityPage />}>
        <Route path="home" element={<CommunityHomePage />} />
        <Route path="book" element={<BookCommunityOutlet />}>
          <Route path=":bookId" element={<BookCommunityPage />} />
          <Route
            path=":bookId/discussion/:discussionId"
            element={<BookDiscussionPage />}
          />
        </Route>
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Route>,
  ),
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </StyledEngineProvider>
    </React.StrictMode>
  </Provider>,
);
