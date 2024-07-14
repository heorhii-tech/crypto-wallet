const { createSlice } = require("@reduxjs/toolkit");
import { SLICE } from "./constants";

const initialState = {
  assets: [],
};

export const slice = createSlice({
  name: SLICE,
  initialState,
  reducers: {
    setAssets(state, { payload }) {
      Array.isArray(payload)
        ? (state.assets = payload)
        : (state.assets = [...state.assets, payload]);
    },
  },
});
export const { setAssets } = slice.actions;
export default slice.reducer;
