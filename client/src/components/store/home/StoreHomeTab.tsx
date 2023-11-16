import { useGetBooksByTermQuery } from "../../../apis/bookServiceApi";

interface StoreHomeTabProps {
  sort: string;
}

const StoreHomeTab = ({ sort }: StoreHomeTabProps) => {
  const { data, isFetching } = useGetBooksByTermQuery({ term: "", sort });

  return !isFetching && data ? (
    <ul className="flex flex-col">
      {data.data.content.map((book, index) => {
        return <div>{book.title}</div>;
      })}
    </ul>
  ) : (
    <div></div>
  );
};

export default StoreHomeTab;
