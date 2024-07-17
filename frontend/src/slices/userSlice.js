import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading : false,
}

const userSlice  = createSlice({
    name  : "user",
    initialState : initialState,
    reducers : {
        setUserData (state,value){
            state.user = value.payload
        },
        setLoading (state,value){
            state.loading = value.payload
        },
    }
})

export const {setUserData,setLoading} = userSlice.actions;
export default userSlice.reducer;
