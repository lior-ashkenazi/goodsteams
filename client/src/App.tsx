import React from "react";
import { Outlet } from "react-router-dom";
import Button from "@mui/material/Button";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="h-screen w-screen min-w-[75rem] bg-gradient-to-b from-emerald-600 to-amber-100 text-white">
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
