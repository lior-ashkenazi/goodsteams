import { useParams } from "react-router-dom";
import { useGetBooksByGenreQuery } from "../../../store";
import { capitalizeWords } from "../../../utils/letteringUtils";

const GenrePage = () => {
  let { genreName } = useParams();
  genreName ||= "";

  const { data, isFetching } = useGetBooksByGenreQuery({
    genreName,
  });

  const decodedGenreName = decodeURIComponent(genreName);

  return (
    <div className="w-full rounded-sm bg-green-200">
      <div className="p-6">
        <h1 className="text-6xl font-medium tracking-tight text-green-800">
          {capitalizeWords(decodedGenreName)}
        </h1>
      </div>
      <div className="rounded text-yellow-900">
        {!isFetching && data ? (
          <div className="grid grid-cols-3 gap-8 p-8">
            {data.content.map((book, index) => {
              return (
                <button
                  key={index}
                  className="active:bg-yellow-yellow-300 flex flex-col items-center gap-4 rounded-sm border border-yellow-400 bg-yellow-100 p-4 transition-colors hover:bg-yellow-200 active:bg-yellow-300"
                >
                  <img
                    className="h-72 w-48 rounded-sm"
                    src={book.coverImageUrl}
                    aria-label="book-cover-image"
                  />
                  <hr className="relative w-full border-t border-solid border-yellow-400" />
                  <h2 className="text-center text-xl font-medium">
                    {book.title}
                  </h2>
                  <h3 className="text-lg italic">by {book.author}</h3>
                </button>
              );
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
