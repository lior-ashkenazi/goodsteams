import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createTheme,
  ThemeProvider,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import PageviewIcon from "@mui/icons-material/Pageview";

interface BookDiscussionsSearchBarInterface {
  search: string;
}

const searchBarTheme = createTheme({
  palette: {
    primary: {
      main: "#14532d",
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: "#dcfce7", // Equivalent to Tailwind's bg-green-50
          "&::placeholder": {
            color: "rgba(0, 0, 0, 0.6)", // Default placeholder color or any color you desire
            opacity: 1, // To make sure it's fully visible
          },
        },
      },
    },
  },
});

const BookDiscussionsSearchBar = ({
  search,
}: BookDiscussionsSearchBarInterface) => {
  const [searchTerm, setSearchTerm] = useState<string>(search);

  const handleSearch = () => {};

  return (
    <div className="mb-6 flex flex-grow items-center justify-center rounded-md border-[1px] border-green-900 bg-green-400 p-2">
      <ThemeProvider theme={searchBarTheme}>
        <FormControl variant="outlined">
          <OutlinedInput
            fullWidth
            className="h-10 bg-green-600 text-green-900"
            id="outlined-search-bar"
            placeholder="Search discussions"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            endAdornment={
              <InputAdornment position="end">
                <PageviewIcon
                  className="bg-green-100 bg-clip-text text-green-400"
                  fontSize="large"
                  onClick={handleSearch}
                  style={{ cursor: "pointer" }}
                />
              </InputAdornment>
            }
          />
        </FormControl>
      </ThemeProvider>
    </div>
  );
};

export default BookDiscussionsSearchBar;
