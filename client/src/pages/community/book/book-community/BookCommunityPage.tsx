import { useParams, useSearchParams } from "react-router-dom";
import BookCommunity from "../../../../components/community/book/book-community/BookCommunity";

const BookCommunityPage = () => {
  let { bookId } = useParams();
  bookId ||= "0";

  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "0", 10); // get the page or default to 0
  const size = parseInt(searchParams.get("size") || "15", 10); // get the size or default to 15
  const search = searchParams.get("search") || ""; // get the term or default to an empty string

  return (
    <BookCommunity bookId={+bookId} page={page} size={size} search={search} />
  );
};

export default BookCommunityPage;
