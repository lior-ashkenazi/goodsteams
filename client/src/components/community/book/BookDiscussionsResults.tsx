import { Book } from "../../../types/models/book/Book";
import { useGetCommunityQuery } from "../../../apis/communityServiceApi";
import { Discussion } from "../../../types/models/community/Discussion";
import BookDiscussionsResult from "./BookDiscussionsResult";
import BookDiscussionsPagination from "./BookDiscussionsPagination";
import BookDiscussionsFooter from "./BookDiscussionsFooter";

interface BookDiscussionsResultsInterface {
  book: Book;
  page: number;
  size: number;
  search: string;
}

const BookDiscussionsResults = ({
  book,
  page,
  size,
  search,
}: BookDiscussionsResultsInterface) => {
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
          <BookDiscussionsPagination
            bookId={book.bookId}
            page={page}
            size={size}
            search={search}
            totalPages={discussionsResults.totalPages}
            totalElements={discussionsResults.totalElements}
            numberOfElements={discussionsResults.numberOfElements}
          />
          <ul className="flex flex-col gap-y-1">
            {discussionsResults.content.map(
              (discussion: Discussion, index: number) => {
                return (
                  <BookDiscussionsResult
                    key={index}
                    discussion={discussion}
                    search={search}
                  />
                );
              },
            )}
          </ul>
          <BookDiscussionsPagination
            bookId={book.bookId}
            page={page}
            size={size}
            search={search}
            totalPages={discussionsResults.totalPages}
            totalElements={discussionsResults.totalElements}
            numberOfElements={discussionsResults.numberOfElements}
          />
          <BookDiscussionsFooter
            bookId={book.bookId}
            page={page}
            size={size}
            search={search}
          />
        </div>
      ) : (
        <ul></ul>
      )}
    </>
  );
};

export default BookDiscussionsResults;
