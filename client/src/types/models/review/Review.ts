export type Review = {
  reviewId: number;
  bookId: number;
  userId: number;
  rating: number;
  bodyText: string;
  helpfulCount: number;
  notHelpfulCount: number;
  funnyCount: number;
  createdAt: string;
  updatedAt: string;
};

export function isReview(obj: unknown): obj is Review {
  const reviewObj = obj as Review;
  return (
    !!obj &&
    typeof reviewObj.reviewId === "number" &&
    typeof reviewObj.bookId === "number" &&
    typeof reviewObj.userId === "number" &&
    typeof reviewObj.rating === "number" &&
    typeof reviewObj.bodyText === "string" &&
    typeof reviewObj.helpfulCount === "number" &&
    typeof reviewObj.notHelpfulCount === "number" &&
    typeof reviewObj.funnyCount === "number" &&
    typeof reviewObj.createdAt === "string" &&
    typeof reviewObj.updatedAt === "string"
  );
}
