import { useGetBooksByTermQuery } from "../../../apis/bookServiceApi";
import StoreHomeTabResult from "./StoreHomeTabResult";

interface StoreHomeTabProps {
  sort: string;
}

const StoreHomeTab = ({ sort }: StoreHomeTabProps) => {
  const { data, isFetching } = useGetBooksByTermQuery({ term: "", sort });

  return !isFetching && data ? (
    <ul className="flex flex-col gap-y-1.5">
      {data.data.content.map((book, index) => {
        return <StoreHomeTabResult key={index} book={book} />;
      })}
    </ul>
  ) : (
    <div></div>
  );
};

export default StoreHomeTab;
