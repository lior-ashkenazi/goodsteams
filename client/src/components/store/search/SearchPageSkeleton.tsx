import { Skeleton } from "@mui/material";

const SearchPageSkeleton = () => {
  return (
    <div className="rounded-sm bg-green-200 py-2">
      {Array(5)
        .fill(null)
        .map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            height={150}
            className="mb-2"
          />
        ))}
    </div>
  );
};

export default SearchPageSkeleton;
