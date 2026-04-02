import { createSlice } from "@reduxjs/toolkit";

let themeSlice = createSlice({
    name : "Theme Slice",
    initialState : {value : false},
    reducers : {
        handleTheme(state , action){
            state.value = !state.value
        }
    }
})

export const {handleTheme} = themeSlice.actions
export default themeSlice.reducer