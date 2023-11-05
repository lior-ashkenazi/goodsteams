import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGetBookByIdQuery } from "../../../../apis/bookServiceApi";
import BookCommunityResults from "./BookCommunityResults";
import BookCommunitySearchBar from "./BookCommunitySearchBar";
import BookCommunityNewDiscussionButton from "./BookCommunityNewDiscussionButton";
import BookCommunityPostDiscussionDiv from "./BookCommunityPostDiscussionDiv";

interface BookCommunityInterface {
  bookId: number;
  page: number;
  size: number;
  search: string;
}

const BookCommunity = ({
  bookId,
  page,
  size,
  search,
}: BookCommunityInterface) => {
  const navigate = useNavigate();

  const { data, isFetching } = useGetBookByIdQuery(bookId.toString());
  const book = data?.data;

  const [isNewDiscussionOpen, setIsNewDiscussionOpen] =
    useState<boolean>(false);

  const openNewDiscussion = () => setIsNewDiscussionOpen(true);

  return (
    <>
      {!isFetching && book ? (
        <section className="flex w-full flex-col text-green-100">
          <div className="mb-4 flex justify-between">
            <h1 className="truncate text-3xl">{book.title}</h1>
            <button
              className="rounded-sm bg-gradient-to-l from-green-200 to-yellow-100 px-3 py-2 text-green-600 transition-colors hover:from-green-100 hover:to-yellow-50 hover:text-green-500"
              onClick={() => navigate(`/store/book/${book.bookId}`)}
            >
              Store Page
            </button>
          </div>
          <div className="flex">
            <div className="flex w-full flex-col">
              <BookCommunityPostDiscussionDiv
                book={book}
                open={isNewDiscussionOpen}
              />
              <BookCommunityResults
                book={book}
                page={page}
                size={size}
                search={search}
              />
            </div>
            <div className="ml-4 w-96">
              <BookCommunitySearchBar book={book} search={search} community />
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
