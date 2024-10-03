import { configureStore } from '@reduxjs/toolkit';
import appSlice from './slices/appSlice';
import authSlice from './slices/authSlice';

const store = configureStore({
    reducer: {
        app: appSlice.reducer,
        auth: authSlice.reducer,
    },
});

export default store;
