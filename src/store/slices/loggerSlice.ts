import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILogItem } from "../../types/index.ts";
type TloggerState = {
  logArray: ILogItem[];
};

const initialState: TloggerState = {
  logArray: [],
};

const loggerSlice = createSlice({
  name: "logger",
  initialState,
  reducers: {
    addLog: (state, { payload }: PayloadAction<ILogItem>) => {
      state.logArray.push(payload);
    },
  },
});
export const { addLog } = loggerSlice.actions;
export const loggerReducer = loggerSlice.reducer;
