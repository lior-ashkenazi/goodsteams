import { useState } from "react";

import { useGetBookByIdQuery } from "../../../../apis/bookServiceApi";
import BookCommunityDiscussions from "./BookCommunityDiscussions";
import BookCommunitySearchBar from "../BookCommunitySearchBar";
import BookCommunityNewDiscussionButton from "./BookCommunityNewDiscussionButton";
import BookCommunityPostDiscussionDiv from "./BookCommunityPostDiscussionDiv";

interface BookCommunityProps {
  bookId: number;
  page: number;
  size: number;
  search: string;
}

const BookCommunity = ({ bookId, page, size, search }: BookCommunityProps) => {
  const { data, isFetching } = useGetBookByIdQuery(bookId.toString());
  const book = data?.data;

  const [isNewDiscussionOpen, setIsNewDiscussionOpen] =
    useState<boolean>(false);

  const openNewDiscussion = () => setIsNewDiscussionOpen(true);

  return (
    <>
      {!isFetching && book ? (
        <section className="flex w-full flex-col text-green-100">
          <div className="flex">
            <div className="flex w-full flex-col">
              <BookCommunityPostDiscussionDiv
                book={book}
                open={isNewDiscussionOpen}
              />
              <BookCommunityDiscussions
                book={book}
                page={page}
                size={size}
                search={search}
              />
            </div>
            <div className="ml-4 w-96">
              <BookCommunitySearchBar book={book} search={search} isCommunity />
              <BookCommunityNewDiscussionButton
                openNewDiscussion={openNewDiscussion}
              />
            </div>
          </div>
        </section>
      ) : (
        <section></section>
      )}
    </>
  );
};

export default BookCommunity;
