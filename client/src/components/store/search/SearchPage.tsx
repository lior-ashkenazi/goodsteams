import { useSearchParams } from "react-router-dom";
import { useGetBooksByTermQuery } from "../../../store";
import SearchPageResultsItem from "./SearchPageResultsItem";

const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const term = searchParams.get("term") || ""; // get the term or default to an empty string
  const page = parseInt(searchParams.get("page") || "0", 10); // get the page or default to 0
  const size = parseInt(searchParams.get("size") || "10", 10); // get the size or default to 10
  const sort = searchParams.get("sort") || "title,asc"; // get the sort or default to "title,asc"

  const { data, isFetching } = useGetBooksByTermQuery({
    term,
    page,
    size,
    sort,
  });

  return (
    <div className="w-full rounded-sm bg-green-200 py-2 text-green-900">
      {!isFetching &&
        data &&
        data.content.map((book) => <SearchPageResultsItem book={book} />)}
    </div>
  );
};

export default SearchPage;
