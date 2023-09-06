import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const term = searchParams.get("term") || ""; // get the term or default to an empty string
  const page = parseInt(searchParams.get("page") || "0", 10); // get the page or default to 0
  const size = parseInt(searchParams.get("size") || "10", 10); // get the size or default to 10
  const sort = searchParams.get("sort") || "title,asc"; // get the sort or default to "title,asc"

  return <div>asdasdas{term}</div>;
};

export default SearchPage;
