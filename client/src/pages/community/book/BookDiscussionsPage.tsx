import { useParams, useSearchParams } from "react-router-dom";
import BookDiscussions from "../../../components/community/book/BookDiscussions";

const BookDiscussionsPage = () => {
  let { bookId } = useParams();
  const [searchParams] = useSearchParams();

  bookId ||= "0";

  const page = parseInt(searchParams.get("page") || "0", 10); // get the page or default to 0
  const size = parseInt(searchParams.get("size") || "15", 10); // get the size or default to 15
  const search = searchParams.get("search") || ""; // get the term or default to an empty string

  return (
    <div className="w-full rounded-sm text-green-50">
      <BookDiscussions
        bookId={+bookId}
        page={page}
        size={size}
        search={search}
      />
    </div>
  );
};

export default BookDiscussionsPage;
