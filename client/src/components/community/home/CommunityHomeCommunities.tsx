import CommunityHomeResults from "./CommunityHomeResults";
import CommunityHomeSearch from "./CommunityHomeSearch";

interface CommunityHomeCommunitiesProps {
  sort: string;
  search: string;
}

const CommunityHomeCommunities = ({
  sort,
  search,
}: CommunityHomeCommunitiesProps) => {
  return (
    <div>
      <CommunityHomeSearch sort={sort} search={search} />
      <CommunityHomeResults sort={sort} search={search} />
    </div>
  );
};

export default CommunityHomeCommunities;
