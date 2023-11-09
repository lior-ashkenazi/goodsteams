import CommunityHomeCommunities from "./CommunityHomeCommunities";
import CommunityHomeWelcomeDiv from "./CommunityHomeWelcomeDiv";

interface CommunityHomeProps {
  sort: string;
  search: string;
}

const CommunityHome = ({ sort, search }: CommunityHomeProps) => {
  return (
    <div>
      <CommunityHomeWelcomeDiv />
      <CommunityHomeCommunities sort={sort} search={search} />
    </div>
  );
};

export default CommunityHome;
