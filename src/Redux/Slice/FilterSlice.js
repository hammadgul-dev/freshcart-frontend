import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    userSearch : null,
    brand : null,
    category : null,
    sortType : null,
}

let filterSlice = createSlice({
    name : "User Search",
    initialState,
    reducers : {
        handleUserSearch(state , action){
            state.searchTxt = action.payload
        },
        handleItemFilter(state , action){
            state.brand = action.payload.brand,
            state.category = action.payload.category
            state.sortType = action.payload.sortType
        }
    }
})

export const { handleUserSearch , handleItemFilter } = filterSlice.actions
export default filterSlice.reducer