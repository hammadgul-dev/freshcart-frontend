import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./Slice/SidebarSlice"
import themeReducer from "./Slice/ThemeSlice"
import cardViewReducer from "./Slice/CardView"
import filterReducer from "./Slice/FilterSlice"
import notificationReducer from "./Slice/Notification"

const myStore = configureStore({
    reducer: {
        sidebarReducer,
        themeReducer,
        cardViewReducer,
        filterReducer,
        notificationReducer,
    }
})

export default myStore