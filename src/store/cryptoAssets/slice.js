import { createSlice } from "@reduxjs/toolkit";
import { SLICE } from "./constants";
import { cryptoAssets } from "../coins/dataCoins";

const initialState = {
  cryptoAssets: cryptoAssets,
};

export const slice = createSlice({
  name: SLICE,
  initialState,

  reducers: {
    setCryptoAssets(state, { payload }) {
      state.cryptoAssets = [...state.cryptoAssets, payload];
    },
  },
});
export const { setCryptoAssets } = slice.actions;
export default slice.reducer;
