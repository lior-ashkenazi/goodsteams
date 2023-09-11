import { useParams } from "react-router-dom";
import { useGetBookByIdQuery } from "../../../store";
import BookSection from "../../../components/store/book/BookSection";

const BookPage = () => {
  let { bookId } = useParams();
  bookId ||= "0";

  const { data: book, isFetching } = useGetBookByIdQuery(bookId);

  return (
    <div className="relative mb-8 mt-10 flex w-full flex-col rounded-sm bg-green-200 text-green-900">
      <BookSection isFetching={isFetching} book={book} />
    </div>
  );
};

export default BookPage;
