export const calculatePriceAfterDiscount = (
  price: number,
  discountPercent: number,
) => (price - price * (discountPercent / 100)).toFixed(2);
