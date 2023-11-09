import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

import { useGetCommunitiesQuery } from "../../../apis/communityServiceApi";
import { RootState } from "../../../store";
import { Library } from "../../../types/models/library/Library";
import { Wishlist } from "../../../types/models/wishlist/Wishlist";
import { useGetBooksByTermQuery } from "../../../apis/bookServiceApi";
import CommunityHomeResult from "./CommunityHomeResult";

interface CommunityHomeResultsProps {
  sort: string;
  search: string;
}

const CommunityHomeResults = ({ sort, search }: CommunityHomeResultsProps) => {
  const [bookIds, setBookIds] = useState<number[]>([]);

  const { data: fetchedSearchedBooks, isFetching: isFetchingSearchedBooks } =
    useGetBooksByTermQuery({ term: search, enabled: !!search });

  const library: Library | null = useSelector(
    (state: RootState) => state.library.library,
  );

  const wishlist: Wishlist | null = useSelector(
    (state: RootState) => state.wishlist.wishlist,
  );

  useEffect(() => {
    if (sort === "") {
      setBookIds([]);
    } else if (sort === "library" && library) {
      setBookIds(library.ownedBooks.map((ownedBook) => ownedBook.bookId));
    } else if (sort === "wishlist" && wishlist) {
      setBookIds(
        wishlist.wishlistItems.map((wishlistItem) => wishlistItem.bookId),
      );
    }

    if (search && fetchedSearchedBooks) {
      const fetchedSearchedBooksIds = fetchedSearchedBooks.data.content.map(
        (book) => book.bookId,
      );
      setBookIds((bookIds) => [...bookIds, ...fetchedSearchedBooksIds]);
    }
  }, [sort, library, wishlist, search, fetchedSearchedBooks]);

  const { data: fetchedCommunities, isFetching: isFetchingCommunities } =
    useGetCommunitiesQuery({ bookIds });
  const communities = fetchedCommunities?.data;

  return !isFetchingSearchedBooks && !isFetchingCommunities && communities ? (
    <div className="flex flex-col gap-y-8">
      {communities.map((community, index) => {
        return <CommunityHomeResult key={index} community={community} />;
      })}
    </div>
  ) : (
    <div className="flex h-96 items-center justify-center">
      <CircularProgress className="text-green-50" />
    </div>
  );
};

export default CommunityHomeResults;
