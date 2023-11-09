import { Book } from "../../../../types/models/book/Book";
import { useGetCommunityQuery } from "../../../../apis/communityServiceApi";
import { Discussion } from "../../../../types/models/community/Discussion";
import BookCommunityDiscussion from "./BookCommunityDiscussion";
import BookCommunityPagination from "../BookCommunityPagination";
import BookCommunitySizeDiv from "../BookCommunitySizeDiv";

interface BookCommunityDiscussionsProps {
  book: Book;
  page: number;
  size: number;
  search: string;
}

const BookCommunityDiscussions = ({
  book,
  page,
  size,
  search,
}: BookCommunityDiscussionsProps) => {
  const { data, isFetching: isFetchingResults } = useGetCommunityQuery({
    bookId: book.bookId,
    page,
    size,
    search,
  });

  const discussionsResults = data?.data;

  return (
    <>
      {!isFetchingResults && discussionsResults ? (
        <div className="flex w-full flex-col">
          <BookCommunityPagination
            book={book}
            page={page}
            size={size}
            search={search}
            totalPages={discussionsResults.totalPages}
            totalElements={discussionsResults.totalElements}
            numberOfElements={discussionsResults.numberOfElements}
            isCommunity
          />
          <ul className="flex flex-col gap-y-1">
            {discussionsResults.content.map(
              (discussion: Discussion, index: number) => {
                return (
                  <BookCommunityDiscussion
                    key={index}
                    book={book}
                    discussion={discussion}
                    search={search}
                  />
                );
              },
            )}
          </ul>
          <BookCommunityPagination
            book={book}
            page={page}
            size={size}
            search={search}
            totalPages={discussionsResults.totalPages}
            totalElements={discussionsResults.totalElements}
            numberOfElements={discussionsResults.numberOfElements}
            isCommunity
          />
          <BookCommunitySizeDiv book={book} size={size} isCommunity />
        </div>
      ) : (
        <ul></ul>
      )}
    </>
  );
};

export default BookCommunityDiscussions;
