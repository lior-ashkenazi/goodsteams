import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  createTheme,
  ThemeProvider,
  SelectChangeEvent,
} from "@mui/material";

interface SearchPageHeaderProps {
  term: string;
  type: string;
  sort: string;
}

const searchBarTheme = createTheme({
  palette: {
    primary: {
      main: "#422006",
    },
  },
});

const radioGroupTheme = createTheme({
  palette: {
    primary: {
      main: "#16a34a",
    },
  },
});

const SearchPageHeader = ({ term, type, sort }: SearchPageHeaderProps) => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState<string>(term);

  const onClickSearchBar = () => navigate(`/store/search?term=${searchTerm}`);

  const onChangeRadioGroup = (e: React.ChangeEvent<HTMLInputElement>) =>
    navigate(
      `/store/search?term=${searchTerm}&type=${
        (e.target as HTMLInputElement).value
      }`,
    );

  const onChangeSelect = (e: SelectChangeEvent<string>) =>
    navigate(
      `/store/search?term=${searchTerm}&type=${type}&sort=${e.target.value}`,
    );

  return (
    <div className="flex justify-between rounded-sm bg-green-200 p-6 pb-0 text-green-900">
      <div>
        <div>
          <ThemeProvider theme={searchBarTheme}>
            <TextField
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for Book Title or Author"
              aria-label="search-page-search-bar"
              variant="outlined"
              className="mr-4 w-[32rem] bg-green-100"
              onKeyDown={(e) => e.key === "Enter" && onClickSearchBar()}
            />
          </ThemeProvider>
          <Button
            variant="contained"
            className="bg-green-400 p-3 text-lg normal-case shadow-sm hover:bg-green-500 active:bg-green-600"
            onClick={onClickSearchBar}
          >
            Search
          </Button>
        </div>
        <div>
          <ThemeProvider theme={radioGroupTheme}>
            <FormControl>
              <RadioGroup
                row
                className="my-2"
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={type}
                onChange={onChangeRadioGroup}
              >
                <FormControlLabel
                  value="title"
                  control={<Radio />}
                  label="Title"
                />
                <FormControlLabel
                  value="author"
                  control={<Radio />}
                  label="Author"
                />
              </RadioGroup>
            </FormControl>
          </ThemeProvider>
        </div>
      </div>
      <div className="w-[16rem]">
        <ThemeProvider theme={searchBarTheme}>
          <FormControl fullWidth>
            <InputLabel>Sort by</InputLabel>
            <Select value={sort} onChange={onChangeSelect} label="Sort by">
              <MenuItem value={"release-date,desc"}>Release Date</MenuItem>
              <MenuItem value={"name,asc"}>Name</MenuItem>
              <MenuItem value={"price,asc"}>Lowest Price</MenuItem>
              <MenuItem value={"price,desc"}>Highest Price</MenuItem>
              <MenuItem value={"average-rating,desc"}>User Reviews</MenuItem>
            </Select>
          </FormControl>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default SearchPageHeader;
