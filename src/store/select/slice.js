import { createSlice } from "@reduxjs/toolkit";
import { SLICE } from "./constants";

const initialState = {
  open: false,
};
const slice = createSlice({
  name: SLICE,
  initialState,
  reducers: {
    setOpen(state, { payload }) {
      payload === "close" ? (state.open = false) : (state.open = payload);
    },
  },
});
export const { setOpen } = slice.actions;
export default slice.reducer;
