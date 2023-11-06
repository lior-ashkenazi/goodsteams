import { Book } from "../../../../types/models/book/Book";
import { useGetCommunityQuery } from "../../../../apis/communityServiceApi";
import { Discussion } from "../../../../types/models/community/Discussion";
import BookCommunityResult from "./BookCommunityResult";
import BookCommunityPagination from "./BookCommunityPagination";
import BookCommunityFooter from "./BookCommunityFooter";

interface BookCommunityResultsInterface {
  book: Book;
  page: number;
  size: number;
  search: string;
}

const BookCommunityResults = ({
  book,
  page,
  size,
  search,
}: BookCommunityResultsInterface) => {
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
                  <BookCommunityResult
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
            bookId={book.bookId}
            page={page}
            size={size}
            search={search}
            totalPages={discussionsResults.totalPages}
            totalElements={discussionsResults.totalElements}
            numberOfElements={discussionsResults.numberOfElements}
          />
          <BookCommunityFooter
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

export default BookCommunityResults;
