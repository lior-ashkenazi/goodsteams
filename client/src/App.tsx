import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/misc/Header";

const App = () => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [headerRef]);

  return (
    <div className="h-screen w-screen min-w-[75rem] bg-gradient-to-b from-emerald-600 to-amber-100 text-white">
      <Header headerRef={headerRef} />
      <div
        className="flex w-full items-center justify-center overflow-y-auto"
        style={{ height: `calc(100% - ${headerHeight}px)` }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default App;
