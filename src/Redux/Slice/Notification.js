import { createSlice } from "@reduxjs/toolkit";

let notificationSlice = createSlice({
    name: "Toast Notification",
    initialState: {
        message: null,
    },
    reducers: {
        setMessage(state, action) { state.message = action.payload.message },
        clearMessage(state) { state.message = null }
    }
})

export const { setMessage, clearMessage } = notificationSlice.actions
export default notificationSlice.reducer