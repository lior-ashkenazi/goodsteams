import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";

interface HeaderProps {
  // isAuthenticated: false;
  headerRef: React.MutableRefObject<HTMLDivElement | null>;
}

const Header = ({ headerRef }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname.split("/")[1];

  return (
    <header
      ref={headerRef}
      className="flex w-full items-center justify-center bg-green-800 p-4"
    >
      <div className="flex w-[48rem] items-center justify-between rounded">
        <span className="flex justify-between gap-x-6">
          <Button onClick={() => navigate("/")} disableRipple>
            <h1 className="text-3xl font-medium tracking-tight text-amber-50">
              Good<span className="font-semibold">Steams</span>
            </h1>
          </Button>
          <ul className="flex items-center gap-x-2">
            <li>
              <Button
                className={`text-lg font-medium text-amber-50 hover:text-white ${
                  currentPage === "store" &&
                  "font-semibold text-green-950 underline decoration-2 underline-offset-4 hover:text-green-950"
                }`}
                disableRipple
                onClick={() => navigate("/store")}
              >
                Store
              </Button>
            </li>
            <li>
              <Button
                className={`text-lg font-medium text-amber-50 hover:text-white ${
                  currentPage === "discussions" &&
                  "font-semibold text-green-950 underline decoration-2 underline-offset-4 hover:text-green-950"
                }`}
                disableRipple
              >
                Community
              </Button>
            </li>
          </ul>
        </span>
        <Button
          className={`text-lg font-medium text-amber-50 hover:text-white ${
            (currentPage === "login" || currentPage === "register") &&
            "font-semibold text-green-950 underline decoration-2 underline-offset-4 hover:text-green-950"
          }`}
          disableRipple
          onClick={() => navigate("/login")}
        >
          Log In
        </Button>
      </div>
    </header>
  );
};

export default Header;
