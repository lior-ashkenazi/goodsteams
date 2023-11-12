import { useParams } from "react-router-dom";

import ProfilePublic from "../../../components/profile/public/ProfilePublic";

const ProfilePublicPage = () => {
  const { userId } = useParams();

  return userId && <ProfilePublic profileUserId={userId} />;
};

export default ProfilePublicPage;
