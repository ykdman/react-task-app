import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer/reducer";

const store = configureStore({
  reducer: reducer,
});
export default store;

export type RootState = ReturnType<typeof store.getState>; // store의 타입을 추출
export type AppDispatch = typeof store.dispatch;
