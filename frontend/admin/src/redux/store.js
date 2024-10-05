import { configureStore } from '@reduxjs/toolkit';
import appSlice from './slices/appSlice';
import authSlice from './slices/authSlice';
import dataSlice from './slices/dataSlice';

const store = configureStore({
    reducer: {
        app: appSlice.reducer,
        auth: authSlice.reducer,
        data: dataSlice.reducer
    },
});

export default store;
