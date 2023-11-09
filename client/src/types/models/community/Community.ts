import { Discussion } from "./Discussion";

export type Community = {
  bookId: number;
  title: string;
  coverImageUrl: string;
  discussionCount: number;
  recentDiscussions: Discussion[];
};
