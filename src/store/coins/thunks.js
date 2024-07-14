import { createAsyncThunk } from "@reduxjs/toolkit";
import { SLICE } from "./constants";
import { service } from "../../service/service";

const thunks = {
  fetchCoins: createAsyncThunk(`${SLICE}/fetchCoins`, async () => {
    const res = await service.getCoins();
    return res;
  }),
};
export default thunks;
