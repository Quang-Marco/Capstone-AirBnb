import { configureStore } from "@reduxjs/toolkit";
import listSlice from "./listSlice";
import userSlice from "./userSlice";
import bookRoomSlice from "./bookRoomSlice";
import viTriSlice from "./viTriSlice";
import roomSlice from "./roomSlice";
import authSlice from "./authSlice";
export const store = configureStore({
  reducer: {
    listSlice,
    userSlice,
    bookRoomSlice,
    viTriSlice,
    roomSlice,
    authSlice,
  },
});
