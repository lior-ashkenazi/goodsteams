import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Profile } from "../../../types/models/profile/Profile";
import { useUpdateProfileMutation } from "../../../store";

import {
  createTheme,
  ThemeProvider,
  Breadcrumbs,
  Link,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useGetProfileSecureQuery } from "../../../store";

const fieldTheme = createTheme({
  palette: {
    primary: {
      main: "#166534",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            color: "#F0FDF4",
          },
        },
      },
    },
  },
});

const ProfileEdit = () => {
  const navigate = useNavigate();

  const [updateProfile] = useUpdateProfileMutation();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [birthDate, setBirthDate] = useState<Dayjs | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [summary, setSummary] = useState<string>("");

  const { data: profile, isFetching: isFetchingProfile } =
    useGetProfileSecureQuery();

  useEffect(() => {
    if (!isFetchingProfile && profile) {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
      setGender(profile.gender);
      setBirthDate(dayjs(profile.birthDate));
      setAvatarUrl(profile.avatarUrl);
      setSummary(profile.summary);
    }
  }, [isFetchingProfile, profile]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("works");

    if (!profile) return;

    const profileDto: Profile = {
      profileId: profile.profileId,
      userId: profile.userId,
      username: profile.username,
      firstName,
      lastName,
      gender,
      birthDate: birthDate ? birthDate.toISOString() : "",
      avatarUrl,
      summary,
    };

    await updateProfile(profileDto).unwrap();
    navigate(`/profile/${profile.userId}`);
  };

  return (
    !isFetchingProfile &&
    profile && (
      <div className="w-full">
        <div className="flex items-center bg-green-500 bg-opacity-80 px-8 py-5">
          <button onClick={() => navigate(`/profile/${profile.userId}`)}>
            <img
              className="mr-4 rounded-sm"
              src={profile.avatarUrl}
              aria-label=""
            />
          </button>
          <Breadcrumbs
            className="flex items-center truncate"
            separator={
              <DoubleArrowIcon className="text-green-300" fontSize="small" />
            }
            arial-label="edit-profile-breadcrumbs"
          >
            <Link
              component="button"
              underline="hover"
              key="1"
              className="text-3xl text-green-100"
              onClick={() => navigate(`/profile/${profile.userId}`)}
            >
              {profile.username}
            </Link>
            ,
            <Typography key="2" className="text-green-100">
              Edit Profile
            </Typography>
            ,
          </Breadcrumbs>
        </div>
        <ThemeProvider theme={fieldTheme}>
          <form className="my-8 flex flex-col gap-y-8" onSubmit={handleSubmit}>
            <div>
              <div className="px-4 py-2">
                <h3 className="text-lg font-semibold uppercase tracking-wide text-green-100">
                  General
                </h3>
              </div>
              <div className="mx-2 border-b-2 border-green-700"></div>
              <div className="flex flex-col gap-y-6 px-8 py-6">
                <div>
                  <Typography
                    className="text-green-400"
                    variant="overline"
                    display="block"
                  >
                    Username
                  </Typography>
                  <TextField
                    fullWidth
                    disabled
                    aria-label="text-field-username"
                    variant="filled"
                    value={profile.username}
                  />
                </div>
                <div>
                  <Typography
                    className="text-green-400"
                    variant="overline"
                    display="block"
                  >
                    First Name
                  </Typography>
                  <TextField
                    fullWidth
                    aria-label="text-field-first-name"
                    variant="filled"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <Typography
                    className="text-green-400"
                    variant="overline"
                    display="block"
                  >
                    Last Name
                  </Typography>
                  <TextField
                    fullWidth
                    aria-label="text-field-last-name"
                    variant="filled"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div>
                  <Typography
                    className="text-green-400"
                    variant="overline"
                    display="block"
                  >
                    Gender
                  </Typography>
                  <FormControl fullWidth variant="filled">
                    <Select
                      aria-label="select-gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <MenuItem value={"Female"}>Female</MenuItem>
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Non-binary"}>Non-binary</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <Typography
                    className="text-green-400"
                    variant="overline"
                    display="block"
                  >
                    Birth Date
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        className="w-full"
                        aria-label="date-picker-birth-date"
                        value={birthDate}
                        onChange={(newBirthDate) => setBirthDate(newBirthDate)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </div>
            </div>
            <div>
              <div className="px-4 py-2">
                <h3 className="text-lg font-semibold uppercase tracking-wide text-green-100">
                  Avatar
                </h3>
              </div>
              <div className="mx-2 border-b-2 border-green-700"></div>
              <div className="flex flex-col gap-y-6 px-8 py-6">
                <div>
                  <Typography
                    className="text-green-400"
                    variant="overline"
                    display="block"
                  >
                    Avatar
                  </Typography>
                  <TextField
                    fullWidth
                    aria-label="text-field-avatar"
                    variant="filled"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="px-4 py-2">
                <h3 className="text-lg font-semibold uppercase tracking-wide text-green-100">
                  Summary
                </h3>
              </div>
              <div className="mx-2 border-b-2 border-green-700"></div>
              <div className="flex flex-col gap-y-6 px-8 py-6">
                <div>
                  <Typography
                    className="text-green-400"
                    variant="overline"
                    display="block"
                  >
                    Summary
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    aria-label="text-field-summary"
                    variant="filled"
                    inputProps={{ maxLength: 256 }}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end px-8">
              <Button
                className="bg-gradient-to-l from-yellow-500 to-yellow-400 px-24 font-normal normal-case"
                type="submit"
                variant="contained"
                disableRipple
                disableElevation
              >
                Save
              </Button>
            </div>
          </form>
        </ThemeProvider>
      </div>
    )
  );
};

export default ProfileEdit;
