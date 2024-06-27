import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  id: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
    resetUser: (state) => {
      state.email = "";
      state.id = "";
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
