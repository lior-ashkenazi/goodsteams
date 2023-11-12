import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { RootState } from "../store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated: boolean | null = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return !isAuthenticated ? <Navigate to="/" /> : children;
};

export default ProtectedRoute;
