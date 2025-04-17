import { configureStore } from "@reduxjs/toolkit";
import Addtodoreducer from "./Slices/TodoSlice";
export const store = configureStore({
  reducer: {
    Todo: Addtodoreducer,
  },
});

