import { useSelector } from "react-redux";

import { RootState } from "../../../store";
import WishlistItemsSection from "../../../components/store/wishlist/WishlistItemsSection";

const WishlistPage = () => {
  const username: string | null = useSelector(
    (state: RootState) => state.profile.username,
  );
  const avatarUrl: string | null = useSelector(
    (state: RootState) => state.profile.avatarUrl,
  );

  return username && avatarUrl ? (
    <div className="mb-8 mt-10 w-full">
      <div className="mb-8 flex items-center">
        <img src={avatarUrl} className="mr-4 rounded-sm" />
        <h1 className="truncate text-4xl font-medium text-green-700">
          {username.toUpperCase()}'s WISHLIST
        </h1>
      </div>
      <WishlistItemsSection />
    </div>
  ) : (
    <div></div>
  );
};

export default WishlistPage;
