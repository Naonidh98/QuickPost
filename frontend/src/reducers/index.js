import { combineReducers } from "@reduxjs/toolkit";

//import slices
import themeSlice from "../slices/themeSlice";

const rootReducer = combineReducers({
  theme: themeSlice,
});

export default rootReducer;
