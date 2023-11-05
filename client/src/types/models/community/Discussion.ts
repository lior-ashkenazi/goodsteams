import { Comment } from "./Comment";

export type Discussion = {
  discussionId: number;
  bookId: number;
  title: string;
  originalPost: Comment;
  lastPost: Comment;
  createdAt: string;
  updatedAt: string;
  comments?: Comment[];
  commentCount: number;
};
