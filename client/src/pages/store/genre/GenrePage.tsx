import { useParams } from "react-router-dom";
import { useGetBooksByGenreQuery } from "../../../store";
import { capitalizeWords } from "../../../utils/letteringUtils";
import GenreBookBox from "../../../components/store/genre/GenreBookBox";

const GenrePage = () => {
  let { genreName } = useParams();
  genreName ||= "";

  const { data, isFetching } = useGetBooksByGenreQuery({
    genreName,
  });

  const decodedGenreName = decodeURIComponent(genreName);

  return (
    <div className="mb-8 w-full rounded-sm bg-green-200">
      <div className="p-6">
        <h1 className="text-6xl font-medium tracking-tight text-green-800">
          {capitalizeWords(decodedGenreName)}
        </h1>
      </div>
      <div className="rounded text-yellow-900">
        {!isFetching && data ? (
          <div className="grid grid-cols-3 gap-8 p-8">
            {data.content.map((book, index) => {
              return <GenreBookBox book={book} key={index} />;
            })}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default GenrePage;
