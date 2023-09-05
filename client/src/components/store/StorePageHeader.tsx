import {
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment,
  createTheme,
  ThemeProvider,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

const searchBarTheme = createTheme({
  palette: {
    primary: {
      main: "#422006",
    },
  },
});

const StorePageHeader = () => {
  return (
    <div className="my-8 flex w-full flex-col">
      <Button
        className="mb-1 self-end bg-green-400 text-xs text-amber-50"
        variant="contained"
        disableElevation
      >
        Wishlist
      </Button>
      <div className="flex justify-between rounded bg-gradient-to-l from-green-500 to-yellow-50 ">
        <nav className="flex gap-x-1">
          <Button className="px-4 py-3 text-base normal-case text-green-900">
            Your Store
          </Button>
          <Button className="px-4 py-3 text-base normal-case text-green-900">
            Categories
          </Button>
          <Button className="px-4 py-3 text-base normal-case text-green-900">
            News
          </Button>
        </nav>
        <span className="mr-1 flex items-center">
          <ThemeProvider theme={searchBarTheme}>
            <FormControl variant="outlined">
              <OutlinedInput
                className="h-10 bg-green-200 text-yellow-950"
                id="outlined-search-bar"
                endAdornment={
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </ThemeProvider>
        </span>
      </div>
    </div>
  );
};

export default StorePageHeader;
