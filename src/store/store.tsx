import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import personalReducer from "../api-servies/registerSlice";


const store = configureStore({
  reducer: {
    registerData : personalReducer,

  },
});
export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
