import { createSlice } from "@reduxjs/toolkit";

let cardView = createSlice({
    name : "Card View",
    initialState : {
        value : "products"
    },
    reducers : {
        setProductView(state , action){
            state.value = action.payload
        }
    }
})

export const {setProductView} = cardView.actions
export default cardView.reducer 