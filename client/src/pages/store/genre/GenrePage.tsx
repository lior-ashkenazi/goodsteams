import { useParams } from "react-router-dom";
import { useGetBooksByGenreQuery } from "../../../apis/bookServiceApi";
import { capitalizeWords } from "../../../utils/letteringUtils";
import GenrePageBody from "../../../components/store/genre/GenrePageBody";
import GenrePageSkeleton from "../../../components/store/genre/GenrePageSkeleton";

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
          <GenrePageBody books={data.data.content} />
        ) : (
          <GenrePageSkeleton />
        )}
      </div>
    </div>
  );
};

export default GenrePage;
