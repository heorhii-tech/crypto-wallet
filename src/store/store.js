import { configureStore, createSlice } from "@reduxjs/toolkit";

import coins from "./coins/slice";
import assets from "./assets/slice";
import select from "./select/slice";
import cryptoAssets from "./cryptoAssets/slice"

export const store = configureStore({
  reducer: {
    coins: coins,
    assets: assets,
    select: select,
    cryptoAssets: cryptoAssets,
  },
});
