import { Book } from "../../types/models/book/Book";
import { useGetCommunityQuery } from "../../apis/communityServiceApi";
import { Discussion } from "../../types/models/community/Discussion";
import CommunityDiscussion from "./CommunityDiscussion";
import BookCommunityPagination from "./book/BookCommunityPagination";
import BookCommunitySizeDiv from "./book/BookCommunitySizeDiv";

interface CommunityDiscussionsProps {
  book: Book;
  page?: number;
  size?: number;
  search?: string;
  isCommunityHome?: boolean;
}

const CommunityDiscussions = ({
  book,
  page = 0,
  size = 15,
  search = "",
  isCommunityHome = false,
}: CommunityDiscussionsProps) => {
  const { data, isFetching: isFetchingResults } = useGetCommunityQuery({
    bookId: book.bookId,
    page,
    size,
    search,
  });

  const discussionsResults = data?.data;

  const renderDiscussions = () => {
    if (!discussionsResults) return;

    let renderedDiscussions = discussionsResults.content.map(
      (discussion: Discussion, index: number) => {
        return (
          <CommunityDiscussion
            key={index}
            book={book}
            discussion={discussion}
            search={search}
          />
        );
      },
    );

    if (isCommunityHome) renderedDiscussions = renderedDiscussions.slice(0, 3);

    return renderedDiscussions;
  };

  return (
    <>
      {!isFetchingResults && discussionsResults ? (
        <div className="flex w-full flex-col">
          {!isCommunityHome && discussionsResults.content.length > 0 && (
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
          )}
          <ul className="flex flex-col gap-y-0.5">{renderDiscussions()}</ul>
          {!isCommunityHome && discussionsResults.content.length > 0 && (
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
          )}
          {!isCommunityHome && discussionsResults.content.length > 0 && (
            <BookCommunitySizeDiv book={book} size={size} isCommunity />
          )}
        </div>
      ) : (
        <ul></ul>
      )}
    </>
  );
};

export default CommunityDiscussions;
