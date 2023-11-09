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
import { Book } from "../../../types/models/book/Book";
import { Discussion } from "../../../types/models/community/Discussion";

interface BookCommunitySearchBarProps {
  book: Book;
  discussion?: Discussion;
  search: string;
  isCommunity?: boolean;
  isDiscussion?: boolean;
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

const BookCommunitySearchBar = ({
  book,
  discussion,
  search,
  isCommunity,
  isDiscussion,
}: BookCommunitySearchBarProps) => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState<string>(search);

  const handleSearch = () => {
    if (isCommunity) {
      navigate(`/community/book/${book.bookId}?search=${searchTerm}`);
    } else if (discussion && isDiscussion) {
      navigate(
        `/community/book/${book.bookId}/discussion/${discussion.discussionId}?search=${searchTerm}`,
      );
    }
  };

  return (
    <div className="mb-6 flex items-center justify-center rounded-md border-[1px] border-green-900 bg-green-400 p-2">
      <ThemeProvider theme={searchBarTheme}>
        <FormControl variant="outlined" className="w-full">
          <OutlinedInput
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

export default BookCommunitySearchBar;
