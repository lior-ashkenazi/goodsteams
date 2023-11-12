import { Outlet } from "react-router-dom";

const ProfilePage = () => {
  return (
    <div className="mx-auto flex w-[64rem] items-center">
      <Outlet />
    </div>
  );
};

export default ProfilePage;
