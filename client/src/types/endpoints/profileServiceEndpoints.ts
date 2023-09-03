import { Profile } from "../models/Profile";

export type CreateProfileRequest = void;
export type CreateProfileResponse = {
  message: string;
  profile: Profile;
};

export type GetProfileRequest = void;
export type GetProfileResponse = {
  message: string;
  profile: Profile;
};

export type UpdateProfileRequest = Profile;
export type UpdateProfileResponse = {
  message: string;
  profile: Profile;
};
