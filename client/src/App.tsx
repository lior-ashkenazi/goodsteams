import { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  RootState,
  useLazyAuthUserQuery,
  useLazyGetCartQuery,
  useLazyGetLibraryQuery,
  useLazyGetProfileSecureQuery,
  useLazyGetWishlistQuery,
} from "./store";
import Header from "./components/misc/Header";
import OutletWrapper from "./components/misc/OutletWrapper";

const App = () => {
  const navigate = useNavigate();

  const [authQuery] = useLazyAuthUserQuery();
  const [getProfileSecure] = useLazyGetProfileSecureQuery();
  const [getCart] = useLazyGetCartQuery();
  const [getLibrary] = useLazyGetLibraryQuery();
  const [getWishlist] = useLazyGetWishlistQuery();

  const token: string | null = useSelector(
    (state: RootState) => state.auth.token,
  );

  const headerRef = useRef<HTMLDivElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        await authQuery().unwrap();

        await getCart().unwrap();
        await getLibrary().unwrap();
        await getWishlist().unwrap();

        await getProfileSecure().unwrap();
      } catch {
        navigate("/");
      }
    };

    fetchData();
  }, [
    authQuery,
    getProfileSecure,
    getCart,
    getLibrary,
    getWishlist,
    navigate,
    token,
  ]);

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
    <div className="flex min-h-screen w-full min-w-[75rem] flex-col bg-gradient-to-b from-emerald-600 to-amber-100 text-green-50">
      <Header headerRef={headerRef} />
      <OutletWrapper headerHeight={headerHeight}>
        <Outlet />
      </OutletWrapper>
    </div>
  );
};

export default App;
