export type Profile = {
  profileId: number;
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string; // Representing the date as an ISO string. You can also use `Date` type but string is common for date transport.
  avatarUrl: string;
};
