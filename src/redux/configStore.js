import { configureStore } from "@reduxjs/toolkit";
import listSlice from "./listSlice";
import authSlice from "./authSlice";
export const store = configureStore({
  reducer: {
    listSlice,
    authSlice,
  },
});
