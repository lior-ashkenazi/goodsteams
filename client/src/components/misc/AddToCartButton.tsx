import { Button } from "@mui/material";

interface AddToCartButtonProps {
  itemInLibrary?: boolean;
  itemInCart: boolean;
  handleAddCartItem: () => Promise<void>;
  large?: boolean;
  uppercase?: boolean;
}

const AddToCartButton = ({
  itemInLibrary,
  itemInCart,
  handleAddCartItem,
  large,
  uppercase,
}: AddToCartButtonProps) => {
  return (
    <Button
      variant="contained"
      className={`bg-gradient-to-tl from-green-400 to-green-300 p-3 text-green-50 shadow-none transition-colors hover:from-green-500 hover:to-green-400 active:from-green-600 active:to-green-500 ${
        large && "text-2xl"
      } ${!uppercase ? "normal-case" : "uppercase"}`}
      disableRipple
      onClick={handleAddCartItem}
      disabled={itemInLibrary}
    >
      {itemInLibrary ? "In Library" : itemInCart ? "In Cart" : "Add to Cart"}
    </Button>
  );
};

export default AddToCartButton;
