import { Skeleton } from "@mui/material";

const GenrePageSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-8 p-8">
      {Array(6)
        .fill(null)
        .map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            width={300}
            height={500}
          />
        ))}
    </div>
  );
};

export default GenrePageSkeleton;
