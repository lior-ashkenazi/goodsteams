import { useNavigate } from "react-router-dom";

import { Community } from "../../../types/models/community/Community";

interface CommunityHomeResultHeaderProps {
  community: Community;
}

const CommunityHomeResultHeader = ({
  community,
}: CommunityHomeResultHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between rounded-sm bg-green-800 p-2">
      <div className="flex items-center">
        <button onClick={() => navigate(`/community/book/${community.bookId}`)}>
          <img
            className="mr-4 w-16"
            src={community.coverImageUrl}
            aria-label="community-book-cover-image"
          />
        </button>
        <button
          onClick={() => navigate(`/community/book/${community.bookId}`)}
          className="truncate"
        >
          {community.title}
        </button>
      </div>
      <div className="flex flex-col items-end">
        <span>{community.discussionCount}</span>
        <span>discussion threads</span>
      </div>
    </div>
  );
};

export default CommunityHomeResultHeader;
