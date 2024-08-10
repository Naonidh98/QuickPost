import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
    token :  localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action) {
      state.user = action.payload;
    },
    setUserToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const { setUserData ,setUserToken } = userSlice.actions;
export default userSlice.reducer;
