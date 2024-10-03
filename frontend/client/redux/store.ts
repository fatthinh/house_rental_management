import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slides/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {auth: UserState}
export type AppDispatch = typeof store.dispatch;
export default store;
