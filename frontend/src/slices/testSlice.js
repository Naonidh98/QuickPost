import { createSlice } from "@reduxjs/toolkit";

const initialState  ={
    name : "Test slice",
}

const testSlice = createSlice({
    name  : "test",
    initialState,
    reducers : {
        getName(state,value){
            console.log("test : ",state.name)
        }
    }
})

export const {getName} = testSlice.actions;
export default testSlice.reducer;
