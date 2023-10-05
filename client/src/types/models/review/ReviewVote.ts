export type ReviewVote = {
  reviewVoteId: number;
  userId: number;
  voteType: "string";
};

export function isReviewVote(obj: unknown): obj is ReviewVote {
  const reviewVoteObj = obj as ReviewVote;
  return (
    !!obj &&
    typeof reviewVoteObj.reviewVoteId === "number" &&
    typeof reviewVoteObj.userId === "number" &&
    typeof reviewVoteObj.voteType === "string"
  );
}
