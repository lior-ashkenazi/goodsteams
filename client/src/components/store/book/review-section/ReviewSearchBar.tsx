import { useState } from "react";

import {
  TextField,
  createTheme,
  ThemeProvider,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface ReviewSearchBarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
}

const searchBarTheme = createTheme({
  palette: {
    primary: {
      main: "#422006",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "1.5rem", // Adjust the value to get the desired curvature
        },
      },
    },
  },
});

const ReviewSearchBar = ({
  search,
  setSearch,
  sort,
  setSort,
}: ReviewSearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState<string>(search);

  return (
    <div className="flex rounded-sm bg-yellow-100 p-4">
      <ThemeProvider theme={searchBarTheme}>
        <TextField
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search review text"
          aria-label="review-results-search-bar"
          variant="outlined"
          className="mr-4 w-[32rem] rounded-3xl bg-yellow-200 transition-colors hover:bg-yellow-300"
          onKeyDown={(e) => e.key === "Enter" && setSearch(searchTerm)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  className="cursor-pointer"
                  onClick={() => setSearch(searchTerm)}
                />
              </InputAdornment>
            ),
          }}
        />
      </ThemeProvider>
      <ThemeProvider theme={searchBarTheme}>
        <FormControl>
          <InputLabel>Sort by</InputLabel>
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            label="Sort by"
          >
            <MenuItem value={"popular"}>Popular</MenuItem>
            <MenuItem value={"newest"}>Newest</MenuItem>
            <MenuItem value={"oldest"}>Oldest</MenuItem>
          </Select>
        </FormControl>
      </ThemeProvider>
    </div>
  );
};

export default ReviewSearchBar;
