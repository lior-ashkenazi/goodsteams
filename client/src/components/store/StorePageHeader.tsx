import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment,
  createTheme,
  ThemeProvider,
  Popper,
  Grow,
  Paper,
  MenuItem,
  MenuList,
  Box,
  Divider,
  Grid,
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
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openGenresMenu, setOpenGenresMenu] = useState<boolean>(false);

  const genresButtonRef = useRef<HTMLButtonElement>(null);

  const handleSearch = () => navigate(`/store/search?term=${searchTerm}`);

  const firstGenresColumn = [
    "Adventure",
    "Biography",
    "Cuisine",
    "Crime",
    "Epic Fantasy",
    "Fantasy",
    "Historical Fiction",
    "History",
  ];
  const secondGenresColumn = [
    "Horror",
    "Mystery",
    "Self Help",
    "Philosophy",
    "Romance",
    "Science",
    "Science Fiction",
    "Thriller",
  ];

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
          <Button
            className="px-4 py-3 text-base normal-case text-green-900"
            disableRipple
          >
            Your Store
          </Button>
          <Button
            ref={genresButtonRef}
            className="px-4 py-3 text-base normal-case text-green-900"
            onMouseEnter={() => setOpenGenresMenu(true)}
            onMouseLeave={() => setOpenGenresMenu(false)}
            disableRipple
          >
            Genres
          </Button>
          <Popper
            open={openGenresMenu}
            anchorEl={genresButtonRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
            onMouseEnter={() => setOpenGenresMenu(true)}
            onMouseLeave={() => setOpenGenresMenu(false)}
            className="z-10 w-[24rem]"
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom-start" ? "left top" : "left bottom",
                }}
              >
                <Paper>
                  <Grid container direction="row">
                    <Grid item xs>
                      <Box p={1}>
                        <MenuList>
                          {firstGenresColumn.map(
                            (genre: string, index: number) => (
                              <MenuItem
                                key={index}
                                onClick={() => {
                                  navigate(
                                    `/store/genre/${encodeURIComponent(
                                      genre.toLowerCase(),
                                    )}`,
                                  );
                                  setOpenGenresMenu(false);
                                }}
                                disableRipple
                              >
                                {genre}
                              </MenuItem>
                            ),
                          )}
                        </MenuList>
                      </Box>
                    </Grid>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ mr: "-1px" }}
                    />
                    <Grid item xs>
                      <Box p={1}>
                        <MenuList>
                          {secondGenresColumn.map(
                            (genre: string, index: number) => (
                              <MenuItem
                                key={index}
                                onClick={() => {
                                  navigate(
                                    `/store/genre/${encodeURIComponent(
                                      genre.toLowerCase(),
                                    )}`,
                                  );
                                  setOpenGenresMenu(false);
                                }}
                                disableRipple
                              >
                                {genre}
                              </MenuItem>
                            ),
                          )}
                        </MenuList>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Grow>
            )}
          </Popper>
          <Button
            className="px-4 py-3 text-base normal-case text-green-900"
            disableRipple
          >
            News
          </Button>
        </nav>
        <span className="mr-1 flex items-center">
          <ThemeProvider theme={searchBarTheme}>
            <FormControl variant="outlined">
              <OutlinedInput
                className="h-10 bg-green-200 text-yellow-950"
                id="outlined-search-bar"
                placeholder="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                endAdornment={
                  <InputAdornment position="end">
                    <SearchIcon
                      className="text-yellow-950"
                      onClick={handleSearch}
                      style={{ cursor: "pointer" }}
                    />
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
