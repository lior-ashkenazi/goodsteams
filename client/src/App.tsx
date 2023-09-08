import { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useLazyAuthUserQuery, useLazyGetProfileQuery } from "./store";
import Header from "./components/misc/Header";

const App = () => {
  const [authQuery] = useLazyAuthUserQuery();
  const [getProfile] = useLazyGetProfileQuery();

  const navigate = useNavigate();

  const headerRef = useRef<HTMLDivElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await authQuery().unwrap();
        await getProfile().unwrap();
      } catch {
        navigate("/");
      }
    };

    fetchData();
  }, [authQuery, getProfile, navigate]);

  useEffect(() => {
    // this is an edge case handling when web-app
    // is opened in multiple windows and a logout occurs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token") {
        if (!e.newValue) {
          // user has logged out
          navigate("/");
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [headerRef]);

  return (
    <div className="h-screen w-screen min-w-[75rem] bg-gradient-to-b from-emerald-600 to-amber-100 text-white">
      <Header headerRef={headerRef} />
      <div
        className="overflow-y-auto"
        style={{ height: `calc(100% - ${headerHeight}px)` }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default App;
