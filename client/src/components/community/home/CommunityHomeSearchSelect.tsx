import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material";

import { RootState } from "../../../store";
import { Library } from "../../../types/models/library/Library";
import { Wishlist } from "../../../types/models/wishlist/Wishlist";

interface CommunityHomeSearchSelectProps {
  sort: string;
  search: string;
}

const selectTheme = createTheme({
  palette: {
    primary: {
      main: "#14532d",
    },
  },
});

const CommunityHomeSearchSelect = ({
  sort,
  search,
}: CommunityHomeSearchSelectProps) => {
  const navigate = useNavigate();

  const library: Library | null = useSelector(
    (state: RootState) => state.library.library,
  );

  const wishlist: Wishlist | null = useSelector(
    (state: RootState) => state.wishlist.wishlist,
  );

  const [sortTerm, setSortTerm] = useState<string>("");

  useEffect(() => {
    if (!sort) setSortTerm("explore");
  }, [sort]);

  const handleChange = (event: SelectChangeEvent) => {
    let newSortTerm = event.target.value as string;
    setSortTerm(newSortTerm);

    if (newSortTerm === "library" && !library) return;
    else if (newSortTerm === "wishlist" && !wishlist) return;

    if (newSortTerm === "explore") newSortTerm = "";

    navigate(`/community/home?sort=${newSortTerm}&search=${search}`);
  };

  return (
    <div className="mr-4 flex items-center justify-center rounded-sm bg-green-500 bg-opacity-80 px-4 py-2">
      <span className="mr-4 text-green-200">Browse Hubs by</span>
      <ThemeProvider theme={selectTheme}>
        <FormControl className="w-48">
          <InputLabel id="demo-simple-select-label">Sort</InputLabel>
          <Select
            labelId="community-home-search-select-label"
            id="community-home-search-select"
            value={sortTerm}
            label="Sort"
            onChange={handleChange}
          >
            <MenuItem value={"explore"}>To Explore</MenuItem>
            <MenuItem value={"library"}>My Books</MenuItem>
            <MenuItem value={"wishlist"}>Wishlist</MenuItem>
          </Select>
        </FormControl>
      </ThemeProvider>
    </div>
  );
};

export default CommunityHomeSearchSelect;
