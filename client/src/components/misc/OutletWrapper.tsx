import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface OutletWrapperProps {
  headerHeight: number;
  children: ReactNode;
}

const OutletWrapper = ({ headerHeight, children }: OutletWrapperProps) => {
  const location = useLocation();
  const routesRequiringHeightCalculation = ["/login", "/register"];

  const needsHeightCalculation = routesRequiringHeightCalculation.includes(
    location.pathname,
  );

  return (
    <div
      style={
        needsHeightCalculation
          ? { height: `calc(100% - ${headerHeight}px)` }
          : {}
      }
      className={`flex-grow ${needsHeightCalculation && "flex flex-col"}`}
    >
      {children}
    </div>
  );
};

export default OutletWrapper;
