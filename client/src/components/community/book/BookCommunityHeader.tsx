import { useNavigate } from "react-router-dom";
import { useGetBookByIdQuery } from "../../../apis/bookServiceApi";

interface BookCommunityHeaderProps {
  bookId: string;
}

const BookCommunityHeader = ({ bookId }: BookCommunityHeaderProps) => {
  const navigate = useNavigate();

  const { data, isFetching } = useGetBookByIdQuery(bookId);
  const book = data?.data;

  return (
    !isFetching &&
    book && (
      <div className="mb-4 flex justify-between">
        <h1 className="truncate text-3xl">{book.title}</h1>
        <button
          className="rounded-sm bg-gradient-to-l from-green-200 to-yellow-100 px-3 py-2 text-green-600 transition-colors hover:from-green-100 hover:to-yellow-50 hover:text-green-500"
          onClick={() => navigate(`/store/book/${book.bookId}`)}
        >
          Store Page
        </button>
      </div>
    )
  );
};

export default BookCommunityHeader;
