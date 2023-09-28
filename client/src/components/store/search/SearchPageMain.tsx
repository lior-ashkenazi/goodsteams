import { Book } from "../../../types/models/book/Book";
import SearchPageResultsItem from "./SearchPageResultsItem";

interface SearchPageMainProps {
  page: number;
  totalElements: number;
  books: Book[];
}

const SearchPageMain = ({
  books,
  page,
  totalElements,
}: SearchPageMainProps) => {
  return (
    <div className="rounded-sm bg-green-200 py-2">
      {0 < totalElements ? (
        <>
          <span className="mx-1 my-2 inline-block">
            Page {page + 1} of about {totalElements} results
          </span>
          {books.map((book) => (
            <SearchPageResultsItem book={book} />
          ))}
        </>
      ) : (
        <div className="flex items-center justify-center p-6 text-lg">
          <span>There are no results</span>
        </div>
      )}
    </div>
  );
};

export default SearchPageMain;
