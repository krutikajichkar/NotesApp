import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import notesSlice from "./notesSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    notes : notesSlice,
  },
});

export default store;
