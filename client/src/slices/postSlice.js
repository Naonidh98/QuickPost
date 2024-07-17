import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    editMode : false,
    data : null,
    step : 1,
    loading : false,
}

const postSlice  = createSlice({
    name  : "Post",
    initialState : initialState,
    reducers : {
        setEditMode(state,value){
            state.editMode = value.payload
        },
        setStep(state,value){
            state.step = value.payload
        },
        setPostData(state,value){
            state.data = value.payload
        },
        setLoading(state,value){
            state.loading = value.payload
        },
    }
})

export const {setEditMode,setPostData,setStep,setLoading}  = postSlice.actions;
export default postSlice.reducer;