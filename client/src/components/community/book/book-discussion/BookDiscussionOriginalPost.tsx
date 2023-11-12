import { Discussion } from "../../../../types/models/community/Discussion";
import BookDiscussionPost from "./BookDiscussionPost";

interface BookDiscussionOriginalPostProps {
  discussion: Discussion;
  search: string;
}

const BookDiscussionOriginalPost = ({
  discussion,
  search,
}: BookDiscussionOriginalPostProps) => {
  return (
    <div className="mb-2">
      <BookDiscussionPost
        post={discussion.originalPost}
        isOriginalPost
        discussion={discussion}
        search={search}
      />
    </div>
  );
};

export default BookDiscussionOriginalPost;
