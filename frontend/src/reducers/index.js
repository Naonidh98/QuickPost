import { combineReducers } from "@reduxjs/toolkit";

//import slices
import themeSlice from "../slices/themeSlice";
import userSlice from "../slices/userSlice";

const rootReducer = combineReducers({
  theme: themeSlice,
  user: userSlice,
});

export default rootReducer;
