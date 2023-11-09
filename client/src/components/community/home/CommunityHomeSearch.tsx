import CommunitySearchBar from "../CommunitySearchBar";
import CommunityHomeSearchSelect from "./CommunityHomeSearchSelect";

interface CommunityHomeSearchProps {
  sort: string;
  search: string;
}

const CommunityHomeSearch = ({ sort, search }: CommunityHomeSearchProps) => {
  return (
    <div className="mb-8 flex items-center justify-start">
      <CommunityHomeSearchSelect sort={sort} search={search} />
      <CommunitySearchBar sort={sort} search={search} isHome />
    </div>
  );
};

export default CommunityHomeSearch;
