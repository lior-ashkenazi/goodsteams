import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { TextField, Button } from "@mui/material";
import {
  RootState,
  useCreatePaymentIntentMutation,
  useSubmitPaymentMutation,
} from "../../../store";
import { Cart } from "../../../types/models/cart/Cart";
import { mockStripeConfirmCardPayment } from "../../../utils/paymentUtils";

const PaymentForm = () => {
  const navigate = useNavigate();

  const cart: Cart | null = useSelector((state: RootState) => state.cart.cart);

  const [createPaymentIntent, { isLoading: isCreatingPaymentIntent }] =
    useCreatePaymentIntentMutation();
  const [submitPayment, { isLoading: isSubmittingPayment }] =
    useSubmitPaymentMutation();

  const handlePayment = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    // Mock Stripe payment
    await createPaymentIntent().unwrap();
    await mockStripeConfirmCardPayment();

    // Submit order
    await submitPayment(cart!.cartItems).unwrap();

    navigate("/store/post-payment");
  };

  return (
    <div className="flex flex-col items-center">
      <button
        className="absolute -top-12 right-0 rounded-sm bg-green-600 px-3 py-2 font-semibold text-green-50 transition-colors hover:bg-green-700 active:bg-green-800"
        onClick={() => navigate("/store/cart")}
      >
        Back to Cart
      </button>
      <h1 className="mb-12 self-start text-6xl font-medium tracking-tight">
        Payment Page
      </h1>
      <form className="mb-4 flex w-[32rem] flex-col gap-y-4 rounded-sm bg-green-200 p-10">
        <TextField
          disabled
          label="Full Name"
          value="FAKE NAME"
          variant="filled"
        />
        <TextField
          disabled
          label="Credit Card Number"
          value="4242-4242-4242-4242"
          variant="filled"
        />
        <div className="flex justify-between">
          <TextField
            disabled
            label="Security Code"
            value="123"
            variant="filled"
            className="w-max"
          />
          <TextField
            disabled
            label="Expiration Date"
            value="45/67"
            variant="filled"
            className="w-max"
          />
        </div>
        <Button
          variant="contained"
          type="submit"
          disabled={isCreatingPaymentIntent || isSubmittingPayment}
          className="mt-4 w-max self-end bg-gradient-to-tl from-yellow-500 to-yellow-400 p-4 text-lg normal-case text-yellow-50 shadow-none"
          disableRipple
          onClick={handlePayment}
        >
          {!isCreatingPaymentIntent && !isSubmittingPayment
            ? "Submit Order"
            : "Submitting..."}
        </Button>
      </form>
      <span className="break-words text-lg font-medium italic text-green-800">
        You're very rich customer with unlimited funds and you can pay for any
        book in the store. We mock the payment.
      </span>
    </div>
  );
};

export default PaymentForm;
