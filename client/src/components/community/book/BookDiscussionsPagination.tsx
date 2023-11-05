import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Pagination from "@mui/material/Pagination";

interface BookDiscussionsPaginationInterface {
  bookId: number;
  page: number;
  size: number;
  search: string;
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
}

const BookDiscussionsPagination = ({
  bookId,
  page,
  size,
  search,
  totalPages,
  totalElements,
  numberOfElements,
}: BookDiscussionsPaginationInterface) => {
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
    navigate(
      `/community/${bookId}?search=${search}&page=${newPage - 1}&size=${size}`,
    );
  };

  return (
    <div className="my-0.5 flex items-center justify-between bg-gradient-to-l from-green-800 to-green-700 px-2 text-green-600">
      <span>
        Showing {pageRangeStart}-{pageRangeEnd} of {totalElements} active topics
      </span>
      <Pagination page={page + 1} count={totalPages} onChange={handleChange} />
    </div>
  );
};

export default BookDiscussionsPagination;
