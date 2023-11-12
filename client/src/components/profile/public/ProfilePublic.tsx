import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button, CircularProgress } from "@mui/material";

import { RootState, useGetProfilePublicQuery } from "../../../store";

interface ProfilePublicProps {
  profileUserId: string;
}

const ProfilePublic = ({ profileUserId }: ProfilePublicProps) => {
  const navigate = useNavigate();

  const userId: number | null = useSelector(
    (state: RootState) => state.profile.userId,
  );

  const { data: profile, isFetching: isFetchingProfile } =
    useGetProfilePublicQuery(profileUserId.toString());

  return !isFetchingProfile && profile ? (
    <div className="flex rounded-sm">
      <div className="flex w-[48rem] bg-gradient-to-bl from-green-600 via-green-500 to-green-400 p-8">
        <img
          className="mr-12 w-48"
          src={profile.avatarUrl}
          aria-label="profile-avatar"
        />
        <div>
          <div className="mb-16 truncate text-2xl">{profile.username}</div>
          <p className="">
            {!profile.summary ? "No information given." : profile.summary}
          </p>
        </div>
      </div>
      <div className="w-[16rem] bg-gradient-to-br from-green-600 via-green-500 to-yellow-200 p-8">
        {profileUserId === userId?.toString() && (
          <Button
            variant="contained"
            className="bg-green-500 normal-case text-green-100 transition-colors hover:bg-green-400 hover:text-green-50 active:bg-green-300 active:text-green-50"
            onClick={() => navigate("/profile/edit")}
            disableRipple
          >
            Edit Profile
          </Button>
        )}
      </div>
    </div>
  ) : (
    <div>
      <CircularProgress className="text-green-50" />
    </div>
  );
};

export default ProfilePublic;
