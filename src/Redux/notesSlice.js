import { createSlice } from "@reduxjs/toolkit";

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes : null ,
    editNoteId: null,
    deleteNoteId : null,
  },
  reducers: {
    addNotes: (state, action) => {
      state.notes =  action.payload;
    },
    editNotes: (state, action) => {
      state.editNoteId = action.payload;
    },
   
  },
});

export const { addNotes , editNotes } = notesSlice.actions;

export default notesSlice.reducer;
