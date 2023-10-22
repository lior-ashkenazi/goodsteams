import { useSelector } from "react-redux";
import { parseISO, compareAsc } from "date-fns";

import { RootState } from "../../../store";
import { Cart } from "../../../types/models/cart/Cart";
import { Wishlist } from "../../../types/models/wishlist/Wishlist";
import { WishlistItem } from "../../../types/models/wishlist/WishlistItem";
import WishlistItemsResult from "./WishlistItemsResult";

interface WishlistItemsResultsProps {
  searchTerm: string;
  sortByTerm: string;
}

const wishlistItemsComparator = {
  Name: (a: WishlistItem, b: WishlistItem) => a.title.localeCompare(b.title),
  Price: (a: WishlistItem, b: WishlistItem) => a.price - b.price,
  Discount: (a: WishlistItem, b: WishlistItem) =>
    b.discountPercent - a.discountPercent,
  "Date Added": (a: WishlistItem, b: WishlistItem) => {
    const dateA = parseISO(a.addedDate);
    const dateB = parseISO(b.addedDate);
    return compareAsc(dateB, dateA);
  },
  "Top Selling": (a: WishlistItem, b: WishlistItem) =>
    b.purchaseCount - a.purchaseCount,
  "Release Date": (a: WishlistItem, b: WishlistItem) => {
    const dateA = parseISO(a.releaseDate);
    const dateB = parseISO(b.releaseDate);
    return compareAsc(dateB, dateA);
  },
  "Review Score": (a: WishlistItem, b: WishlistItem) =>
    b.averageRating - a.averageRating,
};

const WishlistItemsResults = ({
  searchTerm,
  sortByTerm,
}: WishlistItemsResultsProps) => {
  const cart: Cart | null = useSelector((state: RootState) => state.cart.cart);
  const wishlist: Wishlist | null = useSelector(
    (state: RootState) => state.wishlist.wishlist,
  );

  const sortComparator = (
    wishlistItemsComparator as {
      [key: string]: (a: WishlistItem, b: WishlistItem) => number;
    }
  )[sortByTerm];

  return cart && wishlist ? (
    <ul className="flex flex-col gap-y-4">
      {wishlist.wishlistItems
        .filter((wishlistItem) =>
          wishlistItem.title.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .sort(sortComparator)
        .map((wishlistItem, index) => (
          <WishlistItemsResult
            key={index}
            cart={cart}
            wishlistItem={wishlistItem}
          />
        ))}
    </ul>
  ) : (
    <div></div>
  );
};

export default WishlistItemsResults;
