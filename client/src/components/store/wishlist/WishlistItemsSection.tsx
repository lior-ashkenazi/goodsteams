import { useState } from "react";

import WishlistItemsSearchBar from "./WishlistItemsSearchBar";
import WishlistItemsResults from "./WishlistItemsResults";
import { Divider } from "@mui/material";

const WishlistItemsSection = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortByTerm, setSortByTerm] = useState<string>("Date Added");

  return (
    <>
      <WishlistItemsSearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortByTerm={sortByTerm}
        setSortByTerm={setSortByTerm}
      />
      <Divider className="mb-2" />
      <div className="rounded-sm bg-green-300 text-green-900">
        <WishlistItemsResults searchTerm={searchTerm} sortByTerm={sortByTerm} />
      </div>
    </>
  );
};

export default WishlistItemsSection;
