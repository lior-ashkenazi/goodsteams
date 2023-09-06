import { Outlet } from "react-router-dom";

import StorePageHeader from "../../components/store/StorePageHeader";

const StorePage = () => {
  return (
    <div className="mx-auto flex w-[64rem] flex-col items-center">
      <StorePageHeader />
      <Outlet />
    </div>
  );
};

export default StorePage;
