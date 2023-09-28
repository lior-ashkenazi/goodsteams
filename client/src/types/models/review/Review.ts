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
  updatedAt: number;
};
