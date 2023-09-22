import {
  TextField,
  createTheme,
  ThemeProvider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

interface WishlistItemsSearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  sortByTerm: string;
  setSortByTerm: React.Dispatch<React.SetStateAction<string>>;
}

const searchBarTheme = createTheme({
  palette: {
    primary: {
      main: "#422006",
    },
  },
});

const WishlistItemsSearchBar = ({
  searchTerm,
  setSearchTerm,
  sortByTerm,
  setSortByTerm,
}: WishlistItemsSearchBarProps) => {
  return (
    <div className="mb-2 flex items-center justify-between rounded-sm bg-green-300 px-2 py-1">
      <ThemeProvider theme={searchBarTheme}>
        <TextField
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Book Title"
          aria-label="wishlist-page-search-bar"
          variant="outlined"
          size="small"
          className="w-[32rem] rounded bg-transparent"
        />
      </ThemeProvider>
      <ThemeProvider theme={searchBarTheme}>
        <FormControl>
          <InputLabel>Sort by</InputLabel>
          <Select
            value={sortByTerm}
            onChange={(e) => setSortByTerm(e.target.value)}
            label="Sort by"
            className="w-[16rem]"
          >
            <MenuItem value={"Name"}>Name</MenuItem>
            <MenuItem value={"Price"}>Price</MenuItem>
            <MenuItem value={"Discount"}>Discount</MenuItem>
            <MenuItem value={"Date Added"}>Date Added</MenuItem>
            <MenuItem value={"Top Selling"}>Top Selling</MenuItem>
            <MenuItem value={"Release Date"}>Release Date</MenuItem>
            <MenuItem value={"Review Score"}>Review Score</MenuItem>
          </Select>
        </FormControl>
      </ThemeProvider>
    </div>
  );
};

export default WishlistItemsSearchBar;
