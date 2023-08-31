import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

interface HeaderProps {
  // isAuthenticated: false;
}

// const Header = ({ isAuthenticated }: HeaderProps) => {
const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="flex w-full items-center justify-center bg-green-800 p-4">
      <div className="flex w-[48rem] items-center justify-between rounded">
        <span className="flex justify-between gap-x-6">
          <Button onClick={() => navigate("/")} disableRipple>
            <h1 className="text-3xl font-medium tracking-tight text-amber-50">
              Good<span className="font-bold">Steams</span>
            </h1>
          </Button>
          <ul className="flex items-center gap-x-2">
            <li>
              <Button
                className="text-lg font-medium text-amber-50 hover:text-white"
                disableRipple
              >
                Store
              </Button>
            </li>
            <li>
              <Button
                className="text-lg font-medium text-amber-50 hover:text-white"
                disableRipple
              >
                Community
              </Button>
            </li>
          </ul>
        </span>
        <Button
          className="text-lg font-medium text-amber-50 hover:text-white"
          disableRipple
        >
          Log In
        </Button>
      </div>
    </header>
  );
};

export default Header;
