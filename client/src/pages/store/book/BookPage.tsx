import { useParams } from "react-router-dom";
import { useGetBookByIdQuery } from "../../../apis/bookServiceApi";
import BookSection from "../../../components/store/book/book-section/BookSection";
import ReviewsSection from "../../../components/store/book/review-section/ReviewsSection";

const BookPage = () => {
  let { bookId } = useParams();
  bookId ||= "0";

  const { data, isFetching } = useGetBookByIdQuery(bookId);

  return (
    <div className="relative mb-8 mt-10 flex w-full flex-col rounded-sm bg-green-200 text-green-900">
      <BookSection isFetching={isFetching} book={data?.data} />
      <ReviewsSection isFetching={isFetching} book={data?.data} />
    </div>
  );
};

export default BookPage;
