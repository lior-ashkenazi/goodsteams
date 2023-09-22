import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Library } from "../../types/models/Library";
import { authServiceEndpoints } from "../apis/endpoints/authServiceEndpoints";
import { libraryServiceEndpoints } from "../apis/endpoints/libraryServiceEndpoints";

type LibraryState = {
  library: Library | null;
};

const initialState: LibraryState = {
  library: null,
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    setLibrary: (
      state,
      action: PayloadAction<{
        library: Library;
      }>,
    ) => {
      state.library = action.payload.library;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      libraryServiceEndpoints.endpoints.getLibrary.matchFulfilled,
      (state, action) => {
        state.library = action.payload;
      },
    )
    .addMatcher(
      authServiceEndpoints.endpoints.logoutUser.matchFulfilled,
      (state) => {
        state.library = null;
      },
    );
  },
});

export const { setLibrary } = librarySlice.actions;
export default librarySlice.reducer;
