import { Book } from "../../../types/models/Book";
import GenreBookBox from "./GenreBookBox";

interface GenrePageBodyProps {
  books: Book[];
}

const GenrePageBody = ({ books }: GenrePageBodyProps) => {
  return (
    <div className="grid grid-cols-3 gap-8 p-8">
      {books.map((book, index) => {
        return <GenreBookBox book={book} key={index} />;
      })}
    </div>
  );
};

export default GenrePageBody;
