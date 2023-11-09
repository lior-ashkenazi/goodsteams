import { useNavigate } from "react-router-dom";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextField, Button, ThemeProvider, createTheme } from "@mui/material";

import { usePostCommentMutation } from "../../../../apis/communityServiceApi";
import { Book } from "../../../../types/models/book/Book";
import { Discussion } from "../../../../types/models/community/Discussion";
import { GetDiscussionResponse } from "../../../../types/apis/communityServiceApi";

interface BookDiscussionPostCommentProps {
  book: Book;
  discussion: Discussion;
  refetchDiscussion: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<GetDiscussionResponse, Error>>;
}

const postCommentValidationScheme = z.object({
  content: z.string().min(1, { message: "Content is required" }),
});

type PostCommentValidationScheme = z.infer<typeof postCommentValidationScheme>;

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

const BookDiscussionPostComment = ({
  book,
  discussion,
  refetchDiscussion,
}: BookDiscussionPostCommentProps) => {
  const navigate = useNavigate();

  const postComment = usePostCommentMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<PostCommentValidationScheme>({
    resolver: zodResolver(postCommentValidationScheme),
    mode: "onBlur",
  });

  const [watchedContent] = watch(["content"]);

  const onSubmitHandler: SubmitHandler<PostCommentValidationScheme> = async (
    data,
  ) => {
    const commentDto = data;
    const bookId = book.bookId;
    const discussionId = discussion.discussionId;

    await postComment.mutateAsync({ bookId, discussionId, ...commentDto });

    const discussionResponse = await refetchDiscussion();
    let lastPage = discussionResponse.data?.data.comments.totalPages;
    lastPage = lastPage ? lastPage - 1 : 0;

    navigate(
      `/community/book/${bookId}/discussion/${discussionId}?page=${lastPage}&size=${15}`,
    );
  };

  return (
    <div className="rounded-sm bg-green-600 px-2 py-1">
      <span className="text-xs uppercase">REPLY</span>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="mt-4 flex flex-col text-green-50"
      >
        <ThemeProvider theme={textFieldTheme}>
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
            className={`mb-6 mt-1 h-12 w-36 self-end normal-case shadow-none ${
              !watchedContent
                ? "bg-gray-300 text-gray-400"
                : "bg-yellow-300 text-yellow-600 hover:bg-yellow-400 active:bg-yellow-500"
            }`}
            type="submit"
            disabled={isSubmitting || !watchedContent}
          >
            Post Comment
          </Button>
        </ThemeProvider>
      </form>
    </div>
  );
};

export default BookDiscussionPostComment;
