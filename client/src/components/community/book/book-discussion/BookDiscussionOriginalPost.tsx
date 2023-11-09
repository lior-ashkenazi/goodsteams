import { Discussion } from "../../../../types/models/community/Discussion";
import BookDiscussionPost from "./BookDiscussionPost";

interface BookDiscussionOriginalPostProps {
  discussion: Discussion;
}

const BookDiscussionOriginalPost = ({
  discussion,
}: BookDiscussionOriginalPostProps) => {
  return (
    <div className="mb-2">
      <BookDiscussionPost
        post={discussion.originalPost}
        isOriginalPost
        discussion={discussion}
      />
    </div>
  );
};

export default BookDiscussionOriginalPost;
