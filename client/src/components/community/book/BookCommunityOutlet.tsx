import { useParams, Outlet } from "react-router-dom";

import BookCommunityHeader from "./BookCommunityHeader";

const BookCommunityOutlet = () => {
  let { bookId } = useParams();
  bookId ||= "0";

  return (
    <div className="w-full rounded-sm text-green-50">
      <BookCommunityHeader bookId={bookId} />
      <Outlet />
    </div>
  );
};

export default BookCommunityOutlet;
