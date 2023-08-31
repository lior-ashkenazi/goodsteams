import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.tsx";
import HomePage from "./pages/home/HomePage.tsx";
import "./index.css";
import { StyledEngineProvider } from "@mui/material";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

const NODE_ENV = import.meta.env.VITE_NODE_ENV as string;

if (NODE_ENV === "production") disableReactDevTools();

const router = createMemoryRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <Provider store={store}>
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <RouterProvider router={router} />
    </StyledEngineProvider>
  </React.StrictMode>
  // </Provider>
);
