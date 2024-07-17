import combineReducers from "combine-reducers";

import testSlice from "../slices/testSlice";
import authSlice from "../slices/authSlice";
import darkmodeSlice from "../slices/darkmodeSlice";
import userSlice from "../slices/userSlice";
import postSlice from "../slices/postSlice";

const rootReducer = combineReducers({
  test: testSlice,
  auth: authSlice,
  darkmode: darkmodeSlice,
  user: userSlice,
  post : postSlice
});

export default rootReducer;
