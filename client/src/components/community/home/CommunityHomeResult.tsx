import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";

import { useGetBookByIdQuery } from "../../../apis/bookServiceApi";
import { Community } from "../../../types/models/community/Community";
import CommunityDiscussions from "../CommunityDiscussions";
import CommunityHomeResultHeader from "./CommunityHomeResultHeader";

interface CommunityHomeResultProps {
  community: Community;
}

const CommunityHomeResult = ({ community }: CommunityHomeResultProps) => {
  const navigate = useNavigate();

  const { data: fetchedBookData, isFetching: isFetchingBookData } =
    useGetBookByIdQuery(community.bookId.toString());

  const book = fetchedBookData?.data;

  return !isFetchingBookData && book ? (
    <div>
      <CommunityHomeResultHeader community={community} />
      <CommunityDiscussions book={book} isCommunityHome />
      <div className="flex justify-end rounded-sm bg-green-700">
        <Button
          className="text-xs font-normal text-green-50"
          onClick={() => navigate(`/community/book/${community.bookId}`)}
        >
          View All
        </Button>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default CommunityHomeResult;
