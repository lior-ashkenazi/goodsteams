import { useSearchParams } from "react-router-dom";
import { useGetBooksByTermQuery } from "../../../store";
import SearchPageHeader from "./SearchPageHeader";
import SearchPageFooter from "./SearchPageFooter";
import SearchPageMain from "./SearchPageMain";
import SearchPageSkeleton from "./SearchPageSkeleton";

const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const term = searchParams.get("term") || ""; // get the term or default to an empty string
  const type = searchParams.get("type") || "title"; // get the term or default to an empty string
  const page = parseInt(searchParams.get("page") || "0", 10); // get the page or default to 0
  const size = parseInt(searchParams.get("size") || "10", 10); // get the size or default to 10
  const sort = searchParams.get("sort") || "name,asc"; // get the sort or default to "title,asc"

  const { data, isFetching } = useGetBooksByTermQuery({
    term,
    type,
    page,
    size,
    sort,
  });

  return (
    <div className="h-full w-full text-green-900">
      <SearchPageHeader term={term} type={type} sort={sort} />
      {!isFetching && data ? (
        <>
          <SearchPageMain
            books={data.content}
            page={page}
            totalElements={data.totalElements}
          />
          {data.totalElements > 0 && (
            <SearchPageFooter
              term={term}
              type={type}
              page={page}
              size={size}
              sort={sort}
              totalPages={data.totalPages}
            />
          )}
        </>
      ) : (
        <SearchPageSkeleton />
      )}
    </div>
  );
};

export default SearchPage;
