import { Book } from "../../../types/models/book/Book";

interface StoreHomeTabResultProps {
  book: Book;
}

const StoreHomeTabResult = ({ book }: Book) => {
  return <li className="flex justify-between bg-green-400"></li>;
};

export default StoreHomeTabResult;
