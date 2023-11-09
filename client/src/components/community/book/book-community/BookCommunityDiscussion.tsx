import { useNavigate } from "react-router-dom";

import Popover from "@mui/material/Popover";
import CommentIcon from "@mui/icons-material/Comment";
import {
  usePopupState,
  bindHover,
  bindPopover,
} from "material-ui-popup-state/hooks";

import { Discussion } from "../../../../types/models/community/Discussion";
import { Book } from "../../../../types/models/book/Book";
import { useGetProfilePublicQuery } from "../../../../store";
import { formatDate } from "../../../../utils/dateUtils";
import { highlightText } from "../../../../utils/highlightUtils";

interface BookCommunityDiscussionProps {
  book: Book;
  discussion: Discussion;
  search: string;
}

const BookCommunityDiscussion = ({
  book,
  discussion,
  search,
}: BookCommunityDiscussionProps) => {
  const navigate = useNavigate();

  const popupState = usePopupState({
    variant: "popover",
    popupId: `discussionPopover-${discussion.discussionId}`,
  });

  const { data: originalPostProfile } = useGetProfilePublicQuery(
    discussion.originalPost.userId.toString(),
  );
  const { data: lastPostProfile } = useGetProfilePublicQuery(
    discussion.lastPost.userId.toString(),
  );

  return (
    <>
      {discussion && originalPostProfile && lastPostProfile && (
        <li>
          <button
            {...bindHover(popupState)}
            className="flex w-full items-center justify-between rounded-sm bg-green-500 bg-opacity-80 px-4 py-2 transition-colors hover:bg-green-400 active:bg-green-300"
            onClick={() =>
              navigate(
                `/community/book/${book.bookId}/discussion/${discussion.discussionId}`,
              )
            }
          >
            <div className="flex flex-col items-start truncate">
              <span className="text-lg font-bold">
                {highlightText(discussion.title, search)}
              </span>
              <span className="text-green-200">
                {originalPostProfile.username}
              </span>
            </div>
            <div className="flex items-center justify-end">
              <span className="mr-12 text-green-200">
                {formatDate(discussion.updatedAt, "discussions")}
              </span>
              <span>
                <CommentIcon />
                <span className="ml-2">{discussion.commentCount}</span>
              </span>
            </div>
          </button>
          <Popover
            {...bindPopover(popupState)}
            style={{ pointerEvents: "none" }}
            anchorOrigin={{
              vertical: "center",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            disableRestoreFocus
          >
            <div
              style={{
                maxWidth: "24rem",
                maxHeight: "24rem",
                backgroundColor: "#10b981",
                color: "#dcfce7",
                padding: "0.5rem",
              }}
            >
              <p style={{ textOverflow: "ellipsis" }}>
                {discussion.originalPost.content}
              </p>
              <span style={{ fontSize: "0.875rem", lineHeight: "1.25rem" }}>
                <span style={{ color: "#047857" }}>Posted by:</span>{" "}
                <span>{originalPostProfile.username}</span>
                {", "}
                <span style={{ color: "#047857" }}>
                  {formatDate(discussion.originalPost.createdAt, "discussions")}
                </span>
                <br />
              </span>
              <span style={{ fontSize: "0.875rem", lineHeight: "1.25rem" }}>
                <span style={{ color: "#047857" }}>Last post:</span>{" "}
                <span>{originalPostProfile.username}</span>
                {", "}
                <span style={{ color: "#047857" }}>
                  {formatDate(discussion.lastPost.createdAt, "discussions")}
                </span>
              </span>
            </div>
          </Popover>
        </li>
      )}
    </>
  );
};

export default BookCommunityDiscussion;
