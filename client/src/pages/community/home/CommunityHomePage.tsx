import { useSearchParams } from "react-router-dom";

import CommunityHome from "../../../components/community/home/CommunityHome";

const CommunityHomePage = () => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get("sort") || "";
  const search = searchParams.get("search") || "";

  return <CommunityHome sort={sort} search={search} />;
};

export default CommunityHomePage;
