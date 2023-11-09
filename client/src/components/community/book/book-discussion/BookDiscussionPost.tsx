import { useGetProfilePublicQuery } from "../../../../store";
import BookDiscussionPostHeader from "./BookDiscussionPostHeader";
import { Discussion } from "../../../../types/models/community/Discussion";
import { Comment } from "../../../../types/models/community/Comment";
import { formatDate, isEqualDates } from "../../../../utils/dateUtils";
import { highlightText } from "../../../../utils/highlightUtils";

interface BookDiscussionPostProps {
  discussion?: Discussion;
  post: Comment;
  search: string;
  isOriginalPost?: boolean;
}

const BookDiscussionPost = ({
  discussion,
  post,
  search,
  isOriginalPost,
}: BookDiscussionPostProps) => {
  const { data: postProfile } = useGetProfilePublicQuery(
    post.userId.toString(),
  );

  return postProfile ? (
    <div
      className={`bg-gradient-to-br from-green-400 to-green-500 px-4 pt-4 shadow-md ${
        !isOriginalPost && "bg-opacity-50"
      }`}
    >
      <BookDiscussionPostHeader comment={post} profile={postProfile} />
      <div className="ml-14 mt-2">
        {isOriginalPost && discussion && (
          <h3 className="mb-2 break-normal text-4xl font-semibold">
            {discussion.title}
          </h3>
        )}
        <p className="pb-4">{highlightText(post.content, search)}</p>
        {!isEqualDates(post.createdAt, post.updatedAt) && (
          <div className="mb-1 text-sm italic text-green-200 text-opacity-80">
            Last edited by <button>{postProfile.username}</button>;{" "}
            {formatDate(post.updatedAt, "discussions")}
          </div>
        )}
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default BookDiscussionPost;
