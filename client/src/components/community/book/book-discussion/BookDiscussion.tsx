import { useGetBookByIdQuery } from "../../../../apis/bookServiceApi";
import { useGetDiscussionQuery } from "../../../../apis/communityServiceApi";
import BookDiscussionNavigation from "./BookDiscussionNavigation";
import BookDiscussionOriginalPost from "./BookDiscussionOriginalPost";
import BookDiscussionPosts from "./BookDiscussionPosts";
import { formatDate } from "../../../../utils/dateUtils";
import BookCommunitySearchBar from "../BookCommunitySearchBar";
import BookDiscussionRecommended from "./BookDiscussionRecommended";

interface BookDiscussionProps {
  bookId: number;
  discussionId: number;
  page: number;
  size: number;
  search: string;
}

const BookDiscussion = ({
  bookId,
  discussionId,
  page,
  size,
  search,
}: BookDiscussionProps) => {
  const { data: bookData, isFetching: isFetchingBook } = useGetBookByIdQuery(
    bookId.toString(),
  );
  const book = bookData?.data;

  const {
    data: discussionData,
    isFetching: isFetchingDiscussion,
    refetch: refetchDiscussion,
  } = useGetDiscussionQuery({
    bookId,
    discussionId,
    page,
    size,
    search,
  });

  const discussion = discussionData?.data.discussion;
  const posts = discussionData?.data.comments;

  return !isFetchingBook &&
    !isFetchingDiscussion &&
    book &&
    discussion &&
    posts ? (
    <section>
      <div className="flex">
        <div className="flex w-full flex-col">
          <BookDiscussionNavigation book={book} discussion={discussion} />
          <BookDiscussionOriginalPost discussion={discussion} />
          <BookDiscussionPosts
            book={book}
            posts={posts}
            discussion={discussion}
            page={page}
            size={size}
            search={search}
            refetchDiscussion={refetchDiscussion}
          />
          <BookDiscussionNavigation book={book} discussion={discussion} />
        </div>
        <div className="ml-4 mt-[1.5875rem] flex w-[28rem] flex-col gap-y-8">
          <div className="rounded-sm bg-gradient-to-l from-green-800 to-green-700 p-4">
            <div>
              <span className="text-green-300">Date Posted: </span>
              <span className="text-green-200">
                {formatDate(discussion.createdAt, "discussions")}
              </span>
            </div>
            <div>
              <span className="text-green-300">Posts: </span>
              <span className="text-green-200">{discussion.commentCount}</span>
            </div>
          </div>
          <BookCommunitySearchBar
            book={book}
            discussion={discussion}
            search={search}
            isDiscussion
          />
          <BookDiscussionRecommended book={book} discussion={discussion} />
        </div>
      </div>
    </section>
  ) : (
    <section></section>
  );
};

export default BookDiscussion;
