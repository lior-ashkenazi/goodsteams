import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  createTheme,
  ThemeProvider,
  Button,
  Rating,
  TextField,
  Divider,
  SpeedDial,
  SpeedDialAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { RootState, useAddCartItemMutation } from "../../../../store";
import {
  usePostReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useGetUserReviewQuery,
} from "../../../../apis/reviewServiceApi";
import { Library } from "../../../../types/models/library/Library";
import { Book } from "../../../../types/models/book/Book";
import { Cart } from "../../../../types/models/cart/Cart";
import { formatDate } from "../../../../utils/dateUtils";
import AddToCartButton from "../../../misc/AddToCartButton";

const userReviewFormValidationSchema = z.object({
  rating: z.number().min(1, { message: "Rating must be filled." }),
  bodyText: z.string().min(1, { message: "Review body must not be empty." }),
});

type UserReviewFormValidationSchema = z.infer<
  typeof userReviewFormValidationSchema
>;

const textFieldTheme = createTheme({
  palette: {
    primary: {
      main: "#ca8a04",
    },
  },
});

const deleteReviewDialogActionsTheme = createTheme({
  palette: {
    primary: {
      main: "#16a34a",
    },
  },
});

interface ReviewUserReviewProps {
  book: Book;
}

const ReviewUserReview = ({ book }: ReviewUserReviewProps) => {
  const navigate = useNavigate();

  const isAuthenticated: boolean | null = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const userId: number | null = useSelector(
    (state: RootState) => state.profile.userId,
  );
  const username: string | null = useSelector(
    (state: RootState) => state.profile.username,
  );
  const avatarUrl: string | null = useSelector(
    (state: RootState) => state.profile.avatarUrl,
  );
  const library: Library | null = useSelector(
    (state: RootState) => state.library.library,
  );
  const cart: Cart | null = useSelector((state: RootState) => state.cart.cart);

  const bookId = book.bookId;
  const { data, refetch: refetchUserReview } = useGetUserReviewQuery(
    { bookId, userId: userId ?? 0 },
    { enabled: isAuthenticated },
  );

  const userReview = data?.data;

  const postReview = usePostReviewMutation;
  const updateReview = useUpdateReviewMutation;
  const deleteReview = useDeleteReviewMutation;
  const [addCartItem] = useAddCartItemMutation();

  const [bookInLibrary, setBookInLibrary] = useState<boolean>(false);
  const [bookInCart, setBookInCart] = useState<boolean>(false);

  const [isUserReviewUpdate, setIsUserReviewUpdate] = useState<boolean>(false);

  const [rating, setRating] = useState<number>(0);

  const [isBodyTextExpanded, setIsBodyTextExpanded] = useState<boolean>(false);
  const [isBodyTextOverflow, setIsBodyTextOverflow] = useState<boolean>(false);
  const bodyTextRef = useRef<HTMLDivElement | null>(null);

  const [isSpeedDialOpen, setIsSpeedDialOpen] = useState<boolean>(false);
  const [isDeleteReviewDialogOpen, setIsDeleteReviewDialogOpen] =
    useState<boolean>(false);

  const handleAddCartItem = async () => {
    if (!cart || !book) return;
    else if (bookInCart) navigate("/store/cart");
    else {
      const addCartItemDTO = {
        cartId: cart.cartId,
        bookId: book.bookId,
      };

      await addCartItem(addCartItemDTO).unwrap;
      navigate("/store/cart");
    }
  };

  const handleEditReviewClick = () => {
    setIsUserReviewUpdate(true);
  };

  const handleDeleteReviewClick = async () => {
    await deleteReview(book.bookId).mutateAsync();
    await refetchUserReview();
  };

  const {
    control,
    register,
    handleSubmit,
    formState: {
      errors: userReviewFormErrors,
      isSubmitting: isSubmittingUserReview,
    },
  } = useForm<UserReviewFormValidationSchema>({
    resolver: zodResolver(userReviewFormValidationSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    if (library && cart) {
      setBookInCart(
        cart.cartItems.some((cartItem) => cartItem.bookId === book.bookId),
      );
      setBookInLibrary(
        library.ownedBooks.some(
          (ownedBook) => ownedBook.bookId === book.bookId,
        ),
      );
    }
  }, [library, cart, book]);

  useEffect(() => {
    if (userReview) setRating(userReview.rating);
  }, [userReview]);

  useEffect(() => {
    const checkOverflow = () => {
      if (bodyTextRef.current) {
        setIsBodyTextOverflow(
          bodyTextRef.current.scrollHeight > bodyTextRef.current.clientHeight,
        );
      }
    };
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [bodyTextRef]);

  const onSubmitHandler: SubmitHandler<UserReviewFormValidationSchema> = async (
    data,
  ) => {
    // For TypeScript
    if (!userId) return;

    const { rating, bodyText } = data;
    const userReviewCredentials = { bookId, userId, rating, bodyText };

    if (!isUserReviewUpdate) {
      await postReview(userReviewCredentials).mutateAsync();
    } else {
      // isUserReviewUpdate === true
      await updateReview(userReviewCredentials).mutateAsync();
      setIsUserReviewUpdate(false);
    }
    await refetchUserReview();
  };

  const renderUserReview = () => {
    if (!isAuthenticated) return renderSignInMode();
    else if (!bookInLibrary) return renderAddToCartMode();
    // For each time the state of isUserReviewUpdate is changed
    // then renderUserReview should be executed
    else if (!userReview || isUserReviewUpdate) return renderEditMode();
    else return renderShowMode();
  };

  const renderSignInMode = () => {
    return (
      <div className="flex h-48 items-center justify-center gap-x-4 break-words text-2xl uppercase text-green-800 backdrop-blur-3xl">
        <span className="font-medium">Already have an account?</span>
        <Button
          variant="text"
          className="p-0 text-2xl text-yellow-500 underline hover:bg-yellow-100"
          onClick={() => navigate("/login")}
          disableRipple
        >
          Sign In
        </Button>
      </div>
    );
  };

  const renderAddToCartMode = () => {
    return (
      <div className="flex h-48 flex-col items-center justify-center break-words text-2xl uppercase text-green-800">
        <span className="mb-6 font-medium">{`Buy ${book.title} in order the review it`}</span>
        <AddToCartButton
          itemInCart={bookInCart}
          handleAddCartItem={handleAddCartItem}
          large
          uppercase
        />
      </div>
    );
  };

  const renderEditMode = () => {
    return (
      <form className="flex" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="mr-6 flex flex-col justify-start gap-y-2">
          <img src={avatarUrl ?? ""} aria-label="user-review-avatar" />
          <span className="text-center text-xl font-medium text-yellow-900">
            {username}
          </span>
        </div>
        <div className="flex flex-grow flex-col gap-y-4">
          <Controller
            name="rating"
            control={control}
            defaultValue={rating}
            render={({ field }) => (
              <Rating
                className="w-max text-5xl"
                value={rating}
                onChange={(_e, newRating) => {
                  setRating(newRating ?? 0);
                  field.onChange(newRating ?? 0);
                }}
              />
            )}
          />
          <div className="flex gap-x-4">
            <ThemeProvider theme={textFieldTheme}>
              <TextField
                multiline
                rows={8}
                fullWidth
                className="bg-yellow-50"
                {...register("bodyText")}
              />
            </ThemeProvider>
            <Button
              variant="contained"
              className="self-end bg-green-600 text-green-50 transition-colors hover:bg-green-700 active:bg-green-800"
              disableRipple
              disableElevation
              type="submit"
            >
              {isSubmittingUserReview ? "Submitting" : "Post a Review"}
            </Button>
          </div>
          <ul className="text-red-500">
            {Object.values(userReviewFormErrors).map((error, index) => (
              <li key={index}>{error.message}</li>
            ))}
          </ul>
        </div>
      </form>
    );
  };

  const renderShowMode = () => {
    // For Typescript, renderShowMode will only be called
    // when userReview is not null
    if (!userReview) return;

    return (
      <div className="flex h-48 flex-grow flex-col gap-y-2">
        <span className="relative flex w-full items-center rounded-sm bg-yellow-200 p-1">
          <Rating
            className="mr-4 text-4xl"
            value={rating}
            precision={1}
            readOnly
          />
          <span className="text-xl">{rating}/5 Stars</span>
          <SpeedDial
            ariaLabel="SpeedDial"
            direction="down" // Set the opening direction to down
            className="absolute -top-1.5 right-0"
            sx={{
              "& .MuiFab-root": {
                boxShadow:
                  "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
              },
              "& .MuiFab-primary": {
                backgroundColor: "#fde047",
                transition: "background-color 0.15s ease-in-out",
                "&:hover": { backgroundColor: "#facc15" },
              },
            }}
            open={isSpeedDialOpen}
            icon={<MoreVertIcon />}
            onClose={() => setIsSpeedDialOpen(false)}
            onOpen={() => setIsSpeedDialOpen(true)}
          >
            <SpeedDialAction
              key={"Edit Review"}
              icon={<EditIcon />}
              tooltipTitle={"Edit Review"}
              onClick={handleEditReviewClick}
              className="transition-colors hover:bg-yellow-300"
            />
            <SpeedDialAction
              key={"Delete Review"}
              icon={<DeleteIcon />}
              tooltipTitle={"Delete Review"}
              onClick={() => setIsDeleteReviewDialogOpen(true)}
              className="transition-colors hover:bg-yellow-300"
            />
            {isDeleteReviewDialogOpen && (
              <Dialog
                open={isDeleteReviewDialogOpen}
                onClose={() => setIsDeleteReviewDialogOpen(false)}
                aria-labelledby="alert-delete-review-dialog-title"
                aria-describedby="alert-delete-review-dialog-description"
              >
                <DialogTitle id="alert-delete-review-dialog-title">
                  {"Delete Review"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-delete-review-dialog-description">
                    Are you sure you want to delete your review?
                  </DialogContentText>
                </DialogContent>
                <ThemeProvider theme={deleteReviewDialogActionsTheme}>
                  <DialogActions>
                    <Button
                      onClick={() => setIsDeleteReviewDialogOpen(false)}
                      disableRipple
                    >
                      No
                    </Button>
                    <Button
                      onClick={handleDeleteReviewClick}
                      autoFocus
                      disableRipple
                    >
                      Yes
                    </Button>
                  </DialogActions>
                </ThemeProvider>
              </Dialog>
            )}
          </SpeedDial>
        </span>
        <div className="flex flex-col">
          <span className="text-sm text-yellow-500">
            {`${
              userReview.createdAt === userReview.updatedAt
                ? "POSTED:"
                : "EDITED:"
            } ${formatDate(userReview.updatedAt)}`}
          </span>
          <span className="relative">
            <p
              ref={bodyTextRef}
              className={`overflow-hidden text-xl text-yellow-900 ${
                isBodyTextExpanded ? "" : "max-h-36"
              }`}
            >
              {userReview.bodyText}
            </p>
            {isBodyTextOverflow && (
              <div className="absolute top-32 h-6 w-full bg-gradient-to-b from-transparent to-yellow-100 to-60% opacity-90"></div>
            )}
          </span>
          {isBodyTextOverflow && (
            <Button
              variant="text"
              onClick={() => setIsBodyTextExpanded(!isBodyTextExpanded)}
              className="self-end p-0 text-xs text-green-400 hover:bg-transparent"
              disableRipple
            >
              {isBodyTextExpanded ? "Read Less" : "Read More"}
            </Button>
          )}
        </div>
        {userReview.helpfulCount > 0 ||
          (userReview.funnyCount > 0 && <Divider />)}
        <span className="text-sm text-yellow-500">
          {userReview.helpfulCount > 0 && (
            <span>
              {userReview.helpfulCount}{" "}
              {`${userReview.helpfulCount === 1 ? "person" : "people"}`} found
              this review helpful
            </span>
          )}
          <span className="flex flex-col">
            {userReview.funnyCount > 0 && (
              <span>
                {userReview.funnyCount}{" "}
                {`${userReview.funnyCount === 1 ? "person" : "people"}`} found
                this review funny
              </span>
            )}
          </span>
        </span>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-y-4">
      <h3 className="text-4xl font-semibold tracking-tight">My Review</h3>
      <div className="rounded-sm bg-yellow-100 p-6">{renderUserReview()}</div>
    </div>
  );
};

export default ReviewUserReview;
