import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextField, Button, ThemeProvider, createTheme } from "@mui/material";

import { RootState } from "../../../store";
import { usePostDiscussionMutation } from "../../../apis/communityServiceApi";
import { Book } from "../../../types/models/book/Book";

interface BookDiscussionsPostDiscussionDivInterface {
  book: Book;
  open: boolean;
}

const postDiscussionValidationSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
});

type PostDiscussionValidationSchema = z.infer<
  typeof postDiscussionValidationSchema
>;

const textFieldTheme = createTheme({
  palette: {
    primary: {
      main: "#14532d",
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: "#dcfce7", // Equivalent to Tailwind's bg-green-50
          "&::placeholder": {
            color: "rgba(0, 0, 0, 0.6)", // Default placeholder color or any color you desire
            opacity: 1, // To make sure it's fully visible
          },
        },
      },
    },
  },
});

const BookDiscussionsPostDiscussionDiv = ({
  book,
  open,
}: BookDiscussionsPostDiscussionDivInterface) => {
  const navigate = useNavigate();

  const postDiscussion = usePostDiscussionMutation();

  const isAuthenticated: boolean | null = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<PostDiscussionValidationSchema>({
    resolver: zodResolver(postDiscussionValidationSchema),
    mode: "onBlur",
  });

  const [watchedTitle, watchedContent] = watch(["title", "content"]);

  const onSubmitHandler: SubmitHandler<PostDiscussionValidationSchema> = async (
    data,
  ) => {
    const discussionDto = data;
    const bookId = book.bookId;

    await postDiscussion.mutateAsync({ bookId, ...discussionDto });
  };

  return (
    <div
      className={`${
        open ? `mb-4 ${isAuthenticated ? "h-80" : "h-16"} py-1` : "h-0"
      } overflow-hidden rounded-sm bg-green-600 px-2 transition-all duration-1000`}
    >
      <span className="text-xs uppercase">Start a New Discussion</span>
      {isAuthenticated ? (
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="mt-4 flex flex-col text-green-50"
        >
          <ThemeProvider theme={textFieldTheme}>
            <TextField
              {...(errors.title ? { error: true } : {})}
              className="rounded-sm bg-green-700"
              fullWidth
              size="small"
              id="title"
              placeholder="Enter a title"
              {...register("title")}
              helperText={errors.title ? errors.title?.message : " "}
              FormHelperTextProps={{
                style: {
                  background: "#16a34a",
                  margin: 0, // Cancel the margin
                  paddingTop: "3px", // Set the upper padding to 3px
                  paddingLeft: "14px", // Set the left padding to 14px
                  paddingRight: "14px", // Set the right padding to 14px
                },
              }}
            />

            <TextField
              {...(errors.content ? { error: true } : {})}
              className="rounded-sm bg-green-700"
              multiline
              rows={4}
              fullWidth
              size="small"
              id="content"
              placeholder="Say something"
              {...register("content")}
              helperText={errors.content ? errors.content?.message : " "}
              FormHelperTextProps={{
                style: {
                  background: "#16a34a",
                  margin: 0, // Cancel the margin
                  paddingTop: "3px", // Set the upper padding to 3px
                  paddingLeft: "14px", // Set the left padding to 14px
                  paddingRight: "14px", // Set the right padding to 14px
                },
              }}
            />
            <Button
              variant="contained"
              className={`mt-1 h-12 w-36 self-end normal-case shadow-none ${
                !watchedTitle || !watchedContent
                  ? "bg-gray-300 text-gray-400"
                  : "bg-yellow-300 text-yellow-600 hover:bg-yellow-400 active:bg-yellow-500"
              }`}
              type="submit"
              disabled={isSubmitting || !watchedTitle || !watchedContent}
            >
              Post Discussion
            </Button>
          </ThemeProvider>
        </form>
      ) : (
        <div className="p-1">
          You need to{" "}
          <button className="text-green-50" onClick={() => navigate("/login")}>
            sign in
          </button>{" "}
          or{" "}
          <button
            className="text-green-50"
            onClick={() => navigate("/register")}
          >
            create an account
          </button>{" "}
          to do that.
        </div>
      )}
    </div>
  );
};

export default BookDiscussionsPostDiscussionDiv;
