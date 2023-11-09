import { useNavigate } from "react-router-dom";

import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Book } from "../../../../types/models/book/Book";
import { Discussion } from "../../../../types/models/community/Discussion";

interface BookDiscussionNavigationProps {
  book: Book;
  discussion: Discussion;
}

const BookDiscussionNavigation = ({
  book,
  discussion,
}: BookDiscussionNavigationProps) => {
  const navigate = useNavigate();
  const handleBookCommunityClick = () =>
    navigate(`/community/book/${book.bookId}`);

  return (
    book && (
      <Breadcrumbs className="truncate">
        <Link
          component="button"
          underline="hover"
          key="1"
          className="text-green-100"
          onClick={handleBookCommunityClick}
        >
          {book.title}
        </Link>
        ,
        <Typography key="2" className="text-green-200">
          {discussion.title}
        </Typography>
        ,
      </Breadcrumbs>
    )
  );
};

export default BookDiscussionNavigation;
