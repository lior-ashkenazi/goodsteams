import { Profile } from "../models/profile/Profile";

export type CreateProfileRequest = void;
export type CreateProfileResponse = Profile;

export type GetProfileSecureRequest = void;
export type GetProfileSecureResponse = Profile;

export type GetProfilePublicRequest = string;
export type GetProfilePublicResponse = Profile;

export type UpdateProfileRequest = Profile;
export type UpdateProfileResponse = Profile;
