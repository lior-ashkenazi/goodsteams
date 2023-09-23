import { Button } from "@mui/material";

import { Book } from "../../types/models/Book";
import { WishlistItem } from "../../types/models/WishlistItem";
import { calculatePriceAfterDiscount } from "../../utils/priceUtils";
calculatePriceAfterDiscount;

interface AddToCartComponentProps {
  item: Book | WishlistItem;
  itemInLibrary?: boolean;
  itemInCart: boolean;
  handleAddCartItem: () => Promise<void>;
}

const AddToCartComponent = ({
  item,
  itemInLibrary,
  itemInCart,
  handleAddCartItem,
}: AddToCartComponentProps) => {
  return (
    <div className="flex flex-row-reverse items-center bg-yellow-300 p-1">
      <Button
        variant="contained"
        className="bg-gradient-to-tl from-green-400 to-green-300 p-3 normal-case text-green-50 shadow-none transition-colors hover:from-green-500 hover:to-green-400 active:from-green-600 active:to-green-500"
        disableRipple
        onClick={handleAddCartItem}
        disabled={itemInLibrary}
      >
        {itemInLibrary ? "In Library" : itemInCart ? "In Cart" : "Add to Cart"}
      </Button>
      <div
        className={`mr-1 bg-yellow-200 ${
          item.discountPercent > 0 ? "px-4 py-1.5" : "px-4 py-3"
        }`}
      >
        {item.discountPercent > 0 ? (
          <span className="flex flex-col text-right">
            <span className="text-xs text-yellow-600 line-through">
              {item.price}$
            </span>
            <span className="text-sm text-green-500">
              {calculatePriceAfterDiscount(item.price, item.discountPercent)}$
            </span>
          </span>
        ) : (
          <span className="text-sm text-green-800">{item.price}$</span>
        )}
      </div>
      {item.discountPercent > 0 && (
        <span className="bg-green-400 px-3 py-2 text-2xl font-bold text-green-50">
          -{item.discountPercent}%
        </span>
      )}
    </div>
  );
};

export default AddToCartComponent;