import { createSlice } from "@reduxjs/toolkit";
import { SLICE } from "./constants";
import thunks from "./thunks";

const initialState = {
  cryptoCoins: [],
  isLoading: false,
};

export const slice = createSlice({
  name: SLICE,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(thunks.fetchCoins.fulfilled, (state, { payload }) => {
      console.log(payload.result);
      state.cryptoCoins = payload.result;
    });
  },
});
export const { setCoins } = slice.actions;
export default slice.reducer;
