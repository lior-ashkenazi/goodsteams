import { Book } from "../../types/models/book/Book";
import { WishlistItem } from "../../types/models/wishlist/WishlistItem";
import { calculatePriceAfterDiscount } from "../../utils/priceUtils";
import AddToCartButton from "./AddToCartButton";
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
      <AddToCartButton
        itemInLibrary={itemInLibrary}
        itemInCart={itemInCart}
        handleAddCartItem={handleAddCartItem}
      />
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
