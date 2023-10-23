import { Discussion } from "./Discussion";

export type Community = {
  title: string;
  coverImageUrl: string;
  discussionCount: number;
  recentDiscussions: Discussion[];
};
