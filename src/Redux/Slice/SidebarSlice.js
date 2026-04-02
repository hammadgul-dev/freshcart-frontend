import { createSlice } from "@reduxjs/toolkit";

let sidebarSlice = createSlice({
    name : "SideBar Slice",
    initialState : {value : false},
    reducers : {
        handleSidebar(state , action){
            state.value = !state.value
        }
    }
})

export const {handleSidebar} = sidebarSlice.actions
export default sidebarSlice.reducer