import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import messageReducer from "./slices/messageSlice"
import chatReducer from "./slices/chatSlice"
import instructorReducer from "./slices/instructorSlice"
import cartReducer from "./slices/cartSlice"
import reviewReducer from "./slices/reviewSlice"

import {  useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

 const store = configureStore({
  reducer: {
    auth:authReducer,
    message: messageReducer,
    chat: chatReducer,
    instructor:instructorReducer,
    cart:cartReducer,
    review:reviewReducer
  },
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;