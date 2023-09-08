import { useNavigate } from "react-router-dom";

import { Pagination } from "@mui/material";

interface SearchPageFooterProps {
  term: string;
  type: string;
  page: number;
  size: number;
  sort: string;
  totalPages: number;
}

const SearchPageFooter = ({
  term,
  type,
  page,
  size,
  sort,
  totalPages,
}: SearchPageFooterProps) => {
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    // This line is to quiet TypeScript
    // If I won't use here event - Material UI would scream at me
    event.preventDefault();
    navigate(
      `/store/search?term=${term}&type=${type}&page=${
        newPage - 1
      }&size=${size}&sort=${sort}`,
    );
  };

  return (
    <div className="mb-8 flex w-full items-center justify-center rounded bg-green-200 p-6 pt-2 text-green-900">
      <Pagination
        count={totalPages}
        page={page + 1}
        onChange={handleChange}
        size="large"
      />
    </div>
  );
};

export default SearchPageFooter;
