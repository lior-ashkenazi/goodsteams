import { useNavigate } from "react-router-dom";

interface BookCommunityFooterInterface {
  bookId: number;
  page: number;
  size: number;
  search: string;
}

const BookCommunityFooter = ({
  bookId,
  size,
}: BookCommunityFooterInterface) => {
  const navigate = useNavigate();

  const handlePageSizeSmall = () =>
    navigate(`/community/${bookId}?page=${0}&size=${15}`);

  const handlePageSizeMedium = () =>
    navigate(`/community/${bookId}?page=${0}&size=${30}`);

  const handlePageSizeBig = () =>
    navigate(`/community/${bookId}?page=${0}&size=${50}`);

  return (
    <div className="text-sm text-green-700">
      Per page{" "}
      <button
        className={`${size === 15 && "text-green-900"}`}
        onClick={handlePageSizeSmall}
      >
        15
      </button>{" "}
      <button
        className={`${size === 30 && "text-green-900"}`}
        onClick={handlePageSizeMedium}
      >
        30
      </button>{" "}
      <button
        className={`${size === 50 && "text-green-900"}`}
        onClick={handlePageSizeBig}
      >
        50
      </button>
    </div>
  );
};

export default BookCommunityFooter;
