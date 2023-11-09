import { useSelector } from "react-redux";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";

import { RootState } from "../../../../store";
import { Book } from "../../../../types/models/book/Book";
import { Comment } from "../../../../types/models/community/Comment";
import { Discussion } from "../../../../types/models/community/Discussion";
import { Page } from "../../../../types/models/misc/Page";
import { GetDiscussionResponse } from "../../../../types/apis/communityServiceApi";
import BookCommunityPagination from "../BookCommunityPagination";
import BookCommunitySizeDiv from "../BookCommunitySizeDiv";
import BookDiscussionPost from "./BookDiscussionPost";
import BookDiscussionPostComment from "./BookDiscussionPostComment";

interface BookDiscussionPostsProps {
  book: Book;
  discussion: Discussion;
  posts: Page<Comment>;
  page: number;
  size: number;
  search: string;
  refetchDiscussion: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<GetDiscussionResponse, Error>>;
}

const BookDiscussionPosts = ({
  book,
  discussion,
  posts,
  page,
  size,
  search,
  refetchDiscussion,
}: BookDiscussionPostsProps) => {
  const isAuthenticated: boolean | null = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return (
    <div className="flex w-full flex-col">
      <div className="mb-4">
        {posts.content && posts.content.length > 0 && (
          <>
            <BookCommunityPagination
              book={book}
              discussion={discussion}
              page={page}
              size={size}
              search={search}
              totalPages={posts.totalPages}
              totalElements={posts.totalElements}
              numberOfElements={posts.numberOfElements}
              isDiscussion
            />
            <div className="flex w-full flex-col gap-y-0.5">
              {posts.content.map((post, index) => {
                return (
                  <BookDiscussionPost key={index} post={post} search={search} />
                );
              })}
            </div>
            <BookCommunityPagination
              book={book}
              discussion={discussion}
              page={page}
              size={size}
              search={search}
              totalPages={posts.totalPages}
              totalElements={posts.totalElements}
              numberOfElements={posts.numberOfElements}
              isDiscussion
            />
            <BookCommunitySizeDiv
              book={book}
              discussion={discussion}
              size={size}
              isDiscussion
            />
          </>
        )}
      </div>
      {isAuthenticated && (
        <BookDiscussionPostComment
          book={book}
          discussion={discussion}
          refetchDiscussion={refetchDiscussion}
        />
      )}
    </div>
  );
};

export default BookDiscussionPosts;
