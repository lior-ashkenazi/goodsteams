import { Outlet } from "react-router-dom";

const CommunityPage = () => {
  return (
    <div className="mx-auto my-16 flex w-[64rem] items-center">
      <Outlet />
    </div>
  );
};

export default CommunityPage;
