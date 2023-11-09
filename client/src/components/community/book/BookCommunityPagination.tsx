import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Pagination from "@mui/material/Pagination";
import { Book } from "../../../types/models/book/Book";
import { Discussion } from "../../../types/models/community/Discussion";

interface BookCommunityPaginationProps {
  book: Book;
  discussion?: Discussion;
  page: number;
  size: number;
  search: string;
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  isCommunity?: boolean;
  isDiscussion?: boolean;
}

const BookCommunityPagination = ({
  book,
  discussion,
  page,
  size,
  search,
  totalPages,
  totalElements,
  numberOfElements,
  isCommunity,
  isDiscussion,
}: BookCommunityPaginationProps) => {
  const navigate = useNavigate();

  const [pageRangeStart, setPageRangeStart] = useState<number>(0);
  const [pageRangeEnd, setPageRangeEnd] = useState<number>(0);

  useEffect(() => {
    setPageRangeStart(page + 1);
    setPageRangeEnd(page + numberOfElements);
  }, [page, numberOfElements]);

  const handleChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    // This line is to quiet TypeScript
    // If I won't use here event - Material UI would scream at me
    event.preventDefault();
    if (isCommunity) {
      navigate(
        `/community/book/${book.bookId}?search=${search}&page=${
          newPage - 1
        }&size=${size}`,
      );
    } else if (discussion && isDiscussion) {
      navigate(
        `/community/book/${book.bookId}/discussion/${
          discussion.discussionId
        }?search=${search}&page=${newPage - 1}&size=${size}`,
      );
    }
  };

  return (
    <div className="my-0.5 flex items-center justify-between bg-gradient-to-l from-green-800 to-green-700 px-2 text-green-600">
      <span>
        Showing {pageRangeStart}-{pageRangeEnd} of {totalElements} active{" "}
        {!search ? `${isCommunity ? "topics" : "comments"}` : "entries"}
      </span>
      {totalPages > 1 && (
        <Pagination
          page={page + 1}
          count={totalPages}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default BookCommunityPagination;
