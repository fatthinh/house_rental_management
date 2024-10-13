import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import cookie from 'react-cookies';
import { RootState } from "@/redux/store";

interface AuthState {
  user: object | null;
}

// Define the initial state using that type
const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<object>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
