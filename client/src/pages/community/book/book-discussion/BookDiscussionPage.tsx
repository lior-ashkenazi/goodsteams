import { useParams } from "react-router-dom";

const BookDiscussionPage = () => {
  const { bookId, discussionId } = useParams();
  return (
    <div>
      {bookId} {discussionId}
    </div>
  );
};

export default BookDiscussionPage;
