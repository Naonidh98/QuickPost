import { createSlice } from "@reduxjs/toolkit";

const initialState  = {
    dark_mode : localStorage.getItem("darkmode") ? JSON.parse(localStorage.getItem("darkmode")) : false,
}

const darkmodeSlice = createSlice({
    name  : "darkmode",
    initialState:initialState,
    reducers : {
        setDarkMode(state,value){ 
            state.dark_mode = value.payload;
            localStorage.setItem("darkmode",state.dark_mode)
        }
    }
})

export const {setDarkMode} = darkmodeSlice.actions;
export default darkmodeSlice.reducer;
