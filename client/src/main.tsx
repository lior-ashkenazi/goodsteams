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
import App from "./App.tsx";
import StorePage from "./pages/store/StorePage.tsx";
import "./index.css";
import { StyledEngineProvider } from "@mui/material";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import LoginPage from "./pages/login/LoginPage.tsx";
import RegisterPage from "./pages/register/RegisterPage.tsx";
import SearchPage from "./pages/store/search/SearchPage.tsx";
import GenrePage from "./pages/store/genre/GenrePage.tsx";
import BookPage from "./pages/store/book/BookPage.tsx";
import CartPage from "./pages/store/cart/CartPage.tsx";
import PaymentPage from "./pages/store/payment/PaymentPage.tsx";
import PostPaymentPage from "./pages/store/payment/PostPaymentPage.tsx";

const NODE_ENV = import.meta.env.VITE_NODE_ENV as string;

if (NODE_ENV === "production") disableReactDevTools();

const router = createMemoryRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Navigate replace to="/store" />} />
      <Route path="store" element={<StorePage />}>
        <Route path="search" element={<SearchPage />} />
        <Route path="book/:bookId" element={<BookPage />} />
        <Route path="genre/:genreName" element={<GenrePage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="payment" element={<PaymentPage />} />
        <Route path="post-payment" element={<PostPaymentPage />} />
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <RouterProvider router={router} />
      </StyledEngineProvider>
    </React.StrictMode>
  </Provider>,
);
