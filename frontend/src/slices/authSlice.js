import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
    signUpData :  localStorage.getItem("signupdata")
    ? JSON.parse(localStorage.getItem("signupdata"))
    : null,
    loading : false,
};


const authSlice = createSlice({
    name  : "auth",
    initialState :initialState,
    reducers : {
        setToken(state,value){
            state.token  = value.payload;
        },
        setSignUpData(state,value){
            state.signUpData  = value.payload;
        },
        setLoading(state,value){
            state.loading  = value.payload;
        },
    }
})

export const {setToken,setLoading,setSignUpData} = authSlice.actions;
export default authSlice.reducer;
