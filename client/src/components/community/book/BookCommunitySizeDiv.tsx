import { useNavigate } from "react-router-dom";
import { Book } from "../../../types/models/book/Book";
import { Discussion } from "../../../types/models/community/Discussion";

interface BookCommunitySizeDivProps {
  book: Book;
  discussion?: Discussion;
  size: number;
  isCommunity?: boolean;
  isDiscussion?: boolean;
}

const BookCommunitySizeDiv = ({
  book,
  discussion,
  size,
  isCommunity,
  isDiscussion,
}: BookCommunitySizeDivProps) => {
  const navigate = useNavigate();

  const handleCommunityPageSizeSmall = () =>
    navigate(`/community/book/${book.bookId}?page=${0}&size=${15}`);

  const handleCommunityPageSizeMedium = () =>
    navigate(`/community/book/${book.bookId}?page=${0}&size=${30}`);

  const handleCommunityPageSizeBig = () =>
    navigate(`/community/book/${book.bookId}?page=${0}&size=${50}`);

  const handleDiscussionPageSizeSmall = () =>
    discussion &&
    navigate(
      `/community/book/${book.bookId}/discussion/${
        discussion.discussionId
      }?page=${0}&size=${15}`,
    );

  const handleDiscussionPageSizeMedium = () =>
    discussion &&
    navigate(
      `/community/book/${book.bookId}/discussion/${
        discussion.discussionId
      }?page=${0}&size=${30}`,
    );

  const handleDiscussionPageSizeBig = () =>
    discussion &&
    navigate(
      `/community/book/${book.bookId}/discussion/${
        discussion.discussionId
      }?page=${0}&size=${50}`,
    );

  return (
    <div className="text-sm text-green-700">
      Per page{" "}
      <button
        className={`${size === 15 && "text-green-900"}`}
        onClick={() => {
          if (isCommunity) handleCommunityPageSizeSmall();
          else if (isDiscussion) handleDiscussionPageSizeSmall();
        }}
      >
        15
      </button>{" "}
      <button
        className={`${size === 30 && "text-green-900"}`}
        onClick={() => {
          if (isCommunity) handleCommunityPageSizeMedium();
          else if (isDiscussion) handleDiscussionPageSizeMedium();
        }}
      >
        30
      </button>{" "}
      <button
        className={`${size === 50 && "text-green-900"}`}
        onClick={() => {
          if (isCommunity) handleCommunityPageSizeBig();
          else if (isDiscussion) handleDiscussionPageSizeBig();
        }}
      >
        50
      </button>
    </div>
  );
};

export default BookCommunitySizeDiv;
