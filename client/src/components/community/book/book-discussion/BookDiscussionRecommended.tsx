import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";

import { useGetCommunityQuery } from "../../../../apis/communityServiceApi";
import { Book } from "../../../../types/models/book/Book";
import { Discussion } from "../../../../types/models/community/Discussion";

interface BookDiscussionRecommendedProps {
  book: Book;
  discussion: Discussion;
}

const BookDiscussionRecommended = ({
  book,
  discussion,
}: BookDiscussionRecommendedProps) => {
  const navigate = useNavigate();

  const { data, isFetching } = useGetCommunityQuery({ bookId: book.bookId });
  const recommendedDiscussions = data?.data.content;

  return (
    recommendedDiscussions && (
      <div>
        <span>More discussions</span>
        <div className="flex flex-col gap-y-0.5">
          {recommendedDiscussions
            .filter(
              (recommendedDiscussion) =>
                recommendedDiscussion.discussionId != discussion.discussionId,
            )
            .slice(0, 4)
            .map((recommendedDiscussion, index) => {
              return (
                <Button
                  key={index}
                  variant="contained"
                  className="justify-between truncate rounded-sm bg-green-400 bg-opacity-70 p-1 normal-case transition-colors hover:bg-green-300 active:bg-green-200"
                  onClick={() =>
                    navigate(
                      `/community/book/${book.bookId}/discussion/${recommendedDiscussion.discussionId}`,
                    )
                  }
                  disableRipple
                  disableElevation
                >
                  <span>{recommendedDiscussion.title}</span>
                  <span className="mr-2">
                    <CommentIcon />
                    <span>{recommendedDiscussion.commentCount}</span>
                  </span>
                </Button>
              );
            })}
        </div>
      </div>
    )
  );
};

export default BookDiscussionRecommended;
